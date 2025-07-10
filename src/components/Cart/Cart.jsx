
import { useDispatch, useSelector } from 'react-redux';
import {
  removeFromCart,
  incrementQty,
  decrementQty,
  clearCart,
} from '../../store/cartSlice';
import QuantityControls from '../UI/QuantityControls/QuantityControls';
import css from './Cart.module.css';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useState } from 'react';

const Cart = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const total = items.reduce((acc, item) => {
    const itemPrice = item.discount_price || item.price;
    return acc + itemPrice * item.quantity;
  }, 0);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const orderData = {
      customer: data,
      items: items.map(({ id, title, quantity, price, discount_price }) => ({
        id,
        title,
        quantity,
        price: discount_price || price,
      })),
      total: total.toFixed(2),
    };

    try {
      await axios.post('http://localhost:3333/order/send', orderData);
      dispatch(clearCart());
      reset();
      setIsSuccessModalOpen(true);
    } catch (error) {
      console.error('Ошибка отправки заказа:', error);
    }
  };

  return (
    <div className={css.cart}>
      <h2 className={css.title}>Корзина</h2>

      {items.length === 0 ? (
        <p className={css.empty}>Корзина пуста</p>
      ) : (
        <>
          <ul className={css.list}>
            {items.map((item) => (
              <li key={item.id} className={css.item}>
                <img
                  src={`http://localhost:3333${item.image}`}
                  alt={item.title}
                  className={css.image}
                />
                <div className={css.details}>
                  <h4>{item.title}</h4>
                  <p>Цена: ${item.discount_price || item.price}</p>
                  <QuantityControls
                    quantity={item.quantity}
                    onIncrement={() => dispatch(incrementQty(item.id))}
                    onDecrement={() => dispatch(decrementQty(item.id))}
                  />
                  <button
                    className={css.removeBtn}
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    Удалить
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className={css.footer}>
            <h3>Итого: ${total.toFixed(2)}</h3>
            <button
              className={css.clearBtn}
              onClick={() => dispatch(clearCart())}
            >
              Очистить корзину
            </button>
          </div>

          <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
            <h3>Оформить заказ</h3>

            <label>
              Имя:
              <input
                type="text"
                {...register('name', { required: 'Введите имя' })}
              />
              {errors.name && <p className={css.error}>{errors.name.message}</p>}
            </label>

            <label>
              Телефон:
              <input
                type="tel"
                {...register('phone', {
                  required: 'Введите телефон',
                  pattern: {
                    value: /^[0-9+\-() ]{7,20}$/,
                    message: 'Некорректный номер телефона',
                  },
                })}
              />
              {errors.phone && <p className={css.error}>{errors.phone.message}</p>}
            </label>

            <label>
              Email:
              <input
                type="email"
                {...register('email', {
                  required: 'Введите email',
                  pattern: {
                    value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                    message: 'Некорректный email',
                  },
                })}
              />
              {errors.email && <p className={css.error}>{errors.email.message}</p>}
            </label>

            <button type="submit" className={css.orderBtn}>
              Оформить заказ
            </button>
          </form>
        </>
      )}

      {/* Модальное окно */}
      {isSuccessModalOpen && (
        <div className={css.modal}>
          <div className={css.modalContent}>
            <p>Спасибо! Ваш заказ успешно отправлен.</p>
            <button
              className={css.closeBtn}
              onClick={() => setIsSuccessModalOpen(false)}
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
