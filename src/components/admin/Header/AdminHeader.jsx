import { useNavigate } from 'react-router-dom';
import {
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';
import Button from '../../common/Button';
import useAuth from '../../../hooks/useAuth';

const AdminHeader = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-8">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold tracking-tight text-gray-800">
          System Administration
        </h1>
      </div>

      <div className="flex items-center space-x-6">
        

        <div className="flex items-center space-x-3 border-l border-gray-200 pl-6">
          <div className="flex flex-col items-end">
            <span className="text-sm font-medium text-gray-900">
              {user?.email || 'Admin User'}
            </span>
            <span className="text-xs capitalize text-gray-500">
              {user?.role || 'Super Admin'}
            </span>
          </div>
          <UserCircleIcon className="h-10 w-10 text-gray-400" />

          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="ml-2 text-red-500 hover:bg-red-50 hover:text-red-700"
            title="Logout"
          >
            <ArrowRightOnRectangleIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
