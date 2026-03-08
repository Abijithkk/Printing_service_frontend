import React from 'react';

const Toggle = ({ checked, onChange, disabled = false }) => {
  return (
    <button
      type="button"
      className={`${checked ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent shadow-inner transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
      role="switch"
      aria-checked={checked}
      onClick={() => !disabled && onChange(!checked)}
      disabled={disabled}
    >
      <span className="sr-only">Use setting</span>
      <span
        aria-hidden="true"
        className={`${checked ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
      />
    </button>
  );
};

export default Toggle;
