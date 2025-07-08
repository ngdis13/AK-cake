
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setSort } from '../redux/slices/filterSlice.ts';
import type { SortType } from '../redux/slices/filterSlice.ts';

// Определяем объект с константами для свойств сортировки
export const SortProperty = {
  RATING: 'rating',
  PRICE_DESC: 'price',
  PRICE_ASC: '-price',
  TITLE: 'title',
} as const;

// Определяем тип для значений свойств сортировки
export type SortPropertyEnum = typeof SortProperty[keyof typeof SortProperty];

export type SortItem = {
  name: string;
  sortProperty: SortPropertyEnum;
};

type SortProps = {
  value: SortType;
};

export const list: SortItem[] = [
  {
    name: 'популярности',
    sortProperty: SortProperty.RATING, // 'rating'
  },
  {
    name: 'цене по убыванию',
    sortProperty: SortProperty.PRICE_DESC, // 'price'
  },
  {
    name: 'цене по возрастанию',
    sortProperty: SortProperty.PRICE_ASC, // '-price'
  },
  {
    name: 'алфавиту',
    sortProperty: SortProperty.TITLE, // 'title'
  },
];

export const Sort: React.FC<SortProps> = React.memo(({ value }) => {
  const dispatch = useDispatch();
  const sortRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.body.addEventListener('click', handleClickOutside);
    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const onClickSortItem = (index: number) => {
    dispatch(setSort(list[index]));
    setOpen(false);
  };

  return (
    <div className="sort" ref={sortRef}>
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setOpen(!open)}>{value.name}</span>
      </div>
      {open && (
        <div className="sort__popup">
          <ul>
            {list.map((obj, index) => (
              <li
                key={index}
                className={value.sortProperty === obj.sortProperty ? 'active' : ''}
                onClick={() => onClickSortItem(index)}
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});

