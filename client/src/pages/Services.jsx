import { useState, useEffect } from 'react';
import { servicesAPI } from '../services/api';
import ServiceCard from '../components/services/ServiceCard';
import './Services.scss';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await servicesAPI.getAll();
        setServices(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="services">
      <div className="services__container">
        <h1 className="services__title">Our Services</h1>
        <p className="services__subtitle">
          Choose from our wide range of automotive services
        </p>

        {loading && <div className="services__loading">Loading services...</div>}
        {error && <div className="services__error">Error: {error}</div>}
        {!loading && !error && (
          <div className="services__grid">
            {services.length > 0 ? (
              services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))
            ) : (
              <p className="services__empty">No services available.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;

