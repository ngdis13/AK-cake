import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import typesOfCategory from '../assets/types.json';
import { addItem, selectCartItemById } from '../redux/slices/cartSlice';

const FullCakes: React.FC = () => {
    const [cake, setCake] = useState<{
      imageUrl: string;
      title: string;
      price: number;
    }>();
    const [activeType, setActiveType] = useState(0);
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    const cartItem = useSelector(selectCartItemById(id));
    const addedCount = cartItem?.count || 0;

  const onClickAdd = () => {
    if (!cake) return;
    const item = {
      id,
      title: cake.title,
      price: cake.price,
      imageUrl: cake.imageUrl,
      type: cake.typesOfCategory ? cake.typesOfCategory[activeType] : '',
    };
    dispatch(addItem(item));
  };

  useEffect(() => {
    async function fetchCakes() {
      try {
        const { data } = await axios.get(
          'https://6836b7ad664e72d28e41cd1f.mockapi.io/Items/' + id
        );
        setCake(data);
      } catch (error) {
        alert('Ошибка при получении десерта');
        navigate('/');
      }
    }

    fetchCakes();
  }, []);

  if (!cake) {
    return 'Loading';
  }
  return (
    <div className="container">
      <div className="cake-content">
        <div className="cake-content__image-block">
          <img src={cake.imageUrl} alt={cake.title} />
        </div>
        <div className="cake-content__info-block">
          <h2 className="info-block__cake-name">{cake.title}</h2>
          <p className="info-block__cake-description">{cake.description}</p>
          <p className="info-block__cake-compound">Состав: {cake.compound}</p>
        </div>

        <div className="cake-content__added-block">
          <button
            className="button button--outline button--add added-block__cake-added"
            onClick={onClickAdd}
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
