import { calcTotalPrice } from './calcTotalPrice';

/**
 * Функция для того, чтобы проверить есть ли карточки товара в локальном хранилище, если есть, то вернуть их, иначе пустой массив
 * @returns {JSON}
 */
export const getCartFromLS = () => {
  const data = localStorage.getItem('cart');
  const items = data ? JSON.parse(data) : [];
  const totalPrice = calcTotalPrice(items);

  return {
    items,
    totalPrice,
  };
};
