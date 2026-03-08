import React from 'react';
import { Link } from 'react-router-dom';

const SidebarItem = ({ item, isActive }) => {
  return (
    <Link
      to={item.href}
      className={`group mx-2 flex items-center rounded-lg px-6 py-3 transition-colors ${
        isActive
          ? 'bg-blue-600/20 text-blue-400'
          : 'text-gray-400 hover:bg-gray-800 hover:text-white'
      }`}
    >
      <item.icon
        className={`mr-3 h-6 w-6 ${isActive ? 'text-blue-400' : 'text-gray-400 group-hover:text-white'} transition-colors`}
      />
      <span className="font-medium">{item.name}</span>
    </Link>
  );
};

export default SidebarItem;
