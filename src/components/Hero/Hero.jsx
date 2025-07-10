
import css from './Hero.module.css';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../utils/routes';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className={css.heroContainer}>
      <section className={css.hero}>
        <div className={css.heroContent}>
          <h1 className={css.heroTitle}>
            Amazing Discounts <br /> on Pets Products!
          </h1>
          <button
            className={css.heroButton}
            onClick={() => navigate(ROUTES.SALES)}
          >
            Check out
          </button>
        </div>
      </section>
    </div>
  );
};

export default Hero;
