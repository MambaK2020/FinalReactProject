import React, { useEffect } from 'react'
import css from './AllProductsPage.module.css'
import { useDispatch, useSelector } from 'react-redux';

import { fetchProductsAll } from '../../store/petSlice';
import CardProduct from '../../components/CardProduct/CardProduct';



const AllProductsPage = () => {
  const dispatch = useDispatch()
  const products = useSelector(selectFilteredProducts)



  useEffect(() => {
    dispatch(fetchProductsAll())
  }, [dispatch])


  
  
    if (isLoading) {
      return <Loader />;
    }
  return (
    <section className={css.product}>
      <div className={css.container}>
        <h2 className={css.secondTitle}>All product</h2>
        <Filter/>
        <ul className={css.list}>
          {products.map(({ id, image, title, discont_price, price }) => {
            const discountPercent = calculateDiscountPercent(
              price,
              discont_price
            );
            return (
              <CardProduct
                key={id}
                id={id}
                title={title}
                image={image}
                discountPercent={discountPercent}
                discont_price={discont_price}
                price={price}
              />
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export default AllProductsPage