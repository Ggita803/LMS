import api from './api';

// Create a new user
export const createUser = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

// Fetch all users (admin only)
export const getUsers = async () => {
  const response = await api.get('/users');
  return response.data;
};

// Update user profile
export const updateUser = async (userId, updateData) => {
  const response = await api.put(`/users/${userId}`, updateData);
  return response.data;
};

// Delete user (if supported)
export const deleteUser = async (userId) => {
  const response = await api.delete(`/users/${userId}`);
  return response.data;
};
