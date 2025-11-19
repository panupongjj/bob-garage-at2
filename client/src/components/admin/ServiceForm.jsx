import { useState, useEffect } from 'react';
import './ServiceForm.scss';

const ServiceForm = ({ service = null, onSubmit, onCancel, loading }) => {
  const [name, setName] = useState(service?.name || '');
  const [description, setDescription] = useState(service?.description || '');
  const [price, setPrice] = useState(service?.price || '');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(service?.imageUrl || null);
  const [error, setError] = useState('');

  // Update form when service prop changes
  useEffect(() => {
    if (service) {
      setName(service.name || '');
      setDescription(service.description || '');
      setPrice(service.price || '');
      setImagePreview(service.imageUrl || null);
      setImage(null);
    } else {
      setName('');
      setDescription('');
      setPrice('');
      setImagePreview(null);
      setImage(null);
    }
    setError('');
  }, [service]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size must be less than 5MB');
        return;
      }
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file');
        return;
      }
      setImage(file);
      setError('');
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!name || !description || !price) {
      setError('Please fill in all required fields');
      return;
    }

    const formData = {
      name,
      description,
      price: parseFloat(price).toFixed(2),
      image,
    };

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="service-form">
      <h2 className="service-form__title">
        {service ? 'Edit Service' : 'Add New Service'}
      </h2>

      {error && <div className="service-form__error">{error}</div>}

      <div className="service-form__field">
        <label htmlFor="name" className="service-form__label">
          Name *
        </label>
        <input
          id="name"
          type="text"
          className="service-form__input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          minLength={2}
          maxLength={200}
          placeholder="Service name"
        />
      </div>

      <div className="service-form__field">
        <label htmlFor="description" className="service-form__label">
          Description *
        </label>
        <textarea
          id="description"
          className="service-form__textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          minLength={10}
          maxLength={1000}
          rows={4}
          placeholder="Service description"
        />
      </div>

      <div className="service-form__field">
        <label htmlFor="price" className="service-form__label">
          Price *
        </label>
        <input
          id="price"
          type="number"
          className="service-form__input"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          min="0"
          step="0.01"
          placeholder="0.00"
        />
      </div>

      <div className="service-form__field">
        <label htmlFor="image" className="service-form__label">
          Image {!service && '(Optional)'}
        </label>
        {imagePreview && (
          <div className="service-form__image-preview">
            <img src={imagePreview} alt="Preview" />
          </div>
        )}
        <input
          id="image"
          type="file"
          className="service-form__file-input"
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>

      <div className="service-form__actions">
        {onCancel && (
          <button
            type="button"
            className="service-form__button service-form__button--cancel"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="service-form__button service-form__button--submit"
          disabled={loading}
        >
          {loading ? 'Saving...' : service ? 'Update Service' : 'Add Service'}
        </button>
      </div>
    </form>
  );
};

export default ServiceForm;

