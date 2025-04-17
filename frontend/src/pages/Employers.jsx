import React, { useEffect, useState } from 'react';
import { Plus, Trash2, UserPlus, Search } from 'lucide-react';
import useAxios from '../hooks/useAxios';

function Employers() {
  const [employers, setEmployers] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
    birthday: '',
    salary: ''
  });
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployer, setSelectedEmployer] = useState(null);
  const [username, setUsername] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const axios = useAxios();

  useEffect( () => {
    axios.get('/worker/')
      .then((response) => {
        setEmployers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching employers:', error);
      });
  },[axios])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/worker/', formData)
      .then((response) => {
        alert('Employer added successfully!');
        const newEmployer = {
          id: Date.now().toString(),
          ...response.data,
        };
        setEmployers([...employers, newEmployer]);
        setFormData({
          name: '',
          email: '',
          address: '',
          phone: '',
          birthday: '',
          salary: ''
        });
      })
      .catch((error) => {
        alert('Error adding employer. Please try again.');
        console.error('Error adding employer:', error);
      });    
  };

  const handleDelete = (id) => {
    setEmployers(employers.filter(employer => employer.id !== id));
  };

  const openUsernameModal = (employer) => {
    setSelectedEmployer(employer);
    setShowModal(true);
    setUsername(generateUsername(employer.name));
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedEmployer(null);
    setUsername('');
  };

  const handleUsernameSubmit = (e) => {
    e.preventDefault();
    const updatedEmployers = employers.map(emp => {
      if (emp.id === selectedEmployer.id) {
        return { ...emp, username };
      }
      return emp;
    });
    setEmployers(updatedEmployers);
    closeModal();
  };

  const generateUsername = (name) => {
    return name.toLowerCase().replace(/\s+/g, '.') + Math.floor(Math.random() * 100);
  };

  const filteredEmployers = employers.filter(employer => 
    employer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gray-50 border-b border-gray-200 px-4 py-6">
        <h1 className="text-2xl font-bold text-[#1e0e4b]">Employers Management</h1>
      </header>

      <div className="flex-1 px-4 py-6 md:px-6 lg:px-8">
        {/* Add Employer Form */}
        <div className="mb-8 p-6 bg-white rounded-lg shadow-md border border-gray-100">
          <h2 className="text-xl font-semibold mb-4 text-[#1e0e4b]">Add New Employer</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7747ff]"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7747ff]"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7747ff]"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7747ff]"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Birthday</label>
              <input
                type="date"
                name="birthday"
                value={formData.birthday}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7747ff]"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Salary (LKR)</label>
              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7747ff]"
                required
              />
            </div>
            <div className="mb-4 md:col-span-2 lg:col-span-3 flex justify-end">
              <button
                type="submit"
                className="flex items-center px-4 py-2 bg-[#7747ff] text-white rounded-md hover:bg-[#6637ef] transition-colors focus:outline-none "
              >
                <Plus size={18} className="mr-2" />
                Add Employer
              </button>
            </div>
          </form>
        </div>

        {/* Employers Table */}
        <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-xl font-semibold text-[#1e0e4b]">Employers List</h2>
            
            {/* Search bar */}
            <div className="relative w-full sm:w-64 flex-shrink-0">
              <input
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7747ff]"
              />
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead className="bg-gray-50 text-[#1e0e4b]">
                <tr>
                  <th className="sticky left-0 bg-gray-50 px-6 py-3 text-left text-sm font-semibold">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Address</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Phone</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Birthday</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Salary</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Username</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredEmployers.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="px-6 py-4 text-center text-gray-500">
                      {searchTerm ? 'No employers found matching your search.' : 'No employers found. Add your first employer using the form above.'}
                    </td>
                  </tr>
                ) : (
                  filteredEmployers.map((employer) => (
                    <tr key={employer.id} className="hover:bg-gray-50">
                      <td className="sticky left-0 bg-white hover:bg-gray-50 px-6 py-4 text-sm font-medium text-[#1e0e4b]">{employer.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{employer.email}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{employer.address}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{employer.phone}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{employer.birthday}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">LKR {Number(employer.salary).toLocaleString()}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{employer.username || '-'}</td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => openUsernameModal(employer)}
                            className="p-1 text-[#7747ff] hover:bg-[#7747ff] hover:bg-opacity-10 rounded"
                            title="Create Username"
                          >
                            <UserPlus size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(employer.id)}
                            className="p-1 text-red-500 hover:bg-red-50 rounded"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Username Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-[#1e0e4b]">Create Username</h3>
            </div>
            <form onSubmit={handleUsernameSubmit}>
              <div className="p-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username for {selectedEmployer?.name}
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7747ff]"
                  required
                />
              </div>
              <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#7747ff] text-white rounded-md hover:bg-[#6637ef] focus:outline-none focus:ring-2 focus:ring-[#1e0e4b]"
                >
                  Create Username
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Employers;