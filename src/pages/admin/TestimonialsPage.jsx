import { useEffect, useMemo, useRef, useState } from 'react';
import Table from '../../components/common/Table';
import Modal from '../../components/common/Modal';
import Toggle from '../../components/common/Toggle';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import Button from '../../components/common/Button';
import { PlusIcon, StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { StarIcon as StarIconOutline } from '@heroicons/react/24/outline';
import { useToast } from '../../hooks/useToast';
import useTestimonials from '../../hooks/useTestimonials';

const TestimonialsPage = () => {
  const { success, error: showError } = useToast();
  const {
    data,
    isLoading,
    error: apiError,
    fetchTestimonials,
    createTestimonialAction,
    updateTestimonialAction,
    deleteTestimonialAction,
    toggleTestimonialStatusAction,
    removeError,
  } = useTestimonials();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    content: '',
    rating: 5,
    isActive: true,
  });
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;
    fetchTestimonials();
  }, [fetchTestimonials]);

  useEffect(() => {
    if (apiError) {
      showError(apiError);
      removeError();
    }
  }, [apiError, showError, removeError]);

  const sortedTestimonials = useMemo(() => {
    if (!Array.isArray(data)) return [];
    return [...data].sort((a, b) => {
      const aDate = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const bDate = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return bDate - aDate;
    });
  }, [data]);

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        name: item.name || '',
        content: item.content || '',
        rating: item.rating ?? 5,
        isActive: item.isActive ?? true,
      });
    } else {
      setEditingItem(null);
      setFormData({
        name: '',
        content: '',
        rating: 5,
        isActive: true,
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleChange = (e) => {
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      showError('Name is required');
      return;
    }
    if (!formData.content.trim()) {
      showError('Content is required');
      return;
    }
    if (!formData.rating || formData.rating < 1 || formData.rating > 5) {
      showError('Rating must be between 1 and 5');
      return;
    }

    const payload = {
      name: formData.name,
      content: formData.content,
      rating: formData.rating,
      isActive: formData.isActive,
    };

    try {
      let result;
      if (editingItem) {
        result = await updateTestimonialAction({
          id: editingItem._id,
          payload,
        });
      } else {
        result = await createTestimonialAction(payload);
      }

      if (result.error) {
        showError(
          result.payload ||
            (editingItem
              ? 'Failed to update testimonial'
              : 'Failed to create testimonial'),
        );
        return;
      }

      if (result.payload) {
        success(
          editingItem
            ? 'Testimonial updated successfully'
            : 'Testimonial created successfully',
        );
        handleCloseModal();
      }
    } catch (err) {
      showError(
        editingItem
          ? 'Failed to update testimonial'
          : 'Failed to create testimonial',
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
      const result = await deleteTestimonialAction(itemToDelete._id);
      if (result.error) {
        showError(result.payload || 'Failed to delete testimonial');
      } else {
        success('Testimonial deleted successfully');
      }
    } catch (err) {
      showError('Failed to delete testimonial');
    } finally {
      setIsConfirmOpen(false);
      setItemToDelete(null);
    }
  };

  const toggleActive = async (item) => {
    try {
      const result = await toggleTestimonialStatusAction(item._id);
      if (result.error) {
        showError(result.payload || 'Failed to update status');
      } else {
        success('Testimonial status updated');
      }
    } catch (err) {
      showError('Failed to update status');
    }
  };

  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) =>
          star <= rating ? (
            <StarIconSolid key={star} className="h-4 w-4 text-yellow-400" />
          ) : (
            <StarIconOutline key={star} className="h-4 w-4 text-gray-300" />
          ),
        )}
      </div>
    );
  };

  const columns = [
    {
      header: 'Customer',
      accessor: 'name',
      render: (row) => (
        <div>
          <div className="font-medium text-gray-900">{row.name}</div>
        </div>
      ),
    },
    {
      header: 'Rating',
      accessor: 'rating',
      render: (row) => renderStars(row.rating),
    },
    {
      header: 'Review Content',
      accessor: 'content',
      render: (row) => (
        <div className="line-clamp-2 max-w-md text-sm italic text-gray-600">
          {row.content}
        </div>
      ),
    },
    {
      header: 'Status',
      accessor: 'isActive',
      render: (row) => (
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${row.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}
        >
          {row.isActive ? 'Displayed' : 'Hidden'}
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
            Testimonials Manager
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Showcase positive feedback from your clients and customers.
          </p>
        </div>
        <Button
          onClick={() => handleOpenModal()}
          icon={PlusIcon}
          className="px-4 py-2.5"
        >
          Add Testimonial
        </Button>
      </div>

      <Table
        columns={columns}
        data={sortedTestimonials}
        rowIdKey="_id"
      />

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingItem ? 'Edit Testimonial' : 'Add New Testimonial'}
        footer={
          <div className="flex space-x-3">
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} loading={isLoading}>
              {editingItem ? 'Save Changes' : 'Create Testimonial'}
            </Button>
          </div>
        }
      >
        <form className="space-y-4 pt-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Customer Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Jane Doe"
              className="block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Rating
            </label>
            <div className="flex max-w-min space-x-2 rounded-md border border-gray-300 bg-gray-50 p-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFormData({ ...formData, rating: star })}
                  className="focus:outline-none"
                >
                  {star <= formData.rating ? (
                    <StarIconSolid className="h-6 w-6 text-yellow-400 transition-transform hover:scale-110" />
                  ) : (
                    <StarIconOutline className="h-6 w-6 text-gray-300 transition-transform hover:scale-110 hover:text-yellow-400" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Feedback
            </label>
            <textarea
              name="content"
              rows={4}
              value={formData.content}
              onChange={handleChange}
              placeholder="What did they say about your services?"
              className="block w-full resize-none rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          <div className="flex flex-col justify-center pt-2">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Display Status
            </label>
            <div className="flex items-center">
              <Toggle
                checked={formData.isActive}
                onChange={(val) => setFormData({ ...formData, isActive: val })}
              />
              <span className="ml-3 text-sm text-gray-600">
                {formData.isActive
                  ? 'Active and Displayed'
                  : 'Hidden from site'}
              </span>
            </div>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Testimonial"
        message={`Are you sure you want to delete the testimonial from "${itemToDelete?.name}"?`}
      />
    </div>
  );
};

export default TestimonialsPage;
