import './ServiceTable.scss';

const ServiceTable = ({ services, onEdit, onDelete, onAdd, loading }) => {
  return (
    <div className="service-table">
      <div className="service-table__header">
        <h2 className="service-table__title">Services List</h2>
        {onAdd && (
          <button
            className="service-table__add-button"
            onClick={onAdd}
          >
            ➕ Add Service
          </button>
        )}
      </div>
      {loading && <div className="service-table__loading">Loading services...</div>}
      {!loading && services.length === 0 && (
        <div className="service-table__empty">No services found. Add your first service!</div>
      )}
      {!loading && services.length > 0 && (
        <div className="service-table__container">
          <table className="service-table__table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service.id}>
                  <td>
                    {service.imageUrl ? (
                      <img
                        src={service.imageUrl}
                        alt={service.name}
                        className="service-table__image"
                      />
                    ) : (
                      <span className="service-table__no-image">No image</span>
                    )}
                  </td>
                  <td>{service.name}</td>
                  <td className="service-table__description">
                    {service.description.length > 100
                      ? `${service.description.substring(0, 100)}...`
                      : service.description}
                  </td>
                  <td>${parseFloat(service.price).toFixed(2)}</td>
                  <td>
                    <div className="service-table__actions">
                      <button
                        className="service-table__button service-table__button--edit"
                        onClick={() => onEdit(service)}
                      >
                        Edit
                      </button>
                      <button
                        className="service-table__button service-table__button--delete"
                        onClick={() => onDelete(service.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ServiceTable;

