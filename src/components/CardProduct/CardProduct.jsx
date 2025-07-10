
import css from './CardProduct.module.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/cartSlice';
import { ROUTES } from '../../utils/routes';

const CardProduct = ({
  id,
  image,
  title,
  discountPercent,
  discount_price,
  price,
}) => {
  const dispatch = useDispatch();

  const product = {
    id,
    image,
    title,
    price,
    discount_price,
    discountPercent,
  };

  return (
    <li key={id} className={css.item}>
      <Link to={`${ROUTES.PRODUCT}/${id}`} className={css.cardLink}>
        <div className={css.discountsWrapp}>
          <img
            className={css.img}
            src={`http://localhost:3333${image}`}
            alt={title}
          />
          {discountPercent > 0 && (
            <div className={css.discounts}>-{discountPercent}%</div>
          )}
        </div>

        <div className={css.cardContent}>
          <h3 className={css.itemTitle}>{title}</h3>
          <div className={css.priceContainer}>
            <div className={css.priceWrapp}>
              {discount_price ? (
                <>
                  <span className={css.discountedPrice}>${discount_price}</span>
                  <span className={css.originalPrice}>${price}</span>
                </>
              ) : (
                <span className={css.price}>${price}</span>
              )}
            </div>
          </div>
        </div>
      </Link>

      <button className={css.addToCartBtn} onClick={() => dispatch(addToCart(product))}>
        Добавить в корзину
      </button>
    </li>
  );
};

export default CardProduct;
