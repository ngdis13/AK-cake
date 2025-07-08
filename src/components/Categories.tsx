import React from 'react';

const categories = [
  'Все',
  'Торты',
  'Капкейки',
  'Муссовые торты',
  'Чизкейки',
  'Наборы сладостей',
  'Пирожные',
];

type CategoriesProps = {
  categoryId: number;
  onClickCategory: (i: number) => void;
};

export const Categories: React.FC<CategoriesProps> = React.memo(
  ({ categoryId, onClickCategory }) => {
    return (
      <div className="categories">
        <ul>
          {categories.map((categoryName, index) => (
            <li
              key={index}
              onClick={() => onClickCategory(index)}
              className={categoryId === index ? 'active' : ''}
            >
              {categoryName}
            </li>
          ))}
        </ul>
      </div>
    );
  }
);

