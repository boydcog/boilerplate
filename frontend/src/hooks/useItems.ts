import { useQuery, useMutation, useQueryClient } from 'react-query';
import { itemService } from '../services/itemService';
import { Item, ItemCreate, ItemUpdate } from '../types/item';
import toast from 'react-hot-toast';

// Query keys
const QUERY_KEYS = {
  items: 'items',
  item: (id: number) => ['item', id],
  itemCount: 'itemCount',
};

// Get all items
export const useItems = (params?: {
  skip?: number;
  limit?: number;
  active_only?: boolean;
}) => {
  return useQuery([QUERY_KEYS.items, params], () =>
    itemService.getItems(params)
  );
};

// Get single item
export const useItem = (id: number) => {
  return useQuery(QUERY_KEYS.item(id), () => itemService.getItem(id), {
    enabled: !!id,
  });
};

// Get item count
export const useItemCount = (active_only = true) => {
  return useQuery([QUERY_KEYS.itemCount, active_only], () =>
    itemService.getItemCount(active_only)
  );
};

// Create item mutation
export const useCreateItem = () => {
  const queryClient = useQueryClient();

  return useMutation((item: ItemCreate) => itemService.createItem(item), {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.items);
      queryClient.invalidateQueries(QUERY_KEYS.itemCount);
      toast.success('Item created successfully!');
    },
    onError: (error: unknown) => {
      const errorMessage =
        error instanceof Error && 'response' in error
          ? (error as { response?: { data?: { detail?: string } } }).response
              ?.data?.detail || 'Failed to create item'
          : 'Failed to create item';
      toast.error(errorMessage);
    },
  });
};

// Update item mutation
export const useUpdateItem = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ id, item }: { id: number; item: ItemUpdate }) =>
      itemService.updateItem(id, item),
    {
      onSuccess: (data: Item) => {
        queryClient.invalidateQueries(QUERY_KEYS.items);
        queryClient.invalidateQueries(QUERY_KEYS.item(data.id));
        toast.success('Item updated successfully!');
      },
      onError: (error: unknown) => {
        const errorMessage =
          error instanceof Error && 'response' in error
            ? (error as { response?: { data?: { detail?: string } } }).response
                ?.data?.detail || 'Failed to update item'
            : 'Failed to update item';
        toast.error(errorMessage);
      },
    }
  );
};

// Delete item mutation
export const useDeleteItem = () => {
  const queryClient = useQueryClient();

  return useMutation((id: number) => itemService.deleteItem(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.items);
      queryClient.invalidateQueries(QUERY_KEYS.itemCount);
      toast.success('Item deleted successfully!');
    },
    onError: (error: unknown) => {
      const errorMessage =
        error instanceof Error && 'response' in error
          ? (error as { response?: { data?: { detail?: string } } }).response
              ?.data?.detail || 'Failed to delete item'
          : 'Failed to delete item';
      toast.error(errorMessage);
    },
  });
};
