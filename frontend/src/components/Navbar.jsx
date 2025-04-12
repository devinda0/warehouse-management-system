import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { Home, Package, Users, BarChart2, FileText, User, Menu, X } from 'lucide-react';

function Navbar() {
  //const { role } = useAuth();
  const role = 'manager'; // Hardcoded for demonstration purposes
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Define navigation items based on user role
  const getNavItems = () => {
    switch (role) {
      case 'manager':
        return [
          { name: 'Home', path: '/home', icon: <Home size={20} /> },
          { name: 'Inventory', path: '/inventory', icon: <Package size={20} /> },
          { name: 'Employers', path: '/employers', icon: <Users size={20} /> },
          { name: 'Analytics', path: '/analytics', icon: <BarChart2 size={20} /> },
          { name: 'Requests', path: '/requests', icon: <FileText size={20} /> },
          { name: 'Profile', path: '/profile', icon: <User size={20} /> }
        ];
      case 'worker':
        return [
          { name: 'Home', path: '/home', icon: <Home size={20} /> },
          { name: 'Inventory', path: '/inventory', icon: <Package size={20} /> },
          { name: 'Profile', path: '/profile', icon: <User size={20} /> }
        ];
      case 'supplier':
        return [
          { name: 'Home', path: '/home', icon: <Home size={20} /> },
          { name: 'Requests', path: '/requests', icon: <FileText size={20} /> },
          { name: 'Profile', path: '/profile', icon: <User size={20} /> }
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden md:flex bg-gradient-to-r from-[#1e0e4b] to-[#7747ff] text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Package size={28} className="text-white" />
            <span className="text-xl font-bold">InventoryPro</span>
          </div>
          
          <div className="flex space-x-8">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="flex items-center space-x-1 hover:text-gray-200 transition-colors duration-200 group"
              >
                <div className="group-hover:scale-110 transition-transform duration-200">
                  {item.icon}
                </div>
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <div className="md:hidden bg-[#1e0e4b] text-white p-4 flex justify-between items-center shadow-lg">
        <div className="flex items-center space-x-2">
          <Package size={24} className="text-white" />
          <span className="text-lg font-bold">InventoryPro</span>
        </div>
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-full hover:bg-[#7747ff] transition-colors duration-200"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:hidden bg-[#1e0e4b] text-white w-64 p-6 space-y-6 transition duration-300 ease-in-out z-20`}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Package size={24} className="text-white" />
            <span className="text-lg font-bold">InventoryPro</span>
          </div>
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-full hover:bg-[#7747ff] transition-colors duration-200"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="flex flex-col space-y-4">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-[#7747ff] transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
      
      {/* Overlay when sidebar is open */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-10"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

export default Navbar;