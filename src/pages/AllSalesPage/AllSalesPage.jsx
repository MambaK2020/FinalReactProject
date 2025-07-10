import React, { useEffect } from 'react'
import css from './AllSalesPage.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { selectProducts } from '../../redux/selectors'
import { fetchProductsAll } from '../../store/petSlice'
import CardProduct from '../../components/CardProduct/CardProduct'

const AllSalesPage = () => {
  const dispatch = useDispatch()
  const allProducts = useSelector(selectProducts)

  const saleProducts = allProducts.filter(
    (product) => product.discount_price !== null
  )

  useEffect(() => {
    dispatch(fetchProductsAll())
  }, [dispatch])

  const calculateDiscountPercent = (price, discountPrice) => {
    if (!discountPrice) return 0
    return Math.round(((price - discountPrice) / price) * 100)
  }

  return (
    <section className={css.sale}>
      <div className={css.container}>
        <h2 className={css.secondTitle}>All sale</h2>
        <ul className={css.list}>
          {saleProducts.map(({ id, image, title, discount_price, price }) => {
            const discountPercent = calculateDiscountPercent(
              price,
              discount_price
            )
            return (
              <CardProduct
                key={id}
                id={id}
                title={title}
                image={image}
                discountPercent={discountPercent}
                discont_price={discount_price}
                price={price}
              />
            )
          })}
        </ul>
      </div>
    </section>
  )
}

export default AllSalesPage
