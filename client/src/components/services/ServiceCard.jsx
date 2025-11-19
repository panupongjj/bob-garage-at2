import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useUser } from "../../context/UserContext";
import "./ServiceCard.scss";

const ServiceCard = ({ service }) => {
  const { isAuthenticated } = useAuth();
  const { isServiceSaved, addSavedItem, removeSavedItem, getSavedItemId } =
    useUser();
  const [isSaving, setIsSaving] = useState(false);

  const handleFavoriteClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated()) {
      return;
    }

    setIsSaving(true);
    const saved = isServiceSaved(service.id);

    if (saved) {
      const savedItemId = getSavedItemId(service.id);
      await removeSavedItem(savedItemId);
    } else {
      await addSavedItem(service.id);
    }
    setIsSaving(false);
  };

  return (
    <div className="service-card">
      {service.imageUrl && (
        <div className="service-card__image-container">
          <img
            src={service.imageUrl}
            alt={service.name}
            className="service-card__image"
          />
          {isAuthenticated() && (
            <button
              className={`service-card__favorite ${
                isServiceSaved(service.id) ? "active" : ""
              }`}
              onClick={handleFavoriteClick}
              disabled={isSaving}
              aria-label={
                isServiceSaved(service.id)
                  ? "Remove from favorites"
                  : "Add to favorites"
              }
            >
              ⭐
            </button>
          )}
        </div>
      )}
      <div className="service-card__content">
        <h3 className="service-card__name">{service.name}</h3>
        <p className="service-card__description">{service.description}</p>
        <div className="service-card__price">
          ${parseFloat(service.price).toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
