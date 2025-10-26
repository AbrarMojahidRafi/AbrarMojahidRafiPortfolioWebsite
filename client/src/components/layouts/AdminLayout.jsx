import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

const AdminLayout = () => {
  const [activeItem, setActiveItem] = useState('/admin/users');
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: 'users', label: 'Users', icon: '👥', path: '/admin/users' },
    { id: 'contacts', label: 'Contacts', icon: '📞', path: '/admin/contacts' },
    { id: 'services', label: 'Services', icon: '🛠️', path: '/admin/services' },
    { id: 'abouts', label: 'About Me', icon: '🤹‍♀️', path: '/admin/abouts' },
  ];

  const handleNavClick = (path) => {
    setActiveItem(path);
    navigate(path);
  };

  // Get current page title
  const currentPageTitle = navItems.find(item => item.path === location.pathname)?.label || 'User';

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar/Navbar */}
      <div className="w-64 bg-gray-800 text-white flex flex-col">
        {/* Sidebar Header */}
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">Admin Panel</h2>
        </div>
        
        {/* Navigation Items */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                activeItem === item.path 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center gap-3 px-4 py-2 text-gray-300">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">A</span>
            </div>
            <div>
              <p className="text-sm font-medium">Admin</p>
              <p className="text-xs text-gray-400">Administrator</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-800">{currentPageTitle}</h1>
            <p className="text-gray-600 mt-1">Admin Panel - {currentPageTitle} Management</p>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;