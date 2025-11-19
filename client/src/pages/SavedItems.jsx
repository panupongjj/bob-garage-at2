import { useEffect } from 'react';
import { useUser } from '../context/UserContext';
import ServiceCard from '../components/services/ServiceCard';
import './SavedItems.scss';

const SavedItems = () => {
  const { savedItems, loading, fetchSavedItems } = useUser();

  useEffect(() => {
    fetchSavedItems();
  }, []);

  return (
    <div className="saved-items">
      <div className="saved-items__container">
        <h1 className="saved-items__title">My Saved Items</h1>
        <p className="saved-items__subtitle">Your favorite services</p>

        {loading && <div className="saved-items__loading">Loading saved items...</div>}
        {!loading && savedItems.length === 0 && (
          <div className="saved-items__empty">
            <p>You haven't saved any services yet.</p>
            <p>Browse our services and click the heart icon to save your favorites!</p>
          </div>
        )}
        {!loading && savedItems.length > 0 && (
          <div className="saved-items__grid">
            {savedItems.map((item) => (
              <ServiceCard key={item.id} service={item.service} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedItems;

