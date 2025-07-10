import React, { useEffect } from 'react'
import css from './CategoryProducts.module.css'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectCurrentCategory,
  selectProductByCategory,
  selectProductsLoading,
} from '../../redux/selectors'
import { fetchCategoryById } from '../../store/petSlice'
import CardProduct from '../CardProduct/CardProduct'
import Loader from '../Loader/Loader'

const CategoryProduct = () => {
  const { categoryId } = useParams()
  const dispatch = useDispatch()
  const productsByCategory = useSelector(selectProductByCategory)
  const isLoading = useSelector(selectProductsLoading)
  const currentCategory = useSelector(selectCurrentCategory)

  useEffect(() => {
    dispatch(fetchCategoryById(categoryId))
  }, [dispatch, categoryId])

  if (isLoading) {
    return <Loader />
  }

  const calculateDiscountPercent = (price, discountPrice) => {
    if (!discountPrice) return 0
    return Math.round(((price - discountPrice) / price) * 100)
  }

  return (
    <section className={css.categoryProduct}>
      <div className={css.container}>
        <h2 className={css.secondTitle}>
          {currentCategory?.title || 'Products'}
        </h2>

        {productsByCategory.length > 0 ? (
          <ul className={css.list}>
            {productsByCategory.map(
              ({ id, image, title, discount_price, price }) => {
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
              }
            )}
          </ul>
        ) : (
          <p>No products found in this category</p>
        )}
      </div>
    </section>
  )
}

export default CategoryProduct
