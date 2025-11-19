import './StaffCard.scss';

const StaffCard = ({ staff }) => {
  return (
    <div className="staff-card">
      {staff.imageUrl && (
        <div className="staff-card__image-container">
          <img
            src={staff.imageUrl}
            alt={staff.name}
            className="staff-card__image"
          />
        </div>
      )}
      <div className="staff-card__content">
        <h3 className="staff-card__name">{staff.name}</h3>
        <p className="staff-card__role">{staff.role}</p>
        <p className="staff-card__bio">{staff.bio}</p>
      </div>
    </div>
  );
};

export default StaffCard;

