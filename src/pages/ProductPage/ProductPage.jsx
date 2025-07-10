import React, { useEffect, useState } from 'react'
import css from './ProductPage.module.css'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductByAId } from '../../store/petSlice'
import { selectProducts } from '../../redux/selectors'
import Loader from '../../components/Loader/Loader'
import { useCart } from '../../context/CartContext'

const ProductPage = () => {
  const { productId } = useParams()
  const dispatch = useDispatch()
  const products = useSelector(selectProducts)
  const product = products.find((p) => p.id === Number(productId))
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    dispatch(fetchProductByAId(productId))
  }, [dispatch, productId])

  if (!product) return <Loader />

  const discountPercent = product.discount_price
    ? Math.round(
        ((product.price - product.discount_price) / product.price) * 100
      )
    : null

  const handleAddToCart = () => {
    addToCart({ ...product, quantity })
  }

  return (
    <section className={css.product}>
      <div className={css.container}>
        <div className={css.breadcrumbs}>
          <Link to="/">Main page</Link> /{' '}
          <Link to="/categories">Categories</Link> /{' '}
          <span>{product.title}</span>
        </div>

        <div className={css.content}>
          <div className={css.gallery}>
            {/* В реальности: product.galleryImages.map(...) */}
          </div>

          <div className={css.mainImage}>
            <img
              src={`http://localhost:3333${product.image}`}
              alt={product.title}
            />
          </div>

          <div className={css.info}>
            <h1>{product.title}</h1>
            <div className={css.prices}>
              <span className={css.price}>
                ${product.discount_price || product.price}
              </span>
              {product.discount_price && (
                <>
                  <span className={css.oldPrice}>${product.price}</span>
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
              <p>{product.description || 'No description available'}</p>
              <a href="#more">Read more</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductPage
