import api from './api';

export const fetchCategories = async () => {
  const res = await api.get('/categories');
  // Always return { categories: [...] }
  if (res.data?.data?.items) return { categories: res.data.data.items };
  if (res.data?.data?.categories) return { categories: res.data.data.categories };
  if (res.data?.categories) return { categories: res.data.categories };
  return { categories: [] };
};

export const createCategory = async (category) => {
  const res = await api.post('/categories', category);
  return res.data;
};

export const deleteCategory = async (id) => {
  const res = await api.delete(`/categories/${id}`);
  return res.data;
};

export const updateCategory = async (id, category) => {
  const res = await api.put(`/categories/${id}`, category);
  return res.data;
};
