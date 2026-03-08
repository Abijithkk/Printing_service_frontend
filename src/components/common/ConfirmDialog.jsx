import Modal from './Modal';
import Button from './Button';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm action',
  message = 'Are you sure you want to proceed? This action cannot be undone.',
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center text-red-600">
          <ExclamationTriangleIcon
            className="mr-2 h-6 w-6"
            aria-hidden="true"
          />
          {title}
        </div>
      }
      footer={
        <div className="flex space-x-3">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            Confirm
          </Button>
        </div>
      }
    >
      <div className="mt-2 text-sm text-gray-500">
        <p>{message}</p>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;
