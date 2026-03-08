import { useEffect, useMemo, useRef, useState } from 'react';
import Table from '../../components/common/Table';
import Modal from '../../components/common/Modal';
import Toggle from '../../components/common/Toggle';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import Button from '../../components/common/Button';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useToast } from '../../hooks/useToast';
import useCta from '../../hooks/useCta';

const CTAButtonsPage = () => {
  const { success, error: showError } = useToast();
  const {
    data,
    isLoading,
    error,
    fetchCtas,
    createCtaAction,
    updateCtaAction,
    deleteCtaAction,
    toggleCtaStatusAction,
    removeError,
  } = useCta();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);

  const [formData, setFormData] = useState({
    text: '',
    link: '',
    isActive: true,
  });
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;
    fetchCtas();
  }, [fetchCtas]);

  useEffect(() => {
    if (error) {
      showError(error);
      removeError();
    }
  }, [error, showError, removeError]);

  const sortedCtas = useMemo(() => {
    if (!Array.isArray(data)) return [];
    return [...data];
  }, [data]);

  const resetForm = () => {
    setFormData({
      text: '',
      link: '',
      isActive: true,
    });
    setEditingItem(null);
  };

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        text: item.text || '',
        link: item.link || '',
        isActive: item.isActive ?? true,
      });
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
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async () => {
    if (!formData.text.trim()) {
      showError('Button text is required');
      return;
    }
    if (!formData.link.trim()) {
      showError('Link is required');
      return;
    }

    const payload = {
      text: formData.text,
      link: formData.link,
      isActive: formData.isActive,
    };

    try {
      let result;
      if (editingItem) {
        result = await updateCtaAction({
          id: editingItem._id,
          payload,
        });
      } else {
        result = await createCtaAction(payload);
      }

      if (result.error) {
        showError(
          result.payload ||
            (editingItem
              ? 'Failed to update CTA button'
              : 'Failed to create CTA button'),
        );
        return;
      }

      if (result.payload) {
        success(
          editingItem
            ? 'CTA button updated successfully'
            : 'CTA button created successfully',
        );
        handleCloseModal();
      }
    } catch (err) {
      showError(
        editingItem
          ? 'Failed to update CTA button'
          : 'Failed to create CTA button',
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
      const result = await deleteCtaAction(itemToDelete._id);
      if (result.error) {
        showError(result.payload || 'Failed to delete CTA button');
      } else {
        success('CTA button removed');
      }
    } catch (err) {
      showError('Failed to delete CTA button');
    } finally {
      setIsConfirmOpen(false);
      setItemToDelete(null);
    }
  };

  const handleToggleActive = async (item) => {
    try {
      const result = await toggleCtaStatusAction(item._id);
      if (result.error) {
        showError(result.payload || 'Failed to update status');
      } else {
        success('CTA button status updated');
      }
    } catch (err) {
      showError('Failed to update status');
    }
  };

  const columns = [
    {
      header: 'Text',
      accessor: 'text',
      render: (row) => (
        <span className="font-medium text-gray-900">{row.text}</span>
      ),
    },
    {
      header: 'Link',
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
          {row.isActive ? 'Active' : 'Hidden'}
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
            CTA Buttons Manager
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage header call-to-action buttons.
          </p>
        </div>
        <Button
          onClick={() => handleOpenModal()}
          icon={PlusIcon}
          className="px-4 py-2.5"
        >
          Add CTA Button
        </Button>
      </div>

      <Table columns={columns} data={sortedCtas} rowIdKey="_id" />

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingItem ? 'Edit CTA Button' : 'Add New CTA Button'}
        footer={
          <div className="flex space-x-3">
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} loading={isLoading}>
              {editingItem ? 'Save Changes' : 'Create Button'}
            </Button>
          </div>
        }
      >
        <form className="space-y-4 pt-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Button Text
            </label>
            <input
              type="text"
              name="text"
              value={formData.text}
              onChange={handleChange}
              placeholder="e.g. Request a Quote"
              className="block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Target Link URL or Path
            </label>
            <input
              type="text"
              name="link"
              value={formData.link}
              onChange={handleChange}
              placeholder="/quote or https://..."
              className="block w-full rounded-md border border-gray-300 p-2 font-mono focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div className="flex flex-col justify-center pt-2">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Display Status
            </label>
            <div className="flex items-center">
              <Toggle
                checked={formData.isActive}
                onChange={(val) =>
                  setFormData({ ...formData, isActive: val })
                }
              />
              <span className="ml-3 text-sm text-gray-600">
                {formData.isActive
                  ? 'Active and displayed'
                  : 'Hidden from header'}
              </span>
            </div>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmDelete}
        title="Delete CTA Button"
        message={`Are you sure you want to delete the "${itemToDelete?.text}" button?`}
      />
    </div>
  );
};

export default CTAButtonsPage;
