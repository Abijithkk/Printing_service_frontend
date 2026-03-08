import { useState, useEffect, useRef } from 'react';
import ImageUpload from '../../components/common/ImageUpload';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Table from '../../components/common/Table';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import { useToast } from '../../hooks/useToast';
import useHero from '../../hooks/useHero';

const HeroPage = () => {
  const { success, error: showError } = useToast();
  const {
    isLoading,
    error: apiError,
    fetchHero,
    createHeroAction,
    updateHeroAction,
    deleteHeroAction,
    removeError,
  } = useHero();

  const [sections, setSections] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [sectionToDelete, setSectionToDelete] = useState(null);
  const [formData, setFormData] = useState({
    headline: '',
    subtext: '',
    ctaText: '',
    ctaLink: '',
    backgroundImage: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    const loadHeroData = async () => {
      const result = await fetchHero();
      if (result.payload?.sections) {
        setSections(result.payload.sections);
      }
    };
    loadHeroData();
  }, [fetchHero]);

  useEffect(() => {
    if (apiError) {
      showError(apiError);
      removeError();
    }
  }, [apiError, showError, removeError]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (file) => {
    setFormData({ ...formData, backgroundImage: file });
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setFormData({
      headline: '',
      subtext: '',
      ctaText: '',
      ctaLink: '',
      backgroundImage: null,
    });
    setImagePreview(null);
    setEditingId(null);
  };

  const handleOpenModal = (section = null) => {
    if (section) {
      setEditingId(section._id);
      setFormData({
        headline: section.headline,
        subtext: section.subtext,
        ctaText: section.ctaText,
        ctaLink: section.ctaLink,
        backgroundImage: null,
      });
      setImagePreview(section.backgroundImage);
    } else {
      resetForm();
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    resetForm();
  };

  const handleDeleteClick = (section) => {
    setSectionToDelete(section);
    setIsConfirmOpen(true);
  };

  const handleSave = async () => {
    try {
      const requestFormData = new FormData();
      requestFormData.append('headline', formData.headline);
      requestFormData.append('subtext', formData.subtext);
      requestFormData.append('ctaText', formData.ctaText);
      requestFormData.append('ctaLink', formData.ctaLink);

      if (formData.backgroundImage) {
        requestFormData.append('backgroundImage', formData.backgroundImage);
      }

      let result;
      if (editingId) {
        result = await updateHeroAction({
          id: editingId,
          formData: requestFormData,
        });
      } else {
        result = await createHeroAction(requestFormData);
      }

      if (result.payload?.sections) {
        setSections(result.payload.sections);
        success(
          editingId
            ? 'Hero section updated successfully'
            : 'Hero section created successfully',
        );
        handleCloseModal();
      }
    } catch (err) {
      showError(
        editingId
          ? 'Failed to update hero section'
          : 'Failed to create hero section',
      );
    }
  };

  const confirmDelete = async () => {
    if (!sectionToDelete) return;
    try {
      const result = await deleteHeroAction(sectionToDelete._id);

      if (result.payload?.sections) {
        setSections(result.payload.sections);
        success('Hero section deleted successfully');
      }
    } catch (err) {
      showError('Failed to delete hero section');
    } finally {
      setIsConfirmOpen(false);
      setSectionToDelete(null);
    }
  };

  const tableColumns = [
    {
      key: 'backgroundImage',
      label: 'Image',
      render: (row) =>
        row.backgroundImage ? (
          <img
            src={row.backgroundImage}
            alt={row.headline}
            className="h-12 w-12 rounded-md object-cover"
          />
        ) : (
          <span className="text-xs text-gray-400">No image</span>
        ),
    },
    {
      key: 'headline',
      label: 'Headline',
      render: (row) => <span className="font-medium">{row.headline}</span>,
    },
    {
      key: 'subtext',
      label: 'Description',
      render: (row) => (
        <span className="max-w-xs truncate text-sm text-gray-600">
          {row.subtext}
        </span>
      ),
    },
    {
      key: 'ctaText',
      label: 'CTA Text',
      render: (row) => <span className="text-sm">{row.ctaText}</span>,
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (row) => (
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
      ),
    },
  ];

  return (
    <div className="mx-auto max-w-6xl pb-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Hero Section Manager
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage multiple hero sections for your website.
          </p>
        </div>
        <Button onClick={() => handleOpenModal()} className="px-6 py-2.5">
          Add New Section
        </Button>
      </div>

      {isLoading && sections.length === 0 ? (
        <div className="rounded-lg border border-gray-200 bg-white p-12 text-center">
          <p className="text-gray-500">Loading hero sections...</p>
        </div>
      ) : sections.length === 0 ? (
        <div className="rounded-lg border border-gray-200 bg-white p-12 text-center">
          <p className="mb-4 text-gray-600">No hero sections yet</p>
          <Button onClick={() => handleOpenModal()}>
            Create First Section
          </Button>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <Table columns={tableColumns} data={sections} />
        </div>
      )}

      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={editingId ? 'Edit Hero Section' : 'Create Hero Section'}
        size="lg"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Headline
              </label>
              <input
                type="text"
                name="headline"
                value={formData.headline}
                onChange={handleChange}
                placeholder="Enter headline"
                className="block w-full rounded-md border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                CTA Button Text
              </label>
              <input
                type="text"
                name="ctaText"
                value={formData.ctaText}
                onChange={handleChange}
                placeholder="e.g. Get Started"
                className="block w-full rounded-md border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="subtext"
              rows={3}
              value={formData.subtext}
              onChange={handleChange}
              placeholder="Enter supporting text"
              className="block w-full resize-none rounded-md border border-gray-300 p-3 text-gray-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              CTA Link
            </label>
            <input
              type="text"
              name="ctaLink"
              value={formData.ctaLink}
              onChange={handleChange}
              placeholder="/contact or https://..."
              className="block w-full rounded-md border border-gray-300 px-4 py-2.5 font-mono text-sm text-blue-600 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <h3 className="mb-3 text-sm font-medium text-gray-700">
              Background Image
            </h3>
            <ImageUpload
              label="Upload Image"
              onChange={handleImageChange}
              initialPreview={imagePreview}
              className="mt-0"
            />
          </div>

          <div className="flex justify-end gap-3 border-t border-gray-100 pt-6">
            <Button
              variant="outline"
              onClick={handleCloseModal}
              className="px-6 py-2.5"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              loading={isLoading}
              loadingText="Saving..."
              className="px-6 py-2.5"
            >
              {editingId ? 'Update' : 'Create'}
            </Button>
          </div>
        </div>
      </Modal>
      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => {
          setIsConfirmOpen(false);
          setSectionToDelete(null);
        }}
        onConfirm={confirmDelete}
        title="Delete Hero Section"
        message={`Are you sure you want to delete "${sectionToDelete?.headline}"? This action cannot be undone.`}
      />
    </div>
  );
};

export default HeroPage;
