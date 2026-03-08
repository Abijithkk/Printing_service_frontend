import { useState, useEffect } from 'react';
import Table from '../../components/common/Table';
import Modal from '../../components/common/Modal';
import Toggle from '../../components/common/Toggle';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import Button from '../../components/common/Button';
import NavigationForm from '../../components/admin/forms/NavigationForm';
import Loader from '../../components/common/Loader';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useToast } from '../../hooks/useToast';
import useNavigation from '../../hooks/useNavigation';

const NavigationPage = () => {
  const { success, error: showError } = useToast();
  const {
    data: navItems,
    isLoading: loading,
    error,
    fetchNavigation,
    createNavigationAction,
    updateNavigationAction,
    deleteNavigationAction,
    reorderNavigationAction,
    toggleNavigationStatusAction,
    removeError,
  } = useNavigation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const normalizeItem = (item) => ({
    ...item,
    id: item._id || item.id,
  });

  useEffect(() => {
    fetchNavigation();
  }, [fetchNavigation]);

  useEffect(() => {
    if (error) {
      showError(error);
      removeError();
    }
  }, [error, showError, removeError]);

  const handleOpenModal = (item = null) => {
    removeError();
    if (item) {
      setEditingItem(item);
    } else {
      setEditingItem(null);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);

    try {
      if (editingItem) {
        const result = await updateNavigationAction({
          id: editingItem.id,
          formData,
        });
        if (result.error) {
          showError(result.payload || 'Failed to update navigation item');
        } else {
          success('Navigation item updated successfully');
          handleCloseModal();
        }
      } else {
        const result = await createNavigationAction(formData);
        if (result.error) {
          showError(result.payload || 'Failed to create navigation item');
        } else {
          success('Navigation item created successfully');
          handleCloseModal();
        }
      }
    } catch (err) {
      showError('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setIsConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    const result = await deleteNavigationAction(itemToDelete.id);
    if (result.error) {
      showError(result.payload || 'Failed to delete navigation item');
    } else {
      success('Navigation item deleted successfully');
      setIsConfirmOpen(false);
      setItemToDelete(null);
    }
  };

  const toggleActive = async (item) => {
    const result = await toggleNavigationStatusAction(item.id);
    if (result.error) {
      showError(result.payload || 'Failed to toggle navigation item status');
      fetchNavigation();
    } else {
      const updatedItem = normalizeItem(result.payload);
      success(
        `Navigation item ${updatedItem.isActive ? 'activated' : 'deactivated'} successfully`,
      );
    }
  };

  const handleReorder = async (newItems) => {
    const result = await reorderNavigationAction(newItems);
    if (result.error) {
      showError(result.payload || 'Failed to reorder navigation items');
      fetchNavigation();
    } else {
      success('Navigation items reordered successfully');
    }
  };

  const columns = [
    {
      header: '',
      accessor: 'dragHandle',
    },
    {
      header: 'Order',
      accessor: 'order',
      render: (row) => (
        <div className="flex items-center text-gray-500">{row.order}</div>
      ),
    },
    {
      header: 'Menu Title',
      accessor: 'title',
      render: (row) => (
        <span className="font-medium text-gray-900">{row.title}</span>
      ),
    },
    {
      header: 'Status',
      accessor: 'isActive',
      render: (row) => (
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
            row.isActive
              ? 'bg-green-100 text-green-800'
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          {row.isActive ? 'Active' : 'Inactive'}
        </span>
      ),
    },
    {
      header: 'Actions',
      accessor: 'actions',
      render: (row) => (
        <div className="flex items-center gap-3">
          <Toggle checked={row.isActive} onChange={() => toggleActive(row)} />
          <div className="flex gap-2">
            <button
              onClick={() => handleOpenModal(row)}
              className="rounded-md bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-600 transition hover:bg-blue-100"
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteClick(row)}
              className="rounded-md bg-red-50 px-3 py-1.5 text-sm font-medium text-red-600 transition hover:bg-red-100"
            >
              Delete
            </button>
          </div>
        </div>
      ),
    },
  ];

  if (loading && navItems.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl pb-12">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Navigation Manager
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage your website&lsquo;s primary header navigation items.
          </p>
        </div>
        <Button
          onClick={() => handleOpenModal()}
          icon={PlusIcon}
          className="px-4 py-2.5"
        >
          Add Menu Item
        </Button>
      </div>

      {error && (
        <div className="mb-4 rounded-md bg-red-50 p-4">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      <Table
        columns={columns}
        data={
          Array.isArray(navItems)
            ? [...navItems].sort((a, b) => a.order - b.order)
            : []
        }
        onReorder={handleReorder}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}
      >
        <NavigationForm
          initialData={editingItem}
          onSubmit={handleSubmit}
          onCancel={handleCloseModal}
          isLoading={isSubmitting}
        />
      </Modal>

      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Menu Item"
        message={`Are you sure you want to delete "${itemToDelete?.title}"? This will remove it from the website navigation.`}
      />
    </div>
  );
};

export default NavigationPage;
