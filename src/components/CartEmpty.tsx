import type React from 'react';
import cartEmpty from '../assets/img/empty-cart.png'
import { Link } from 'react-router-dom';

export const CartEmpty: React.FC = () => {
  return (
    <div className="cart cart--empty">
      <h2>
        Корзина пустая <span>😕</span>
      </h2>
      <p>
        Вероятней всего, вы еще ничего не заказали.
        <br />
        Для того, чтобы заказать, перейди на главную страницу.
      </p>
      <img src={cartEmpty} alt="Empty cart" />
      <Link to="/" className="button button--black">
        <span>Вернуться назад</span>
      </Link>
    </div>
  );
};

