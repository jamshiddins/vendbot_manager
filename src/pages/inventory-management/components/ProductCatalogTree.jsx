import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const ProductCatalogTree = ({ categories, selectedCategory, onCategorySelect }) => {
  const [expandedCategories, setExpandedCategories] = useState(['beverages', 'snacks']);

  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <div className="bg-surface rounded-lg border border-border">
      <div className="p-4 border-b border-border">
        <h3 className="font-heading font-semibold text-text-primary flex items-center space-x-2">
          <Icon name="FolderTree" size={18} />
          <span>Каталог товаров</span>
        </h3>
      </div>
      
      <div className="p-2">
        {categories.map((category) => (
          <div key={category.id} className="mb-1">
            <button
              onClick={() => {
                onCategorySelect(category.id);
                if (category.subcategories) {
                  toggleCategory(category.id);
                }
              }}
              className={`w-full flex items-center justify-between px-3 py-2 text-left rounded-lg transition-colors duration-200 ${
                selectedCategory === category.id
                  ? 'bg-primary text-white' :'hover:bg-secondary-100 text-text-primary'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Icon 
                  name={category.icon} 
                  size={16} 
                  className={selectedCategory === category.id ? 'text-white' : 'text-text-secondary'} 
                />
                <span className="text-sm font-medium">{category.name}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  selectedCategory === category.id
                    ? 'bg-white bg-opacity-20 text-white' :'bg-secondary-100 text-text-secondary'
                }`}>
                  {category.count}
                </span>
              </div>
              
              {category.subcategories && (
                <Icon 
                  name="ChevronDown" 
                  size={14} 
                  className={`transition-transform duration-200 ${
                    expandedCategories.includes(category.id) ? 'rotate-180' : ''
                  } ${selectedCategory === category.id ? 'text-white' : 'text-text-secondary'}`} 
                />
              )}
            </button>
            
            {category.subcategories && expandedCategories.includes(category.id) && (
              <div className="ml-6 mt-1 space-y-1">
                {category.subcategories.map((subcategory) => (
                  <button
                    key={subcategory.id}
                    onClick={() => onCategorySelect(subcategory.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 text-left rounded-lg transition-colors duration-200 ${
                      selectedCategory === subcategory.id
                        ? 'bg-primary-100 text-primary' :'hover:bg-secondary-50 text-text-secondary'
                    }`}
                  >
                    <span className="text-sm">{subcategory.name}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      selectedCategory === subcategory.id
                        ? 'bg-primary-200 text-primary' :'bg-secondary-100 text-text-muted'
                    }`}>
                      {subcategory.count}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="p-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-secondary">Всего категорий:</span>
          <span className="font-medium text-text-primary">{categories.length - 1}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCatalogTree;