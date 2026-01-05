import { api } from './api';
import { Item, ItemCreate, ItemUpdate } from '../types/item';

export const itemService = {
  // Get all items
  getItems: async (params?: {
    skip?: number;
    limit?: number;
    active_only?: boolean;
  }): Promise<Item[]> => {
    const response = await api.get('/items', { params });
    return response.data;
  },

  // Get item by ID
  getItem: async (id: number): Promise<Item> => {
    const response = await api.get(`/items/${id}`);
    return response.data;
  },

  // Create new item
  createItem: async (item: ItemCreate): Promise<Item> => {
    const response = await api.post('/items', item);
    return response.data;
  },

  // Update item
  updateItem: async (id: number, item: ItemUpdate): Promise<Item> => {
    const response = await api.put(`/items/${id}`, item);
    return response.data;
  },

  // Delete item
  deleteItem: async (id: number): Promise<void> => {
    await api.delete(`/items/${id}`);
  },

  // Get item count
  getItemCount: async (active_only = true): Promise<{ count: number }> => {
    const response = await api.get('/items/count', {
      params: { active_only },
    });
    return response.data;
  },
};
