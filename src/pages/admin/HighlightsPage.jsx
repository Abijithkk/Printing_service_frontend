import { useEffect, useMemo, useRef, useState } from 'react';
import Table from '../../components/common/Table';
import Modal from '../../components/common/Modal';
import Toggle from '../../components/common/Toggle';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import Button from '../../components/common/Button';
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import ImageUpload from '../../components/common/ImageUpload';
import { useToast } from '../../hooks/useToast';
import useHighlights from '../../hooks/useHighlights';

const HighlightsPage = () => {
  const { success, error: showError } = useToast();
  const {
    data,
    isLoading,
    error: apiError,
    fetchHighlights,
    createHighlightAction,
    updateHighlightAction,
    deleteHighlightAction,
    reorderHighlightsAction,
    toggleHighlightStatusAction,
    removeError,
  } = useHighlights();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    icon: null,
  });
  const [iconPreview, setIconPreview] = useState(null);
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;
    fetchHighlights();
  }, [fetchHighlights]);

  useEffect(() => {
    if (apiError) {
      showError(apiError);
      removeError();
    }
  }, [apiError, showError, removeError]);

  const sortedHighlights = useMemo(() => {
    if (!Array.isArray(data)) return [];
    return [...data].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }, [data]);

  const resetForm = () => {
    setFormData({
      title: '',
      icon: null,
    });
    setEditingItem(null);
    setIconPreview(null);
  };

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        title: item.title || '',
        icon: null,
      });
      setIconPreview(item.icon || null);
    } else {
      resetForm();
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleIconChange = (file) => {
    setFormData((prev) => ({ ...prev, icon: file }));
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setIconPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setIconPreview(null);
    }
  };

  const handleSave = async () => {
    if (!formData.title.trim()) {
      showError('Title is required');
      return;
    }

    if (!editingItem && !formData.icon) {
      showError('Icon is required');
      return;
    }

    const requestFormData = new FormData();
    requestFormData.append('title', formData.title);
    if (formData.icon) {
      requestFormData.append('icon', formData.icon);
    }

    try {
      let result;
      if (editingItem) {
        result = await updateHighlightAction({
          id: editingItem._id,
          formData: requestFormData,
        });
      } else {
        result = await createHighlightAction(requestFormData);
      }

      if (result.error) {
        showError(
          result.payload ||
            (editingItem
              ? 'Failed to update highlight'
              : 'Failed to create highlight'),
        );
        return;
      }

      if (result.payload) {
        success(
          editingItem
            ? 'Highlight updated successfully'
            : 'Highlight created successfully',
        );
        handleCloseModal();
      }
    } catch (err) {
      showError(
        editingItem
          ? 'Failed to update highlight'
          : 'Failed to create highlight',
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
      const result = await deleteHighlightAction(itemToDelete._id);
      if (result.error) {
        showError(result.payload || 'Failed to delete highlight');
      } else {
        success('Highlight deleted successfully');
      }
    } catch (err) {
      showError('Failed to delete highlight');
    } finally {
      setIsConfirmOpen(false);
      setItemToDelete(null);
    }
  };

  const handleToggleActive = async (item) => {
    try {
      const result = await toggleHighlightStatusAction(item._id);
      if (result.error) {
        showError(result.payload || 'Failed to update status');
      } else {
        success('Highlight status updated');
      }
    } catch (err) {
      showError('Failed to update status');
    }
  };

  const handleReorder = async (newItems) => {
    try {
      const result = await reorderHighlightsAction(newItems);
      if (result.error) {
        showError(result.payload || 'Failed to reorder highlights');
      } else {
        success('Highlights reordered successfully');
      }
    } catch (err) {
      showError('Failed to reorder highlights');
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
        <div className="flex items-center text-gray-500">
          {typeof row.order === 'number' ? row.order : '-'}
        </div>
      ),
    },
    {
      header: 'Icon',
      accessor: 'icon',
      render: (row) => {
        if (!row.icon) {
          return (
            <span className="text-xs text-gray-400">
              No icon
            </span>
          );
        }
        return (
          <img
            src={row.icon}
            alt={row.title}
            className="h-10 w-10 rounded-md object-cover"
          />
        );
      },
    },
    {
      header: 'Title',
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
            onChange={() => handleToggleActive(row)}
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
            Highlights Manager
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage the key value proposition highlights (usually shown below
            hero area).
          </p>
        </div>
        <Button
          onClick={() => handleOpenModal()}
          icon={ArrowUpTrayIcon}
          className="px-4 py-2.5"
        >
          Add Highlight
        </Button>
      </div>

      {isLoading && sortedHighlights.length === 0 ? (
        <div className="rounded-lg border border-gray-200 bg-white p-12 text-center">
          <p className="text-gray-500">Loading highlights...</p>
        </div>
      ) : sortedHighlights.length === 0 ? (
        <div className="rounded-lg border border-gray-200 bg-white p-12 text-center">
          <p className="mb-4 text-gray-600">No highlights yet</p>
          <Button onClick={() => handleOpenModal()}>Create First Highlight</Button>
        </div>
      ) : (
        <Table
          columns={columns}
          data={sortedHighlights}
          onReorder={handleReorder}
          rowIdKey="_id"
        />
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingItem ? 'Edit Highlight' : 'Add New Highlight'}
        footer={
          <div className="flex space-x-3">
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button onClick={handleSave} loading={isLoading}>
              {editingItem ? 'Save Changes' : 'Create Highlight'}
            </Button>
          </div>
        }
      >
        <div className="space-y-4 pt-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Highlight Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Fast Delivery"
              className="block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
         
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Icon
            </label>
            <ImageUpload
              label={editingItem ? 'Change icon (optional)' : 'Upload icon'}
              onChange={handleIconChange}
              initialPreview={iconPreview}
              className="mt-1"
            />
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => {
          setIsConfirmOpen(false);
          setItemToDelete(null);
        }}
        onConfirm={confirmDelete}
        title="Delete Highlight"
        message={`Are you sure you want to delete "${itemToDelete?.title}"? This will permanently remove it.`}
      />
    </div>
  );
};

export default HighlightsPage;