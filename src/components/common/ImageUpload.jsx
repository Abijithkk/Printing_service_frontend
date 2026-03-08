import { useState } from 'react';
import { PhotoIcon } from '@heroicons/react/24/outline';

const ImageUpload = ({
  label = 'Upload Image',
  onChange,
  initialPreview = null,
  className = '',
}) => {
  const [preview, setPreview] = useState(initialPreview);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onChange(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={`col-span-full ${className}`}>
      <label className="block text-sm font-medium leading-6 text-gray-900">
        {label}
      </label>
      <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 transition-colors focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 hover:border-blue-400">
        <div className="text-center">
          {preview ? (
            <div className="flex flex-col items-center">
              <img
                src={preview}
                alt="Preview"
                className="mb-4 h-32 w-auto rounded-md object-cover shadow-sm"
              />
              <div className="flex text-sm leading-6 text-gray-600">
                <label className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500">
                  <span>Change file</span>
                  <input
                    type="file"
                    className="sr-only"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            </div>
          ) : (
            <>
              <PhotoIcon
                className="mx-auto h-12 w-12 text-gray-300"
                aria-hidden="true"
              />
              <div className="mt-4 flex text-sm leading-6 text-gray-600">
                <label className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500">
                  <span>Upload a file</span>
                  <input
                    type="file"
                    className="sr-only"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs leading-5 text-gray-600">
                PNG, JPG, GIF up to 5MB
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
