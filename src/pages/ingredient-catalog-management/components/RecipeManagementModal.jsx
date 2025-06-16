// src/pages/ingredient-catalog-management/components/RecipeManagementModal.jsx
import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const RecipeManagementModal = ({ ingredients, onClose }) => {
  const [activeTab, setActiveTab] = useState('recipes');
  const [recipes, setRecipes] = useState([
    {
      id: 'R001',
      name: 'Классический капучино',
      category: 'Горячие напитки',
      description: 'Традиционный капучино с молочной пенкой',
      servingSize: '250ml',
      ingredients: [
        { id: 'I002', quantity: 18, unit: 'г' },
        { id: 'I003', quantity: 150, unit: 'мл' }
      ],
      cost: 32.50,
      price: 89.00,
      preparationTime: 90,
      instructions: [
        'Измельчить кофейные зерна',
        'Приготовить эспрессо',
        'Взбить молоко до пенки',
        'Объединить компоненты'
      ],
      nutritional: {
        calories: 95,
        protein: 5.2,
        fat: 3.8,
        carbs: 8.1
      },
      status: 'active'
    },
    {
      id: 'R002',
      name: 'Энергетический микс',
      category: 'Холодные напитки',
      description: 'Освежающий энергетический напиток',
      servingSize: '330ml',
      ingredients: [
        { id: 'I001', quantity: 1, unit: 'шт' }
      ],
      cost: 45.00,
      price: 65.00,
      preparationTime: 15,
      instructions: [
        'Охладить напиток',
        'Подавать со льдом'
      ],
      nutritional: {
        calories: 210,
        sugar: 53,
        caffeine: 34
      },
      status: 'active'
    }
  ]);

  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [recipeForm, setRecipeForm] = useState({
    name: '',
    category: '',
    description: '',
    servingSize: '',
    ingredients: [],
    instructions: [''],
    preparationTime: '',
    status: 'active'
  });

  const categories = [
    'Горячие напитки',
    'Холодные напитки',
    'Снэки',
    'Комбо'
  ];

  const handleAddRecipe = () => {
    setRecipeForm({
      name: '',
      category: '',
      description: '',
      servingSize: '',
      ingredients: [],
      instructions: [''],
      preparationTime: '',
      status: 'active'
    });
    setSelectedRecipe(null);
    setIsFormOpen(true);
  };

  const handleEditRecipe = (recipe) => {
    setRecipeForm({
      name: recipe.name,
      category: recipe.category,
      description: recipe.description,
      servingSize: recipe.servingSize,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      preparationTime: recipe.preparationTime,
      status: recipe.status
    });
    setSelectedRecipe(recipe);
    setIsFormOpen(true);
  };

  const handleSaveRecipe = () => {
    if (selectedRecipe) {
      // Edit existing recipe
      setRecipes(prev => prev.map(recipe => 
        recipe.id === selectedRecipe.id
          ? { ...recipe, ...recipeForm }
          : recipe
      ));
    } else {
      // Add new recipe
      const newRecipe = {
        id: `R${String(recipes.length + 1).padStart(3, '0')}`,
        ...recipeForm,
        cost: calculateRecipeCost(recipeForm.ingredients),
        nutritional: calculateNutritional(recipeForm.ingredients)
      };
      setRecipes(prev => [...prev, newRecipe]);
    }
    setIsFormOpen(false);
  };

  const calculateRecipeCost = (recipeIngredients) => {
    return recipeIngredients.reduce((total, item) => {
      const ingredient = ingredients?.find(ing => ing.id === item.id);
      if (ingredient) {
        const unitCost = ingredient.cost / 100; // Assuming cost per 100g/ml
        return total + (unitCost * item.quantity);
      }
      return total;
    }, 0);
  };

  const calculateNutritional = (recipeIngredients) => {
    const nutritional = { calories: 0, protein: 0, fat: 0, carbs: 0 };
    
    recipeIngredients.forEach(item => {
      const ingredient = ingredients?.find(ing => ing.id === item.id);
      if (ingredient?.nutritional) {
        const ratio = item.quantity / 100; // Assuming nutritional per 100g/ml
        nutritional.calories += (ingredient.nutritional.calories || 0) * ratio;
        nutritional.protein += (ingredient.nutritional.protein || 0) * ratio;
        nutritional.fat += (ingredient.nutritional.fat || 0) * ratio;
        nutritional.carbs += (ingredient.nutritional.carbs || 0) * ratio;
      }
    });
    
    return nutritional;
  };

  const addIngredientToRecipe = () => {
    setRecipeForm(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, { id: '', quantity: 0, unit: 'г' }]
    }));
  };

  const updateRecipeIngredient = (index, field, value) => {
    setRecipeForm(prev => ({
      ...prev,
      ingredients: prev.ingredients.map((ingredient, i) => 
        i === index ? { ...ingredient, [field]: value } : ingredient
      )
    }));
  };

  const removeRecipeIngredient = (index) => {
    setRecipeForm(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index)
    }));
  };

  const addInstruction = () => {
    setRecipeForm(prev => ({
      ...prev,
      instructions: [...prev.instructions, '']
    }));
  };

  const updateInstruction = (index, value) => {
    setRecipeForm(prev => ({
      ...prev,
      instructions: prev.instructions.map((instruction, i) => 
        i === index ? value : instruction
      )
    }));
  };

  const removeInstruction = (index) => {
    setRecipeForm(prev => ({
      ...prev,
      instructions: prev.instructions.filter((_, i) => i !== index)
    }));
  };

  const getIngredientName = (ingredientId) => {
    const ingredient = ingredients?.find(ing => ing.id === ingredientId);
    return ingredient?.name || 'Неизвестный ингредиент';
  };

  const renderRecipesList = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-text-primary">Рецепты</h3>
        <button
          onClick={handleAddRecipe}
          className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Icon name="Plus" size={16} />
          <span>Добавить рецепт</span>
        </button>
      </div>
      
      <div className="grid gap-4">
        {recipes.map(recipe => (
          <div key={recipe.id} className="bg-white border border-border rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-medium text-text-primary mb-1">{recipe.name}</h4>
                <p className="text-sm text-text-secondary">{recipe.category}</p>
                <p className="text-sm text-text-secondary mt-1">{recipe.description}</p>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleEditRecipe(recipe)}
                  className="p-2 text-text-secondary hover:text-primary transition-colors"
                >
                  <Icon name="Edit2" size={16} />
                </button>
                <button
                  onClick={() => {
                    if (window.confirm('Удалить рецепт?')) {
                      setRecipes(prev => prev.filter(r => r.id !== recipe.id));
                    }
                  }}
                  className="p-2 text-text-secondary hover:text-error-600 transition-colors"
                >
                  <Icon name="Trash2" size={16} />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-text-secondary">Порция:</span>
                <p className="font-medium">{recipe.servingSize}</p>
              </div>
              <div>
                <span className="text-text-secondary">Себестоимость:</span>
                <p className="font-medium">₽{recipe.cost?.toFixed(2)}</p>
              </div>
              <div>
                <span className="text-text-secondary">Время:</span>
                <p className="font-medium">{recipe.preparationTime}с</p>
              </div>
            </div>
            
            <div className="mt-3">
              <span className="text-text-secondary text-sm">Ингредиенты:</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {recipe.ingredients?.map((ingredient, index) => (
                  <span
                    key={index}
                    className="text-xs bg-secondary-100 text-text-secondary px-2 py-1 rounded"
                  >
                    {getIngredientName(ingredient.id)} ({ingredient.quantity}{ingredient.unit})
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderRecipeForm = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-text-primary">
          {selectedRecipe ? 'Редактировать рецепт' : 'Новый рецепт'}
        </h3>
        <button
          onClick={() => setIsFormOpen(false)}
          className="p-2 text-text-secondary hover:text-text-primary transition-colors"
        >
          <Icon name="X" size={20} />
        </button>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-1">
            Название
          </label>
          <input
            type="text"
            value={recipeForm.name}
            onChange={(e) => setRecipeForm(prev => ({ ...prev, name: e.target.value }))}
            className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Название рецепта"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-text-primary mb-1">
            Категория
          </label>
          <select
            value={recipeForm.category}
            onChange={(e) => setRecipeForm(prev => ({ ...prev, category: e.target.value }))}
            className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">Выберите категорию</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        
        <div className="col-span-2">
          <label className="block text-sm font-medium text-text-primary mb-1">
            Описание
          </label>
          <textarea
            value={recipeForm.description}
            onChange={(e) => setRecipeForm(prev => ({ ...prev, description: e.target.value }))}
            rows={2}
            className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Краткое описание рецепта"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-text-primary mb-1">
            Размер порции
          </label>
          <input
            type="text"
            value={recipeForm.servingSize}
            onChange={(e) => setRecipeForm(prev => ({ ...prev, servingSize: e.target.value }))}
            className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="например, 250мл"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-text-primary mb-1">
            Время приготовления (сек)
          </label>
          <input
            type="number"
            value={recipeForm.preparationTime}
            onChange={(e) => setRecipeForm(prev => ({ ...prev, preparationTime: e.target.value }))}
            className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="90"
          />
        </div>
      </div>
      
      {/* Ingredients */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-medium text-text-primary">
            Ингредиенты
          </label>
          <button
            type="button"
            onClick={addIngredientToRecipe}
            className="flex items-center space-x-1 text-primary hover:text-primary-700 text-sm"
          >
            <Icon name="Plus" size={14} />
            <span>Добавить</span>
          </button>
        </div>
        
        <div className="space-y-3">
          {recipeForm.ingredients.map((ingredient, index) => (
            <div key={index} className="flex items-center space-x-3">
              <select
                value={ingredient.id}
                onChange={(e) => updateRecipeIngredient(index, 'id', e.target.value)}
                className="flex-1 px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Выберите ингредиент</option>
                {ingredients?.map(ing => (
                  <option key={ing.id} value={ing.id}>{ing.name}</option>
                ))}
              </select>
              
              <input
                type="number"
                value={ingredient.quantity}
                onChange={(e) => updateRecipeIngredient(index, 'quantity', parseFloat(e.target.value) || 0)}
                className="w-20 px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="0"
              />
              
              <select
                value={ingredient.unit}
                onChange={(e) => updateRecipeIngredient(index, 'unit', e.target.value)}
                className="w-16 px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="г">г</option>
                <option value="мл">мл</option>
                <option value="шт">шт</option>
              </select>
              
              <button
                type="button"
                onClick={() => removeRecipeIngredient(index)}
                className="p-2 text-text-secondary hover:text-error-600 transition-colors"
              >
                <Icon name="Trash2" size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
      
      {/* Instructions */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-medium text-text-primary">
            Инструкции по приготовлению
          </label>
          <button
            type="button"
            onClick={addInstruction}
            className="flex items-center space-x-1 text-primary hover:text-primary-700 text-sm"
          >
            <Icon name="Plus" size={14} />
            <span>Добавить шаг</span>
          </button>
        </div>
        
        <div className="space-y-3">
          {recipeForm.instructions.map((instruction, index) => (
            <div key={index} className="flex items-center space-x-3">
              <span className="flex-shrink-0 w-6 h-6 bg-primary text-white text-xs rounded-full flex items-center justify-center">
                {index + 1}
              </span>
              <input
                type="text"
                value={instruction}
                onChange={(e) => updateInstruction(index, e.target.value)}
                className="flex-1 px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Описание шага"
              />
              <button
                type="button"
                onClick={() => removeInstruction(index)}
                className="p-2 text-text-secondary hover:text-error-600 transition-colors"
              >
                <Icon name="Trash2" size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex items-center justify-end space-x-3 pt-4 border-t border-border">
        <button
          onClick={() => setIsFormOpen(false)}
          className="px-4 py-2 text-text-secondary hover:text-text-primary border border-border rounded-lg hover:bg-secondary-50 transition-colors"
        >
          Отменить
        </button>
        <button
          onClick={handleSaveRecipe}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          Сохранить
        </button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-heading font-semibold text-text-primary">
            Управление рецептами
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-text-secondary hover:text-text-primary transition-colors"
          >
            <Icon name="X" size={20} />
          </button>
        </div>
        
        <div className="p-6 max-h-[calc(90vh-120px)] overflow-y-auto">
          {isFormOpen ? renderRecipeForm() : renderRecipesList()}
        </div>
      </div>
    </div>
  );
};

export default RecipeManagementModal;