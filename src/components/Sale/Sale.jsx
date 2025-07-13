import React, { useMemo } from 'react'
import css from './Sale.module.css'
import { ROUTES } from '../../utils/routes'
import { Link } from 'react-router-dom'
import CardProduct from '../CardProduct/CardProduct'
import { useSelector } from 'react-redux'
import { selectProducts } from '../../redux/selectors'

const Sale = () => {
  const allProducts = useSelector(selectProducts) || []

  
  const saleProducts = useMemo(() => {
    const productsWithDiscount = allProducts.filter(
      (product) => product.discount_price !== null
    )
    const shuffled = productsWithDiscount.sort(() => 0.5 - Math.random())
    return shuffled.slice(0, 4)
  }, [allProducts])

  const calculateDiscountPercent = (price, discountPrice) => {
    if (!discountPrice) return 0
    return Math.round(((price - discountPrice) / price) * 100)
  }

  return (
    <section className={css.sale}>
      <div className={css.container}>
        <div className={css.titleWrapper}>
          <h2 className={css.secondTitle}>Sale</h2>
          <div className={css.divider}></div>
          <Link className={css.primaryLink} to={ROUTES.SALES}>
            All sales
          </Link>
        </div>
        <ul className={css.listSale}>
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
                discount_price={discount_price}
                price={price}
              />
            )
          })}
        </ul>
      </div>
    </section>
  )
}

export default Sale