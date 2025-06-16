// src/pages/ingredient-catalog-management/components/CategoryTree.jsx
import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const CategoryTree = ({ categories, selectedCategory, onCategorySelect }) => {
  const [expandedCategories, setExpandedCategories] = useState(new Set(['beverages']));

  const toggleCategory = (categoryId) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const renderCategory = (category, level = 0) => {
    const isExpanded = expandedCategories.has(category.id);
    const isSelected = selectedCategory === category.id;
    const hasChildren = category.children && category.children.length > 0;

    return (
      <div key={category.id} className="mb-1">
        <div
          className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer transition-colors ${
            isSelected
              ? 'bg-primary text-white' :'hover:bg-secondary-100 text-text-primary'
          }`}
          style={{ marginLeft: `${level * 16}px` }}
          onClick={() => onCategorySelect(category.id)}
        >
          {hasChildren && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleCategory(category.id);
              }}
              className="flex-shrink-0 p-1 hover:bg-black/10 rounded transition-colors"
            >
              <Icon
                name={isExpanded ? 'ChevronDown' : 'ChevronRight'}
                size={14}
                className={isSelected ? 'text-white' : 'text-text-secondary'}
              />
            </button>
          )}
          
          {!hasChildren && (
            <div className="w-6 h-6 flex-shrink-0" />
          )}
          
          <Icon
            name={category.icon || 'Folder'}
            size={16}
            className={isSelected ? 'text-white' : 'text-text-secondary'}
          />
          
          <span className="flex-1 text-sm font-medium">
            {category.name}
          </span>
          
          {category.count && (
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                isSelected
                  ? 'bg-white/20 text-white' :'bg-secondary-100 text-text-secondary'
              }`}
            >
              {category.count}
            </span>
          )}
        </div>
        
        {hasChildren && isExpanded && (
          <div className="mt-1">
            {category.children.map(child => renderCategory(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-border p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-heading font-semibold text-text-primary">
          Категории
        </h3>
        <button
          onClick={() => onCategorySelect('all')}
          className={`text-sm px-3 py-1 rounded-lg transition-colors ${
            selectedCategory === 'all' ?'bg-primary text-white' :'text-primary hover:bg-primary/10'
          }`}
        >
          Все
        </button>
      </div>
      
      <div className="space-y-1">
        {categories?.map(category => renderCategory(category))}
      </div>
    </div>
  );
};

export default CategoryTree;