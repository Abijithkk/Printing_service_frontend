import { useEffect, useMemo, useRef, useState } from 'react';
import Table from '../../components/common/Table';
import Modal from '../../components/common/Modal';
import Toggle from '../../components/common/Toggle';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import ImageUpload from '../../components/common/ImageUpload';
import Button from '../../components/common/Button';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useToast } from '../../hooks/useToast';
import useServices from '../../hooks/useServices';

const ServicesPage = () => {
  const { success, error: showError } = useToast();
  const {
    data,
    isLoading,
    error: apiError,
    fetchServices,
    createServiceAction,
    updateServiceAction,
    deleteServiceAction,
    reorderServicesAction,
    toggleServiceStatusAction,
    removeError,
  } = useServices();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    link: '',
    image: null,
    order: 1,
    isActive: true,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;
    fetchServices();
  }, [fetchServices]);

  useEffect(() => {
    if (apiError) {
      showError(apiError);
      removeError();
    }
  }, [apiError, showError, removeError]);

  const sortedServices = useMemo(() => {
    if (!Array.isArray(data)) return [];
    return [...data].sort(
      (a, b) => (a.order ?? Number.MAX_SAFE_INTEGER) - (b.order ?? Number.MAX_SAFE_INTEGER),
    );
  }, [data]);

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      link: '',
      image: null,
      order: sortedServices.length + 1,
      isActive: true,
    });
    setImagePreview(null);
    setEditingItem(null);
  };

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        title: item.title || '',
        description: item.description || '',
        link: item.link || '',
        image: null,
        order: item.order ?? 1,
        isActive: item.isActive ?? true,
      });
      setImagePreview(item.image || null);
    } else {
      resetForm();
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'order' ? Number(fieldValue) : fieldValue,
    }));
  };

  const handleImageChange = (file) => {
    setFormData((prev) => ({ ...prev, image: file }));
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async () => {
    if (!formData.title.trim()) {
      showError('Title is required');
      return;
    }
    if (!formData.description.trim()) {
      showError('Description is required');
      return;
    }
    if (!formData.link.trim()) {
      showError('Link is required');
      return;
    }
    if (!editingItem && !formData.image) {
      showError('Image is required');
      return;
    }

    const requestFormData = new FormData();
    requestFormData.append('title', formData.title);
    requestFormData.append('description', formData.description);
    requestFormData.append('link', formData.link);
    if (formData.order) {
      requestFormData.append('order', String(formData.order));
    }
    if (typeof formData.isActive === 'boolean') {
      requestFormData.append('isActive', String(formData.isActive));
    }
    if (formData.image) {
      requestFormData.append('image', formData.image);
    }

    try {
      let result;
      if (editingItem) {
        result = await updateServiceAction({
          id: editingItem._id,
          formData: requestFormData,
        });
      } else {
        result = await createServiceAction(requestFormData);
      }

      if (result.error) {
        showError(
          result.payload ||
            (editingItem
              ? 'Failed to update service'
              : 'Failed to create service'),
        );
        return;
      }

      if (result.payload) {
        success(
          editingItem
            ? 'Service updated successfully'
            : 'Service created successfully',
        );
        handleCloseModal();
      }
    } catch (err) {
      showError(
        editingItem ? 'Failed to update service' : 'Failed to create service',
      );
    }
  };

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setIsConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    try {
      const result = await deleteServiceAction(itemToDelete._id);
      if (result.error) {
        showError(result.payload || 'Failed to delete service');
      } else {
        success('Service deleted successfully');
      }
    } catch (err) {
      showError('Failed to delete service');
    } finally {
      setIsConfirmOpen(false);
      setItemToDelete(null);
    }
  };

  const toggleActive = async (item) => {
    try {
      const result = await toggleServiceStatusAction(item._id);
      if (result.error) {
        showError(result.payload || 'Failed to update status');
      } else {
        success('Service status updated');
      }
    } catch (err) {
      showError('Failed to update status');
    }
  };

  const handleReorder = async (newItems) => {
    try {
      const result = await reorderServicesAction(newItems);
      if (result.error) {
        showError(result.payload || 'Failed to reorder services');
      } else {
        success('Services reordered successfully');
      }
    } catch (err) {
      showError('Failed to reorder services');
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
      header: 'Service Image',
      accessor: 'image',
      render: (row) => (
        <img
          src={row.image}
          alt={row.title}
          className="h-10 w-16 rounded bg-gray-100 object-cover shadow-sm"
        />
      ),
    },
    {
      header: 'Service Details',
      accessor: 'title',
      render: (row) => (
        <div>
          <div className="font-medium text-gray-900">{row.title}</div>
          <div className="line-clamp-1 max-w-xs text-xs text-gray-500">
            {row.description}
          </div>
        </div>
      ),
    },
    {
      header: 'Learn More Link',
      accessor: 'link',
      render: (row) => (
        <span className="font-mono text-sm text-gray-500">{row.link}</span>
      ),
    },
    {
      header: 'Status',
      accessor: 'isActive',
      render: (row) => (
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${row.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}
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
          <Toggle
            checked={row.isActive}
            onChange={() => toggleActive(row)}
          />
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

  return (
    <div className="mx-auto max-w-6xl pb-12">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Services Manager
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Detailed services offered to be displayed across the website.
          </p>
        </div>
        <Button
          onClick={() => handleOpenModal()}
          icon={PlusIcon}
          className="px-4 py-2.5"
        >
          Add Service
        </Button>
      </div>

      <Table
        columns={columns}
        data={sortedServices}
        onReorder={handleReorder}
        rowIdKey="_id"
      />

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingItem ? 'Edit Service' : 'Add New Service'}
        footer={
          <div className="flex space-x-3">
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} loading={isLoading}>
              {editingItem ? 'Save Changes' : 'Create Service'}
            </Button>
          </div>
        }
      >
        <form className="space-y-4 pt-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Service Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Next.js Migration"
              className="block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Short Description
            </label>
            <textarea
              name="description"
              rows={2}
              value={formData.description}
              onChange={handleChange}
              placeholder="Provide a brief summary of this service."
              className="block w-full resize-none rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Service Details Link
            </label>
            <input
              type="text"
              name="link"
              value={formData.link}
              onChange={handleChange}
              placeholder="/services/next-js"
              className="block w-full rounded-md border border-gray-300 p-2 font-mono focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          <div className="pb-2 pt-2">
            <ImageUpload
              label="Service Preview Image"
              onChange={handleImageChange}
              initialPreview={
                imagePreview ||
                (editingItem && typeof editingItem.image === 'string'
                  ? editingItem.image
                  : null)
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Display Order
              </label>
              <input
                type="number"
                name="order"
                min="1"
                value={formData.order}
                onChange={handleChange}
                className="block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
            <div className="flex flex-col justify-center">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Status
              </label>
              <div className="flex items-center">
                <Toggle
                  checked={formData.isActive}
                  onChange={(val) =>
                    setFormData({ ...formData, isActive: val })
                  }
                />
                <span className="ml-3 text-sm text-gray-600">
                  {formData.isActive ? 'Active' : 'Hidden'}
                </span>
              </div>
            </div>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Service"
        message={`Are you sure you want to delete "${itemToDelete?.title}"?`}
      />
    </div>
  );
};

export default ServicesPage;
