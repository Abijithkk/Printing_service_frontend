import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/admin/Sidebar/Sidebar';
import AdminHeader from '../components/admin/Header/AdminHeader';

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-900">
      <Sidebar />
      <div className="ml-64 flex flex-1 flex-col transition-all duration-300">
        <AdminHeader />
        <main className="flex-1 overflow-y-auto bg-gray-50 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
