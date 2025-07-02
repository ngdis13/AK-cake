import React, { useState } from 'react';

type CategoriesProps = {
  categoryId: number;
  onClickCategory: (i: number) => void;
}

const Categories: React.FC<CategoriesProps> = ({categoryId, onClickCategory}) => {
  const categories = [
    'Все',
    'Торты',
    'Капкейки',
    'Муссовые торты',
    'Чизкейки',
    'Наборы сладостей',
    'Пирожные'
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, index) => (
          <li
            key={index}
            onClick={() => onClickCategory(index)}
            className={
              categoryId === index ? 'active' : ''
            }
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
