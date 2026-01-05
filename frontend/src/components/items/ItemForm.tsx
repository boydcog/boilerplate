import { useForm } from 'react-hook-form';
import { Item, ItemCreate, ItemUpdate } from '../../types/item';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface ItemFormProps {
  item?: Item;
  onSubmit: (data: ItemCreate | ItemUpdate) => void;
  onCancel: () => void;
  loading?: boolean;
}

const ItemForm = ({
  item,
  onSubmit,
  onCancel,
  loading = false,
}: ItemFormProps): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ItemCreate>({
    defaultValues: {
      title: item?.title || '',
      description: item?.description || '',
      is_active: item?.is_active ?? true,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Title"
        {...register('title', { required: 'Title is required' })}
        error={errors.title?.message}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          {...register('description')}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Optional description..."
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="is_active"
          {...register('is_active')}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="is_active" className="ml-2 block text-sm text-gray-900">
          Active
        </label>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" loading={loading}>
          {item ? 'Update' : 'Create'} Item
        </Button>
      </div>
    </form>
  );
};

export default ItemForm;
