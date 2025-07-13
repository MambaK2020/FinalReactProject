import React, { useEffect, useState } from 'react'
import css from './ProductPage.module.css'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { fetchProductById } from '../../store/petSlice' 
import { selectCurrentProduct, selectProductsLoading } from '../../redux/selectors'
import Loader from '../../components/Loader/Loader'
import { addToCart } from '../../store/cartSlice';
import { ROUTES } from '../../utils/routes';

const ProductPage = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const currentProduct = useSelector(selectCurrentProduct);
  const isLoading = useSelector(selectProductsLoading);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductById(productId));
    }
  }, [dispatch, productId]);

  const handleAddToCart = () => {
    if (currentProduct) {
      dispatch(addToCart({ ...currentProduct, quantity }));
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!currentProduct) {
    return (
      <section className={css.product}>
        <div className={css.container}>
          <p className={css.notFoundMessage}>Product not found.</p>
        </div>
      </section>
    );
  }

  const discountPercent = currentProduct.discount_price
    ? Math.round(
        ((currentToProduct.price - currentProduct.discount_price) / currentProduct.price) * 100
      )
    : null;

  return (
    <section className={css.product}>
      <div className={css.container}>
        <div className={css.breadcrumbs}>
          <Link to={ROUTES.MAIN}>Main page</Link> /{' '}
          <Link to={ROUTES.CATEGORIES}>Categories</Link> /{' '}
          <span>{currentProduct.title}</span>
        </div>

        <div className={css.content}>
          <div className={css.gallery}>
        
          </div>

          <div className={css.mainImage}>
            <img
              src={`http://localhost:3333${currentProduct.image}`}
              alt={currentProduct.title}
            />
          </div>

          <div className={css.info}>
            <h1>{currentProduct.title}</h1>
            <div className={css.prices}>
              <span className={css.price}>
                ${currentProduct.discount_price ? currentProduct.discount_price.toFixed(2) : currentProduct.price.toFixed(2)}
              </span>
              {currentProduct.discount_price && (
                <>
                  <span className={css.oldPrice}>${currentProduct.price.toFixed(2)}</span>
                  <span className={css.discount}>-{discountPercent}%</span>
                </>
              )}
            </div>

            <div className={css.quantityControls}>
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
                -
              </button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity((q) => q + 1)}>+</button>
            </div>

            <button className={css.addToCart} onClick={handleAddToCart}>
              Add to cart
            </button>

            <div className={css.description}>
              <h2>Description</h2>
              <p>{currentProduct.description || 'No description available'}</p>
              <a href="#more">Read more</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
