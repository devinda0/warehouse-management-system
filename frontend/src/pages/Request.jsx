import React, { useState, useEffect } from 'react';
import { Eye, Trash2, FileText, Plus } from 'lucide-react';
import useAuth from '../hooks/useAuth';

function Request() {
  const { role, username } = useAuth();
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [requests, setRequests] = useState([
    { id: 1, itemName: 'Laptop', quantity: 5 },
    { id: 2, itemName: 'Desk Chair', quantity: 10 },
    { id: 3, itemName: 'Printer Paper', quantity: 50 },
    { id: 4, itemName: 'Whiteboard Markers', quantity: 30 },
    { id: 5, itemName: 'Monitors', quantity: 8 },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (itemName && quantity) {
      const newRequest = {
        id: Date.now(),
        itemName,
        quantity: parseInt(quantity)
      };
      setRequests([...requests, newRequest]);
      setItemName('');
      setQuantity('');
    }
  };

  const handleDelete = (id) => {
    setRequests(requests.filter(request => request.id !== id));
  };

  const handleView = (id) => {
    // Functionality to view request details
    console.log(`Viewing request ${id}`);
  };

  const handleAddQuotation = (id) => {
    // Functionality to add quotation
    console.log(`Adding quotation for request ${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6" style={{ color: '#1e0e4b' }}>Request Management</h1>
        
        {role !== 'supplier' && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4" style={{ color: '#7747ff' }}>Add New Request</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
                <input
                  type="text"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter item name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter quantity"
                  min="1"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="flex items-center justify-center px-6 py-2 rounded-md text-white font-medium transition-colors duration-200"
                  style={{ backgroundColor: '#7747ff' }}
                >
                  <Plus size={18} className="mr-2" />
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        )}
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4" style={{ color: '#7747ff' }}>All Requests</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="sticky left-0 bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: '#1e0e4b' }}>
                    Item Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: '#1e0e4b' }}>
                    Quantity
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider" style={{ color: '#1e0e4b' }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {requests.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50">
                    <td className="sticky left-0 bg-white z-10 px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {request.itemName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {request.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleView(request.id)}
                          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                          title="View Request"
                        >
                          <Eye size={18} style={{ color: '#1e0e4b' }} />
                        </button>
                        
                        {role !== 'supplier' && (
                          <button
                            onClick={() => handleDelete(request.id)}
                            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                            title="Delete Request"
                          >
                            <Trash2 size={18} style={{ color: '#7747ff' }} />
                          </button>
                        )}
                        
                        {role === 'supplier' && (
                          <button
                            onClick={() => handleAddQuotation(request.id)}
                            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                            title="Add Quotation"
                          >
                            <FileText size={18} style={{ color: '#7747ff' }} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {requests.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No requests found. {role !== 'supplier' && 'Add your first request using the form above.'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Request;