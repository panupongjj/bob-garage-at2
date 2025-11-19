// API service layer for backend communication
const API_BASE_URL = 'http://localhost:3001/api';

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('bobs_garage_token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'An error occurred' }));
    throw new Error(error.error || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};

// Auth API
export const authAPI = {
  register: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  },

  login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    return handleResponse(response);
  },

  getProfile: async () => {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },
};

// Services API
export const servicesAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/services`, {
      method: 'GET',
    });
    return handleResponse(response);
  },

  create: async (serviceData) => {
    const formData = new FormData();
    formData.append('name', serviceData.name);
    formData.append('description', serviceData.description);
    formData.append('price', serviceData.price);
    if (serviceData.image) {
      formData.append('image', serviceData.image);
    }

    const token = localStorage.getItem('bobs_garage_token');
    const response = await fetch(`${API_BASE_URL}/services`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    return handleResponse(response);
  },

  update: async (id, serviceData) => {
    const formData = new FormData();
    if (serviceData.name) formData.append('name', serviceData.name);
    if (serviceData.description) formData.append('description', serviceData.description);
    if (serviceData.price) formData.append('price', serviceData.price);
    if (serviceData.image) {
      formData.append('image', serviceData.image);
    }

    const token = localStorage.getItem('bobs_garage_token');
    const response = await fetch(`${API_BASE_URL}/services/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    return handleResponse(response);
  },

  delete: async (id) => {
    const token = localStorage.getItem('bobs_garage_token');
    const response = await fetch(`${API_BASE_URL}/services/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return handleResponse(response);
  },
};

// Staff API
export const staffAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/staff`, {
      method: 'GET',
    });
    return handleResponse(response);
  },
};

// Saved Items API
export const savedItemsAPI = {
  getAll: async () => {
    const token = localStorage.getItem('bobs_garage_token');
    const response = await fetch(`${API_BASE_URL}/saved-items`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  add: async (serviceId) => {
    const token = localStorage.getItem('bobs_garage_token');
    const response = await fetch(`${API_BASE_URL}/saved-items`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ serviceId }),
    });
    return handleResponse(response);
  },

  remove: async (id) => {
    const token = localStorage.getItem('bobs_garage_token');
    const response = await fetch(`${API_BASE_URL}/saved-items/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },
};

