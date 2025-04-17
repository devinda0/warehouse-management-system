import React, { useState, useEffect } from 'react';
import { Plus, Search, Trash2, Edit, Save, X } from 'lucide-react';

function Inventory() {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: '',
    quantity: '',
    unit: '',
    price: '',
    expirationDate: '',
    space: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [editingItemId, setEditingItemId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    sku: '',
    category: '',
    quantity: '',
    unit: '',
    price: '',
    expirationDate: '',
    space: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      id: Date.now().toString(),
      ...formData
    };
    setItems([...items, newItem]);
    setFormData({
      name: '',
      sku: '',
      category: '',
      quantity: '',
      unit: '',
      price: '',
      expirationDate: '',
      space: ''
    });
    //add api to add item to database
  };

  const handleDelete = (id) => {
    setItems(items.filter(item => item.id !== id));
    if (editingItemId === id) {
      setEditingItemId(null);
    }
    //add api to delete item from database
  };

  const handleEditClick = (item) => {
    setEditingItemId(item.id);
    setEditFormData({
      name: item.name,
      sku: item.sku,
      category: item.category,
      quantity: item.quantity,
      unit: item.unit,
      price: item.price,
      expirationDate: item.expirationDate,
      space: item.space
    });
  };

  const handleCancelEdit = () => {
    setEditingItemId(null);
  };

  const handleEditSubmit = () => {
    const updatedItems = items.map(item => {
      if (item.id === editingItemId) {
        return { ...item, ...editFormData };
      }
      return item;
    });
    setItems(updatedItems);
    setEditingItemId(null);

    //add api to update item in database
  };

  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gray-50 border-b border-gray-200 px-4 py-6">
        <h1 className="text-2xl font-bold text-[#1e0e4b]">Inventory Management</h1>
      </header>

      <div className="flex-1 px-4 py-6 md:px-6 lg:px-8">
        {/* Add Item Form */}
        <div className="mb-8 p-6 bg-white rounded-lg shadow-md border border-gray-100">
          <h2 className="text-xl font-semibold mb-4 text-[#1e0e4b]">Add New Item</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
              <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
              <input
                type="text"
                name="sku"
                value={formData.sku}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7747ff]"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7747ff]"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7747ff]"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
              <input
                type="text"
                name="unit"
                value={formData.unit}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7747ff]"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Price (LKR)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7747ff]"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Expiration Date</label>
              <input
                type="date"
                name="expirationDate"
                value={formData.expirationDate}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7747ff]"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Space</label>
              <input
                type="text"
                name="space"
                value={formData.space}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7747ff]"
                required
              />
            </div>
            <div className="mb-4 md:col-span-2 lg:col-span-4 flex justify-end">
              <button
                type="submit"
                className="flex items-center px-4 py-2 bg-[#7747ff] text-white rounded-md hover:bg-[#6637ef] transition-colors focus:outline-none"
              >
                <Plus size={18} className="mr-2" />
                Add Item
              </button>
            </div>
          </form>
        </div>

        {/* Items Table */}
        <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-xl font-semibold text-[#1e0e4b]">Inventory Items</h2>
            
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
                  <th className="px-6 py-3 text-left text-sm font-semibold">SKU</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Category</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Quantity</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Unit</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Price</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Expiration Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Space</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredItems.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="px-6 py-4 text-center text-gray-500">
                      {searchTerm ? 'No items found matching your search.' : 'No items found. Add your first item using the form above.'}
                    </td>
                  </tr>
                ) : (
                  filteredItems.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      {editingItemId === item.id ? (
                        // Editing mode
                        <>
                          <td className="sticky left-0 bg-white hover:bg-gray-50 px-6 py-4">
                            <input
                              type="text"
                              name="name"
                              value={editFormData.name}
                              onChange={handleEditInputChange}
                              className="w-full p-1 border border-gray-300 rounded-md text-sm"
                              required
                            />
                          </td>
                          <td className="px-6 py-4">
                            <input
                              type="text"
                              name="sku"
                              value={editFormData.sku}
                              onChange={handleEditInputChange}
                              className="w-full p-1 border border-gray-300 rounded-md text-sm"
                              required
                            />
                          </td>
                          <td className="px-6 py-4">
                            <input
                              type="text"
                              name="category"
                              value={editFormData.category}
                              onChange={handleEditInputChange}
                              className="w-full p-1 border border-gray-300 rounded-md text-sm"
                              required
                            />
                          </td>
                          <td className="px-6 py-4">
                            <input
                              type="number"
                              name="quantity"
                              value={editFormData.quantity}
                              onChange={handleEditInputChange}
                              className="w-full p-1 border border-gray-300 rounded-md text-sm"
                              required
                            />
                          </td>
                          <td className="px-6 py-4">
                            <input
                              type="text"
                              name="unit"
                              value={editFormData.unit}
                              onChange={handleEditInputChange}
                              className="w-full p-1 border border-gray-300 rounded-md text-sm"
                              required
                            />
                          </td>
                          <td className="px-6 py-4">
                            <input
                              type="number"
                              name="price"
                              value={editFormData.price}
                              onChange={handleEditInputChange}
                              className="w-full p-1 border border-gray-300 rounded-md text-sm"
                              required
                            />
                          </td>
                          <td className="px-6 py-4">
                            <input
                              type="date"
                              name="expirationDate"
                              value={editFormData.expirationDate}
                              onChange={handleEditInputChange}
                              className="w-full p-1 border border-gray-300 rounded-md text-sm"
                              required
                            />
                          </td>
                          <td className="px-6 py-4">
                            <input
                              type="text"
                              name="space"
                              value={editFormData.space}
                              onChange={handleEditInputChange}
                              className="w-full p-1 border border-gray-300 rounded-md text-sm"
                              required
                            />
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex space-x-2">
                              <button
                                onClick={handleEditSubmit}
                                className="p-1 text-green-600 hover:bg-green-50 rounded"
                                title="Save"
                              >
                                <Save size={18} />
                              </button>
                              <button
                                onClick={handleCancelEdit}
                                className="p-1 text-gray-500 hover:bg-gray-50 rounded"
                                title="Cancel"
                              >
                                <X size={18} />
                              </button>
                            </div>
                          </td>
                        </>
                      ) : (
                        // Display mode
                        <>
                          <td className="sticky left-0 bg-white hover:bg-gray-50 px-6 py-4 text-sm font-medium text-[#1e0e4b]">{item.name}</td>
                          <td className="px-6 py-4 text-sm text-gray-700">{item.sku}</td>
                          <td className="px-6 py-4 text-sm text-gray-700">{item.category}</td>
                          <td className="px-6 py-4 text-sm text-gray-700">{item.quantity}</td>
                          <td className="px-6 py-4 text-sm text-gray-700">{item.unit}</td>
                          <td className="px-6 py-4 text-sm text-gray-700">LKR {Number(item.price).toFixed(2)}</td>
                          <td className="px-6 py-4 text-sm text-gray-700">{item.expirationDate}</td>
                          <td className="px-6 py-4 text-sm text-gray-700">{item.space}</td>
                          <td className="px-6 py-4 text-sm">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleEditClick(item)}
                                className="p-1 text-[#7747ff] hover:bg-[#7747ff] hover:bg-opacity-10 rounded"
                                title="Edit"
                              >
                                <Edit size={18} />
                              </button>
                              <button
                                onClick={() => handleDelete(item.id)}
                                className="p-1 text-red-500 hover:bg-red-50 rounded"
                                title="Delete"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </td>
                        </>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inventory;