import React, { useState } from 'react';
import { X, Calendar, DollarSign } from 'lucide-react';

function QuotationModal({ isOpen, onClose, request }) {
  const [price, setPrice] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [status, setStatus] = useState('PENDING');

  if (!isOpen || !request) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create quotation object
    const quotation = {
      requestId: request.id,
      price: parseFloat(price),
      expirationDate,
      status
    };
    
    console.log('Submitting quotation:', quotation);
    // Here you would typically send this to your backend
    
    // Close modal and reset form
    onClose();
    setPrice('');
    setExpirationDate('');
    setStatus('PENDING');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        {/* Modal panel */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex justify-between items-center pb-3 border-b border-gray-200">
              <h3 className="text-lg font-medium leading-6" style={{ color: '#1e0e4b' }}>
                Add Quotation
              </h3>
              <button
                onClick={onClose}
                className="rounded-full p-1 hover:bg-gray-100 focus:outline-none transition-colors duration-200"
              >
                <X size={20} style={{ color: '#7747ff' }} />
              </button>
            </div>

            <div className="mt-4">
              <div className="bg-gray-50 p-4 rounded-md mb-4">
                <h4 className="font-medium mb-2" style={{ color: '#7747ff' }}>Request Details</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-gray-500">Item Name</p>
                    <p className="font-medium">{request.itemName}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Category</p>
                    <p className="font-medium">{request.category}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Quantity</p>
                    <p className="font-medium">{request.quantity}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Unit</p>
                    <p className="font-medium">{request.unit}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Status</p>
                    <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-2.5 py-0.5 rounded">
                      Pending
                    </span>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                     
                    </div>
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="focus:ring-purple-500 focus:border-purple-500 block w-full pl-3 pr-12 py-3 sm:text-sm border-gray-300 rounded-md"
                    
                      step="0.01"
                      min="0"
                      required
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">LKR</span>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expiration Date
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                     
                    </div>
                    <input
                      type="date"
                      value={expirationDate}
                      onChange={(e) => setExpirationDate(e.target.value)}
                      className="focus:ring-purple-500 focus:border-purple-500 block w-full p-3 sm:text-sm border-gray-300 rounded-md"
                      required
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                </div>

                <div className="mt-5 sm:mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    style={{ backgroundColor: '#7747ff' }}
                  >
                    Submit Quotation
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuotationModal;