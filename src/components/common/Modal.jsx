import PropTypes from 'prop-types';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Button from './Button';

const Modal = ({ isOpen, onClose, title, children, footer }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm transition-opacity"
          aria-hidden="true"
          onClick={onClose}
        ></div>

        <span
          className="hidden sm:inline-block sm:h-screen sm:align-middle"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="relative inline-block w-full transform overflow-hidden rounded-xl bg-white text-left align-bottom shadow-2xl transition-all sm:my-8 sm:max-w-lg sm:align-middle">
          <div className="flex items-center justify-between border-b border-gray-100 bg-white px-6 py-4">
            <h3
              className="text-xl font-semibold leading-6 text-gray-900"
              id="modal-title"
            >
              {title}
            </h3>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-gray-500"
              onClick={onClose}
              title="Close"
            >
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </Button>
          </div>

          <div className="bg-white px-6 py-5">{children}</div>

          {footer && (
            <div className="flex justify-end space-x-3 rounded-b-xl border-t border-gray-100 bg-gray-50 px-6 py-4">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.node,
  children: PropTypes.node.isRequired,
  footer: PropTypes.node,
};

export default Modal;
