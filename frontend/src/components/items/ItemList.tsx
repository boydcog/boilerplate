import { Item } from '../../types/item';
import Button from '../ui/Button';

interface ItemListProps {
  items: Item[];
  onEdit: (item: Item) => void;
  onDelete: (id: number) => void;
  loading?: boolean;
}

const ItemList = ({
  items,
  onEdit,
  onDelete,
  loading = false,
}: ItemListProps): JSX.Element => {
  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No items found. Create your first item!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-medium text-gray-900">
                  {item.title}
                </h3>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    item.is_active
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {item.is_active ? 'Active' : 'Inactive'}
                </span>
              </div>
              {item.description && (
                <p className="mt-2 text-gray-600">{item.description}</p>
              )}
              <div className="mt-3 text-sm text-gray-500">
                <p>Created: {new Date(item.created_at).toLocaleDateString()}</p>
                {item.updated_at !== item.created_at && (
                  <p>
                    Updated: {new Date(item.updated_at).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
            <div className="flex space-x-2 ml-4">
              <Button
                size="sm"
                variant="secondary"
                onClick={() => onEdit(item)}
              >
                Edit
              </Button>
              <Button
                size="sm"
                variant="danger"
                onClick={() => onDelete(item.id)}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
