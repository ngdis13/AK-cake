import cartEmpty from '../assets/img/empty-cart.png'
import { Link } from 'react-router-dom';

const CartEmpty = () => {
  return (
    <div class="cart cart--empty">
      <h2>
        Корзина пустая <icon>😕</icon>
      </h2>
      <p>
        Вероятней всего, вы еще ничего не заказали.
        <br />
        Для того, чтобы заказать, перейди на главную страницу.
      </p>
      <img src={cartEmpty} alt="Empty cart" />
      <Link to="/" class="button button--black">
        <span>Вернуться назад</span>
      </Link>
    </div>
  );
};

export default CartEmpty;
