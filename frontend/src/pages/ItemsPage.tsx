import { useState } from 'react';
import { Item, ItemCreate, ItemUpdate } from '../types/item';
import {
  useItems,
  useCreateItem,
  useUpdateItem,
  useDeleteItem,
} from '../hooks/useItems';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import ItemForm from '../components/items/ItemForm';
import ItemList from '../components/items/ItemList';

const ItemsPage = (): JSX.Element => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);

  const { data: items = [], isLoading, error } = useItems();
  const createMutation = useCreateItem();
  const updateMutation = useUpdateItem();
  const deleteMutation = useDeleteItem();

  const handleCreate = (data: unknown): void => {
    createMutation.mutate(data as ItemCreate, {
      onSuccess: () => {
        setIsCreateModalOpen(false);
      },
    });
  };

  const handleUpdate = (data: unknown): void => {
    if (editingItem) {
      updateMutation.mutate(
        { id: editingItem.id, item: data as ItemUpdate },
        {
          onSuccess: () => {
            setEditingItem(null);
          },
        }
      );
    }
  };

  const handleDelete = (id: number): void => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      deleteMutation.mutate(id);
    }
  };

  if (error) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Error loading items
              </h3>
              <div className="mt-2 text-sm text-red-700">
                <p>Please check your API connection and try again.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Items</h1>
          <p className="text-gray-600 mt-1">
            Manage your items - this is a sample CRUD implementation
          </p>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)}>Create Item</Button>
      </div>

      <ItemList
        items={items}
        onEdit={setEditingItem}
        onDelete={handleDelete}
        loading={isLoading}
      />

      {/* Create Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Item"
      >
        <ItemForm
          onSubmit={handleCreate}
          onCancel={() => setIsCreateModalOpen(false)}
          loading={createMutation.isLoading}
        />
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={!!editingItem}
        onClose={() => setEditingItem(null)}
        title="Edit Item"
      >
        {editingItem && (
          <ItemForm
            item={editingItem}
            onSubmit={handleUpdate}
            onCancel={() => setEditingItem(null)}
            loading={updateMutation.isLoading}
          />
        )}
      </Modal>
    </div>
  );
};

export default ItemsPage;
