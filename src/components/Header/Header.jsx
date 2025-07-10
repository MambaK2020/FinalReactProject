
import { NavLink } from 'react-router-dom'
import cartImg from '../../assets/images/basket-empty.svg'
import logo from '../../assets/images/pet-logo.svg'
import css from './Header.module.css'

const Header = () => {
  const cartItemsCount = 3;

  return (
    <header className={css.headerContainer}>
      <nav className={css.nav}>
        <div className={css.leftSection}>
          <NavLink to="/">
            <img className={css.logo} src={logo} alt="logo" />
          </NavLink>

          <div className={css.navLinks}>
            <NavLink to="/" className={({ isActive }) => (isActive ? css.activeLink : css.link)}>
              Главная
            </NavLink>
            <NavLink to="/categories" className={({ isActive }) => (isActive ? css.activeLink : css.link)}>
              Категории
            </NavLink>
            <NavLink to="/products" className={({ isActive }) => (isActive ? css.activeLink : css.link)}>
              Все продукты
            </NavLink>
            <NavLink to="/sales" className={({ isActive }) => (isActive ? css.activeLink : css.link)}>
              Все акции
            </NavLink>
          </div>
        </div>

        <div className={css.cartWrapp}>
          <NavLink to="/shopping" className={css.cartLink}>
            <img className={css.cartImg} src={cartImg} alt="cart" />
            <span className={css.cartCount}>{cartItemsCount}</span>
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Header;
