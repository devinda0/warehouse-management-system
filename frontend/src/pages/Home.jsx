import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import useAuth from '../hooks/useAuth';

function Home() {
  //const { role } = useAuth();
  const role = 'manager'; // Hardcoded for demonstration purposes
  
  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  // Get role-specific stats and info
  const getRoleSpecificContent = () => {
    switch (role) {
      case 'manager':
        return {
          stats: [
            { label: 'Total Inventory Items', value: '2,458', icon: '📦' },
            { label: 'Active Employees', value: '42', icon: '👥' },
            { label: 'Pending Requests', value: '7', icon: '📝' },
            { label: 'Low Stock Items', value: '13', icon: '⚠️' }
          ],
          message: "Manage your inventory, team, and operations from one central dashboard."
        };
      case 'worker':
        return {
          stats: [
            { label: 'Inventory Items', value: '2,458', icon: '📦' },
            { label: 'Items Processed Today', value: '34', icon: '✅' },
            { label: 'Your Tasks', value: '5', icon: '📋' },
            { label: 'Low Stock Items', value: '13', icon: '⚠️' }
          ],
          message: "Track inventory and complete your daily tasks efficiently."
        };
      case 'supplier':
        return {
          stats: [
            { label: 'Open Requests', value: '12', icon: '📝' },
            { label: 'Pending Deliveries', value: '8', icon: '🚚' },
            { label: 'Completed This Month', value: '47', icon: '✅' },
            { label: 'Product Categories', value: '16', icon: '📊' }
          ],
          message: "Manage requests and track your deliveries seamlessly."
        };
      default:
        return {
          stats: [
            { label: 'Inventory Items', value: '2,458', icon: '📦' },
            { label: 'Active Users', value: '42', icon: '👥' },
            { label: 'System Status', value: 'Online', icon: '✅' },
            { label: 'Last Update', value: 'Today', icon: '🔄' }
          ],
          message: "Welcome to InventoryPro, your complete inventory management solution."
        };
    }
  };

  const roleContent = getRoleSpecificContent();

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-white to-purple-50 pt-6">
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Welcome Section */}
        <motion.div 
          className="mb-12 text-center"
          variants={itemVariants}
        >
          <h1 className="text-4xl font-bold text-[#1e0e4b] mb-4">{getGreeting()}, <span className="text-[#7747ff]">Welcome to InventoryPro</span></h1>
          <p className="text-xl text-gray-700">{roleContent.message}</p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          variants={itemVariants}
        >
          {roleContent.stats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-xl p-6 border-l-4 border-[#7747ff] hover:transform hover:scale-105 transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                  <p className="text-3xl font-bold text-[#1e0e4b]">{stat.value}</p>
                </div>
                <div className="text-4xl">{stat.icon}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Quick Overview */}
          <motion.div 
            className="lg:col-span-2 bg-white rounded-xl shadow-xl p-6 relative overflow-hidden"
            variants={itemVariants}
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#7747ff] opacity-10 rounded-full transform translate-x-20 -translate-y-20"></div>
            <h2 className="text-2xl font-bold text-[#1e0e4b] mb-4">Quick Overview</h2>
            
            <div className="relative">
              <div className="flex flex-col space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-[#7747ff]">System Status</h3>
                  <div className="mt-2 flex items-center">
                    <span className="h-3 w-3 bg-green-500 rounded-full mr-2"></span>
                    <span>All systems operational</span>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-[#7747ff]">Recent Activity</h3>
                  <ul className="mt-2 space-y-2">
                    <li className="flex justify-between">
                      <span>Inventory update</span>
                      <span className="text-sm text-gray-500">2 hours ago</span>
                    </li>
                    <li className="flex justify-between">
                      <span>New request submitted</span>
                      <span className="text-sm text-gray-500">5 hours ago</span>
                    </li>
                    <li className="flex justify-between">
                      <span>System maintenance completed</span>
                      <span className="text-sm text-gray-500">Yesterday</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div 
            className="bg-gradient-to-br from-[#1e0e4b] to-[#7747ff] text-white rounded-xl shadow-xl p-6"
            variants={itemVariants}
          >
            <h2 className="text-2xl font-bold mb-4">Quick Tips</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="mr-2 mt-1">💡</span>
                <span>Use the navbar above to navigate to different sections of the application.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 mt-1">💡</span>
                <span>Check the Inventory section for real-time stock updates.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 mt-1">💡</span>
                <span>View your profile to update your information or change settings.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 mt-1">💡</span>
                <span>Need help? Contact your system administrator.</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Feature Highlights */}
        <motion.div 
          className="mb-12"
          variants={itemVariants}
        >
          <h2 className="text-2xl font-bold text-[#1e0e4b] mb-6 text-center">System Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#7747ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[#1e0e4b] mb-2">Real-time Tracking</h3>
              <p className="text-gray-600">Monitor inventory levels, stock movements, and requests in real-time.</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#7747ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[#1e0e4b] mb-2">Advanced Analytics</h3>
              <p className="text-gray-600">Gain insights from comprehensive reports and analytics dashboards.</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#7747ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[#1e0e4b] mb-2">Team Collaboration</h3>
              <p className="text-gray-600">Streamline communication between managers, workers, and suppliers.</p>
            </div>
          </div>
        </motion.div>

        {/* Footer Section */}
        <motion.div 
          className="text-center py-6 text-gray-500 text-sm"
          variants={itemVariants}
        >
          <p>© 2025 InventoryPro. All rights reserved.</p>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Home;