import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, selectCartItemById } from '../../redux/slices/cartSlice';
import type { CartItem } from '../../redux/slices/cakeSlice';
import { Link } from 'react-router-dom';

// Типизация данных из API
interface TypesData {
  [key: string]: string[];
}

interface ApiResponse {
  [index: number]: TypesData;
}

type CakeBlockProps = {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  types?: string;
  price: number;
};

export const CakeBlock: React.FC<CakeBlockProps> = ({
  id,
  title,
  category,
  imageUrl,
  price,
}) => {
  const dispatch = useDispatch();
  const cartItem = useSelector(selectCartItemById(id));
  const [activeType, setActiveType] = useState<number>(0);
  const [allTypesData, setAllTypesData] = useState<ApiResponse | null>(null);

  const availableTypes: string[] = allTypesData?.[0]?.[category] ?? [];

  const addedCount = cartItem ? cartItem.count : 0;

  const onClickAdd = () => {
    if (activeType >= 0 && activeType < availableTypes.length) {
      const selectedType = availableTypes[activeType] ?? availableTypes[0] ?? "default";
      if (selectedType) {
        const item: CartItem = {
          id,
          title,
          price,
          imageUrl,
          types: selectedType,
          category,
          count: 0,
        };
        dispatch(addItem(item));
      } else {
        console.error("Selected type is undefined");
      }
    } else {
      console.error("Invalid activeType index");
    }
  };

  useEffect(() => {
    const url = `https://6836b7ad664e72d28e41cd1f.mockapi.io/types`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setAllTypesData(data))
      .catch((error) => {
        console.error('Error fetching types data:', error);
      });
  }, []);

  return (
    <div className="cake-block">
      <Link key={id} to={`/cake/${id}`}>
        <img className="cake-block__image" src={imageUrl} alt={title} />
        <h4 className="cake-block__title">{title}</h4>
      </Link>
      <div className="cake-block__selector">
        <ul>
          {availableTypes.map((typeName, index) => (
            <li
              key={index}
              className={activeType === index ? 'active' : ''}
              onClick={() => setActiveType(index)}
            >
              {typeName}
            </li>
          ))}
        </ul>
      </div>
      <div className="cake-block__bottom">
        <div className="cake-block__price">от {price} ₽</div>
        <button
          className="button button--outline button--add"
          onClick={onClickAdd}
          disabled={availableTypes.length === 0}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          {addedCount > 0 && <i className="button__count">{addedCount}</i>}
        </button>
      </div>
    </div>
  );
};

