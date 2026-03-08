import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Button from '../../components/common/Button';
import {
  DevicePhoneMobileIcon,
  EnvelopeIcon,
  MapPinIcon,
  PlusIcon,
  TrashIcon,
  GlobeAltIcon,
  DocumentArrowUpIcon,
} from '@heroicons/react/24/outline';
import useSettings from '../../hooks/useSettings';

const SiteSettingsPage = () => {
  const {
    data,
    isLoading,
    error,
    fetchSettings,
    updateLogoAction,
    updateContactAction,
    updateFooterAction,
    addSocialMediaAction,
    updateSocialMediaAction,
    deleteSocialMediaAction,
  } = useSettings();

  const [formData, setFormData] = useState({
    contactEmail: '',
    phoneNumber: '',
    officeAddress: '',
    footerText: '',
  });

  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState('');
  const [socialLinks, setSocialLinks] = useState([]);
  const [newSocialMedia, setNewSocialMedia] = useState({
    link: '',
    icon: null,
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  useEffect(() => {
    if (data) {
      setFormData({
        contactEmail: data.contactEmail || '',
        phoneNumber: data.phoneNumber || '',
        officeAddress: data.officeAddress || '',
        footerText: data.footerText || '',
      });
      setSocialLinks(data.socialMedia || []);
      if (data.logo) {
        setLogoPreview(data.logo);
      }
    }
  }, [data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogo(file);
      const preview = URL.createObjectURL(file);
      setLogoPreview(preview);
    }
  };

  const handleSocialMediaFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewSocialMedia((prev) => ({ ...prev, icon: file }));
    }
  };

  const handleUpdateLogo = async () => {
    if (!logo) {
      toast.error('Please select a logo file');
      return;
    }

    const formDataObj = new FormData();
    formDataObj.append('logo', logo);

    const result = await updateLogoAction(formDataObj);
    if (result.type === 'settings/updateLogo/fulfilled') {
      toast.success('Logo updated successfully');
      setLogo(null);
    } else if (result.type === 'settings/updateLogo/rejected') {
      toast.error(result.payload || 'Failed to update logo');
    }
  };

  const handleUpdateContact = async () => {
    if (
      !formData.contactEmail ||
      !formData.phoneNumber ||
      !formData.officeAddress
    ) {
      toast.error('Please fill in all contact fields');
      return;
    }

    const result = await updateContactAction({
      contactEmail: formData.contactEmail,
      phoneNumber: formData.phoneNumber,
      officeAddress: formData.officeAddress,
    });

    if (result.type === 'settings/updateContact/fulfilled') {
      toast.success('Contact details updated successfully');
    } else if (result.type === 'settings/updateContact/rejected') {
      toast.error(result.payload || 'Failed to update contact');
    }
  };

  const handleUpdateFooter = async () => {
    if (!formData.footerText) {
      toast.error('Please enter footer text');
      return;
    }

    const result = await updateFooterAction({
      footerText: formData.footerText,
    });

    if (result.type === 'settings/updateFooter/fulfilled') {
      toast.success('Footer updated successfully');
    } else if (result.type === 'settings/updateFooter/rejected') {
      toast.error(result.payload || 'Failed to update footer');
    }
  };

  const handleAddSocialMedia = async () => {
    if (!newSocialMedia.link || !newSocialMedia.icon) {
      toast.error('Please provide both link and icon');
      return;
    }

    const formDataObj = new FormData();
    formDataObj.append('link', newSocialMedia.link);
    formDataObj.append('icon', newSocialMedia.icon);

    const result = await addSocialMediaAction(formDataObj);

    if (result.type === 'settings/addSocialMedia/fulfilled') {
      toast.success('Social media link added successfully');
      setNewSocialMedia({ link: '', icon: null });
    } else if (result.type === 'settings/addSocialMedia/rejected') {
      toast.error(result.payload || 'Failed to add social media link');
    }
  };

  const handleDeleteSocialMedia = async (id) => {
    const result = await deleteSocialMediaAction(id);

    if (result.type === 'settings/deleteSocialMedia/fulfilled') {
      toast.success('Social media link deleted successfully');
    } else if (result.type === 'settings/deleteSocialMedia/rejected') {
      toast.error(result.payload || 'Failed to delete social media link');
    }
  };

  if (isLoading && !data) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-gray-500">Loading settings...</div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-10 border-b border-gray-200 pb-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
          Site Settings
        </h1>
        <p className="mt-1 text-gray-500">
          Manage your organization&apos;s brand, contact info, and social
          presence.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-100 bg-gray-50/50 px-6 py-4">
              <h2 className="font-bold text-gray-800">Brand Identity</h2>
            </div>
            <div className="space-y-6 p-8">
              {logoPreview && (
                <div className="flex justify-center">
                  <img
                    src={logoPreview}
                    alt="Logo preview"
                    className="max-h-32 max-w-xs object-contain"
                  />
                </div>
              )}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Upload Logo
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-md file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
              <Button
                onClick={handleUpdateLogo}
                disabled={!logo || isLoading}
                className="w-full"
              >
                {isLoading ? 'Updating...' : 'Update Logo'}
              </Button>
            </div>
          </section>

          <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-100 bg-gray-50/50 px-6 py-4">
              <h2 className="font-bold text-gray-800">Contact Details</h2>
            </div>
            <div className="grid grid-cols-1 gap-6 p-8 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Email
                </label>
                <div className="group relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleInputChange}
                    className="block w-full rounded-xl border border-gray-300 py-3 pl-10 text-gray-900 transition-all focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Phone
                </label>
                <div className="group relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <DevicePhoneMobileIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="block w-full rounded-xl border border-gray-300 py-3 pl-10 text-gray-900 transition-all focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Address
                </label>
                <div className="group relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <MapPinIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="officeAddress"
                    value={formData.officeAddress}
                    onChange={handleInputChange}
                    className="block w-full rounded-xl border border-gray-300 py-3 pl-10 text-gray-900 transition-all focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <Button
                onClick={handleUpdateContact}
                disabled={isLoading}
                className="w-full md:col-span-2"
              >
                {isLoading ? 'Updating...' : 'Update Contact'}
              </Button>
            </div>
          </section>

          <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-100 bg-gray-50/50 px-6 py-4">
              <h2 className="font-bold text-gray-800">Footer Text</h2>
            </div>
            <div className="space-y-6 p-8">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Description
                </label>
                <textarea
                  name="footerText"
                  rows={4}
                  value={formData.footerText}
                  onChange={handleInputChange}
                  className="block w-full rounded-xl border border-gray-200 p-4 text-gray-900 transition-all focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
              <Button
                onClick={handleUpdateFooter}
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? 'Updating...' : 'Update Footer'}
              </Button>
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <section className="h-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/50 px-6 py-4">
              <h2 className="flex items-center gap-2 font-bold text-gray-800">
                <GlobeAltIcon className="h-5 w-5 text-blue-500" />
                Social Media
              </h2>
            </div>
            <div className="space-y-6 p-6">
              <div className="space-y-4 rounded-xl border border-gray-200 bg-gray-50/30 p-4">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Link
                  </label>
                  <input
                    type="url"
                    placeholder="https://example.com"
                    value={newSocialMedia.link}
                    onChange={(e) =>
                      setNewSocialMedia((prev) => ({
                        ...prev,
                        link: e.target.value,
                      }))
                    }
                    className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Icon
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleSocialMediaFileChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:rounded file:border-0 file:bg-blue-50 file:px-3 file:py-1 file:text-xs file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>

                <Button
                  onClick={handleAddSocialMedia}
                  disabled={isLoading}
                  className="w-full"
                  size="sm"
                >
                  <PlusIcon className="mr-1 h-4 w-4" />
                  Add Link
                </Button>
              </div>

              <div className="space-y-3">
                {socialLinks.length === 0 ? (
                  <div className="py-6 text-center text-sm text-gray-400">
                    No social links yet
                  </div>
                ) : (
                  socialLinks.map((link) => (
                    <div
                      key={link._id}
                      className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-3"
                    >
                      <div className="flex min-w-0 flex-1 items-center gap-3">
                        {link.icon && (
                          <img
                            src={link.icon}
                            alt="icon"
                            className="h-8 w-8 flex-shrink-0 rounded object-contain"
                          />
                        )}
                        <a
                          href={link.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="truncate text-sm text-blue-600 hover:underline"
                        >
                          {link.link}
                        </a>
                      </div>
                      <button
                        onClick={() => handleDeleteSocialMedia(link._id)}
                        disabled={isLoading}
                        className="ml-2 rounded p-1 text-red-500 transition-colors hover:bg-red-50"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SiteSettingsPage;
