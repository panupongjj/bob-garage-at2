import { Link } from 'react-router-dom';
import './Home.scss';

const Home = () => {
  return (
    <div className="home">
      <section className="home__hero">
        <div className="home__hero-content">
          <h1 className="home__title">Welcome to Bob's Garage</h1>
          <p className="home__subtitle">
            Your trusted partner for all automotive services
          </p>
          <div className="home__cta">
            <Link to="/services" className="home__cta-button home__cta-button--primary">
              View Services
            </Link>
            <Link to="/about" className="home__cta-button home__cta-button--secondary">
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

