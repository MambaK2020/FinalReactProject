import React from 'react';
import css from './ShoppingCart.module.css';
import { ROUTES } from '../../utils/routes';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Cart from '../../components/Cart/Cart';

const ShoppingCart = () => {
  const items = useSelector((state) => state.cart.items);

  const isEmpty = items.length === 0;

  return (
    <section className={css.cart}>
      <div className={css.container}>
        {isEmpty ? (
          <div className={css.titleWrapp}>
            <h2 className={css.secondTitle}>Shopping Cart</h2>
            <div className={css.devider}></div>
            <Link className={css.primaryLink} to={ROUTES.CATEGORIES}>
              Back to the store
            </Link>

            <div className={css.wrapp}>
              <p className={css.text}>
                Looks like you have no items in your basket currently.
              </p>
              <Link className={css.spoppingLink} to={ROUTES.CATEGORIES}>
                Continue Shopping
              </Link>
            </div>
          </div>
        ) : (
          <Cart />
        )}
      </div>
    </section>
  );
};

export default ShoppingCart;
