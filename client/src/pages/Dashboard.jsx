import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { servicesAPI } from '../services/api';
import ServiceTable from '../components/admin/ServiceTable';
import ServiceForm from '../components/admin/ServiceForm';
import './Dashboard.scss';

const Dashboard = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [showAddForm, setShowAddForm] = useState(false);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isAdmin()) {
      navigate('/');
      return;
    }
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const data = await servicesAPI.getAll();
      setServices(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddService = async (formData) => {
    setFormLoading(true);
    setError('');
    try {
      await servicesAPI.create(formData);
      await fetchServices();
      setShowAddForm(false);
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to create service');
    } finally {
      setFormLoading(false);
    }
  };

  const handleEditService = (service) => {
    setEditingService(service);
    setShowAddForm(false);
  };

  const handleUpdateService = async (formData) => {
    setFormLoading(true);
    setError('');
    try {
      await servicesAPI.update(editingService.id, formData);
      await fetchServices();
      setEditingService(null);
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to update service');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteService = async (id) => {
    if (!window.confirm('Are you sure you want to delete this service?')) {
      return;
    }

    try {
      await servicesAPI.delete(id);
      await fetchServices();
    } catch (err) {
      setError(err.message || 'Failed to delete service');
    }
  };

  const handleCancelEdit = () => {
    setEditingService(null);
    setShowAddForm(false);
  };

  const handleAddClick = () => {
    setEditingService(null);
    setShowAddForm(true);
  };

  if (!isAdmin()) {
    return null;
  }

  return (
    <div className="dashboard">
      <main className="dashboard__main">
        {error && <div className="dashboard__error">{error}</div>}

        {showAddForm && !editingService && (
          <ServiceForm
            onSubmit={handleAddService}
            onCancel={() => setShowAddForm(false)}
            loading={formLoading}
          />
        )}

        {editingService && (
          <ServiceForm
            service={editingService}
            onSubmit={handleUpdateService}
            onCancel={handleCancelEdit}
            loading={formLoading}
          />
        )}

        {!showAddForm && !editingService && (
          <ServiceTable
            services={services}
            onEdit={handleEditService}
            onDelete={handleDeleteService}
            onAdd={handleAddClick}
            loading={loading}
          />
        )}
      </main>
    </div>
  );
};

export default Dashboard;

