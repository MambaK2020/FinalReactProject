import React, { useEffect, useState } from 'react'
import css from './AllProductsPage.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { selectProducts, selectProductsLoading } from '../../redux/selectors'
import { fetchProductsAll } from '../../store/petSlice'
import Loader from '../../components/Loader/Loader'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { ROUTES } from '../../utils/routes'

const AllProductsPage = () => {
  const dispatch = useDispatch()
  const products = useSelector(selectProducts)
  const isLoading = useSelector(selectProductsLoading)
  const { addToCart } = useCart()

  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [onlyDiscounted, setOnlyDiscounted] = useState(false)
  const [sortOption, setSortOption] = useState('')

  useEffect(() => {
    dispatch(fetchProductsAll())
  }, [dispatch])

  const calculateDiscountPercent = (price, discountPrice) => {
    if (!discountPrice) return 0
    return Math.round(((price - discountPrice) / price) * 100)
  }

  let filteredProducts = products.filter((product) => {
    const price = product.discount_price || product.price
    const passesMin = minPrice === '' || price >= parseFloat(minPrice)
    const passesMax = maxPrice === '' || price <= parseFloat(maxPrice)
    const passesDiscount = !onlyDiscounted || product.discount_price
    return passesMin && passesMax && passesDiscount
  })

  filteredProducts = [...filteredProducts].sort((a, b) => {
    const priceA = a.discount_price || a.price
    const priceB = b.discount_price || b.price
    if (sortOption === 'price-asc') return priceA - priceB
    if (sortOption === 'price-desc') return priceB - priceA
    if (sortOption === 'newest') return b.id - a.id
    if (sortOption === 'oldest') return a.id - b.id
    return 0
  })

  if (isLoading) return <Loader />

  return (
    <section className={css.product}>
      <div className={css.container}>
        <h2 className={css.secondTitle}>All Products</h2>

        <div className={css.sortFilterBar}>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="">Sort by</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>

          <input
            type="number"
            placeholder="Price from"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <input
            type="number"
            placeholder="Price to"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
          <label>
            <input
              type="checkbox"
              checked={onlyDiscounted}
              onChange={() => setOnlyDiscounted((prev) => !prev)}
            />
            Only discounted
          </label>
        </div>

        <ul className={css.list}>
          {filteredProducts.map((product) => {
            const discountPercent = calculateDiscountPercent(
              product.price,
              product.discount_price
            )

            return (
              <li key={product.id} className={css.item}>
                <Link
                  to={`${ROUTES.PRODUCT}/${product.id}`}
                  className={css.cardLink}
                >
                  <div className={css.discountsWrapp}>
                    <img
                      className={css.img}
                      src={`http://localhost:3333${product.image}`}
                      alt={product.title}
                    />
                    {discountPercent > 0 && (
                      <div className={css.discounts}>-{discountPercent}%</div>
                    )}
                  </div>

                  <div className={css.cardContent}>
                    <h3 className={css.itemTitle}>{product.title}</h3>
                    <div className={css.priceContainer}>
                      <div className={css.priceWrapp}>
                        {product.discount_price ? (
                          <>
                            <span className={css.discountedPrice}>
                              ${product.discount_price}
                            </span>
                            <span className={css.originalPrice}>
                              ${product.price}
                            </span>
                          </>
                        ) : (
                          <span className={css.price}>${product.price}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>

                <button
                  className={css.addToCartBtn}
                  onClick={() => addToCart(product)}
                >
                  Add to cart
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

export default AllProductsPage
