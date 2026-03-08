import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from '../../components/common/Table';
import Modal from '../../components/common/Modal';
import Toggle from '../../components/common/Toggle';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import Button from '../../components/common/Button';
import NavigationForm from '../../components/admin/forms/NavigationForm';
import Loader from '../../components/common/Loader';
import { PlusIcon } from '@heroicons/react/24/outline';
import axiosInstance from '../../config/axiosInstance';
import API_ENDPOINTS from '../../constants/apiEndpoints';
import { useToast } from '../../hooks/useToast';
import {
  setNavigationItems,
  addNavigationItem,
  updateNavigationItem,
  deleteNavigationItem,
  reorderNavigationItems,
  setLoading,
  setError,
  clearError,
} from '../../store/slices/navigationSlice';

const NavigationPage = () => {
  const dispatch = useDispatch();
  const {
    items: navItems,
    loading,
    error,
  } = useSelector((state) => state.navigation);
  const { success, error: showError } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const normalizeItem = (item) => ({
    ...item,
    id: item._id || item.id,
  });

  const fetchNavItems = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const response = await axiosInstance.get(
        API_ENDPOINTS.NAVIGATION.GET_ALL,
      );
      const items = Array.isArray(response.data?.data)
        ? response.data.data.map(normalizeItem)
        : [];
      dispatch(setNavigationItems(items));
      dispatch(clearError());
    } catch (err) {
      const message =
        err.response?.data?.message || 'Failed to fetch navigation items';
      dispatch(setError(message));
      showError(message);
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, showError]);

  useEffect(() => {
    fetchNavItems();
  }, [fetchNavItems]);

  const handleOpenModal = (item = null) => {
    dispatch(clearError());
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
    try {
      setIsSubmitting(true);

      if (editingItem) {
        const url = API_ENDPOINTS.NAVIGATION.UPDATE.replace(
          ':id',
          editingItem.id,
        );
        const response = await axiosInstance.put(url, formData);
        const item = normalizeItem(response.data?.data || response.data);
        dispatch(updateNavigationItem({ ...item }));
        success('Navigation item updated successfully');
      } else {
        const response = await axiosInstance.post(
          API_ENDPOINTS.NAVIGATION.CREATE,
          formData,
        );
        const item = normalizeItem(response.data?.data || response.data);
        dispatch(addNavigationItem(item));
        success('Navigation item created successfully');
      }

      handleCloseModal();
    } catch (err) {
      const message =
        err.response?.data?.message || 'Failed to save navigation item';
      showError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setIsConfirmOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const url = API_ENDPOINTS.NAVIGATION.DELETE.replace(
        ':id',
        itemToDelete.id,
      );
      await axiosInstance.delete(url);
      dispatch(deleteNavigationItem(itemToDelete.id));
      success('Navigation item deleted successfully');
      setIsConfirmOpen(false);
      setItemToDelete(null);
    } catch (err) {
      const message =
        err.response?.data?.message || 'Failed to delete navigation item';
      showError(message);
    }
  };

  const toggleActive = async (item) => {
    try {
      const url = API_ENDPOINTS.NAVIGATION.TOGGLE_ACTIVE.replace(
        ':id',
        item.id,
      );
      const response = await axiosInstance.patch(url);
      const updatedItem = normalizeItem(response.data?.data || response.data);
      dispatch(updateNavigationItem(updatedItem));
      success(
        `Navigation item ${updatedItem.isActive ? 'activated' : 'deactivated'} successfully`,
      );
    } catch (err) {
      const message =
        err.response?.data?.message ||
        'Failed to toggle navigation item status';
      showError(message);
      fetchNavItems();
    }
  };

  const handleReorder = async (newItems) => {
    try {
      const reorderData = newItems.map((item, index) => ({
        id: item._id || item.id,
        order: index + 1,
      }));

      await axiosInstance.put(API_ENDPOINTS.NAVIGATION.REORDER, reorderData);
      const updatedItems = newItems
        .map((item, index) => ({
          ...item,
          order: index + 1,
        }))
        .sort((a, b) => a.order - b.order);
      dispatch(reorderNavigationItems(updatedItems));
      success('Navigation items reordered successfully');
    } catch (err) {
      const message =
        err.response?.data?.message || 'Failed to reorder navigation items';
      showError(message);
      fetchNavItems();
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