
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, selectCartItemById } from '../redux/slices/cartSlice';
import type { CartItem } from '../redux/slices/cartSlice';
import NotFound from './NotFound';

const FullCakes: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cake, setCake] = useState<{
    imageUrl: string;
    title: string;
    price: number;
    typesOfCategory: string[]; // Изменено на string[] | undefined
    category: string;
    description?: string;
    compound?: string;
  }>();
  const [activeType, setActiveType] = useState<number>(0);
  const cartItem = id ? useSelector(selectCartItemById(id)) : null;
  const addedCount = cartItem?.count || 0;

  useEffect(() => {
    async function fetchCakes() {
      if (!id) {
        alert('ID десерта не указан');
        navigate('/');
        return;
      }
      try {
        const { data } = await axios.get(
          `https://6836b7ad664e72d28e41cd1f.mockapi.io/Items/${id}`
        );
        // Устанавливаем typesOfCategory как пустой массив, если оно undefined
        setCake({
          ...data,
          typesOfCategory: data.typesOfCategory ?? [],
        });
      } catch (error) {
        console.error('Ошибка при получении десерта:', error);
        alert('Ошибка при получении десерта');
        navigate('/');
      }
    }

    fetchCakes();
  }, [id, navigate]);

  useEffect(() => {
    setActiveType(0); // Сбрасываем activeType при изменении cake
  }, [cake]);

  const onClickAdd = () => {
    if (!cake || !id) return;
    const selectedType = cake.typesOfCategory[activeType] || cake.typesOfCategory[0] || '';
    const item: CartItem = {
      id,
      title: cake.title,
      price: cake.price,
      imageUrl: cake.imageUrl,
      types: selectedType,
      category: cake.category,
      count: 0,
    };
    dispatch(addItem(item));
  };

  if (!id) {
    return <NotFound />;
  }

  if (!cake) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="cake-content">
        <div className="cake-content__image-block">
          <img src={cake.imageUrl} alt={cake.title} />
        </div>
        <div className="cake-content__info-block">
          <h2 className="info-block__cake-name">{cake.title}</h2>
          {cake.description && (
            <p className="info-block__cake-description">{cake.description}</p>
          )}
          {cake.compound && (
            <p className="info-block__cake-compound">Состав: {cake.compound}</p>
          )}
        </div>
        <div className="cake-content__selector">
          {cake.typesOfCategory.length > 0 ? (
            <ul>
              {cake.typesOfCategory.map((typeName, index) => (
                <li
                  key={index}
                  className={activeType === index ? 'active' : ''}
                  onClick={() => setActiveType(index)}
                >
                  {typeName}
                </li>
              ))}
            </ul>
          ) : (
            // <p>Варианты отсутствуют</p>
            <p></p>
          )}
        </div>
        <div className="cake-content__added-block">
          <button
            className="button button--outline button--add added-block__cake-added"
            onClick={onClickAdd}
            disabled={cake.typesOfCategory.length === 0}
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
          <h4 className="added-block__cake-price">{cake.price} ₽</h4>
        </div>
      </div>
    </div>
  );
};

export default FullCakes;

