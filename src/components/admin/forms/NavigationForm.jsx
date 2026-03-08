import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Toggle from '../../common/Toggle';
import Button from '../../common/Button';

const NavigationForm = ({ initialData, onSubmit, onCancel, isLoading }) => {
  const [formData, setFormData] = useState({
    title: '',
    isActive: true,
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleToggle = (checked) => {
    setFormData((prev) => ({
      ...prev,
      isActive: checked,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      return;
    }
    onSubmit(formData);
  };

  return (
    <form className="space-y-4 pt-2" onSubmit={handleSubmit}>
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Menu Title
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="e.g. About Us"
          className="block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          required
        />
      </div>

      <div className="flex flex-col justify-center">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Status
        </label>
        <div className="flex items-center">
          <Toggle checked={formData.isActive} onChange={handleToggle} />
          <span className="ml-3 text-sm text-gray-600">
            {formData.isActive ? 'Active' : 'Hidden'}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 pt-4">
        <Button type="button" variant="secondary" onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading || !formData.title.trim()}>
          {isLoading ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </form>
  );
};

NavigationForm.propTypes = {
  initialData: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    isActive: PropTypes.bool,
  }),
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

NavigationForm.defaultProps = {
  initialData: null,
  isLoading: false,
};

export default NavigationForm;