import React, { useState, useEffect } from 'react';
import { X, Calendar, User, Check, X as XIcon } from 'lucide-react';

function QuotationsViewModal({ isOpen, onClose, request }) {
  // Sample quotations data - moved before conditional return
  const [quotations, setQuotations] = useState([
    { 
      id: 1, 
      supplierName: "ABC Supplies", 
      price: 1200, 
      expirationDate: "2025-05-15", 
      status: "PENDING" 
    },
    { 
      id: 2, 
      supplierName: "XYZ Corporation", 
      price: 980, 
      expirationDate: "2025-05-20", 
      status: "APPROVED" 
    },
    { 
      id: 3, 
      supplierName: "Omega Distributors", 
      price: 1350, 
      expirationDate: "2025-05-10", 
      status: "REJECTED" 
    },
    { 
      id: 1, 
      supplierName: "ABC Supplies", 
      price: 1200, 
      expirationDate: "2025-05-15", 
      status: "PENDING" 
    },
    { 
      id: 2, 
      supplierName: "XYZ Corporation", 
      price: 980, 
      expirationDate: "2025-05-20", 
      status: "APPROVED" 
    },
    { 
      id: 3, 
      supplierName: "Omega Distributors", 
      price: 1350, 
      expirationDate: "2025-05-10", 
      status: "REJECTED" 
    }
  ]);

  // Close modal when escape key is pressed - moved before conditional return
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27 && isOpen) onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose, isOpen]);

  // Early return after hooks
  if (!isOpen || !request) return null;

  // Format price with currency
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'LKR'
    }).format(price);
  };

  // Get status badge color
  const getStatusBadgeClasses = (status) => {
    switch (status) {
      case 'APPROVED':
        return 'bg-green-100 text-green-800';
      case 'REJECTED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  // Handle accept quotation
  const handleAccept = (id) => {
    console.log(`Accepting quotation ${id}`);
    // Implementation would go here
  };

  // Handle reject quotation
  const handleReject = (id) => {
    console.log(`Rejecting quotation ${id}`);
    // Implementation would go here
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200" style={{ backgroundColor: '#1e0e4b' }}>
          <h2 className="text-xl font-semibold text-white">Request Details</h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full text-white hover:bg-white hover:bg-opacity-20 transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        {/* Request Details */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-medium" style={{ color: '#1e0e4b' }}>Item Information</h3>
              <div className="mt-3 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Item Name:</span>
                  <span className="font-medium">{request.itemName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Category:</span>
                  <span>{request.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Quantity:</span>
                  <span>{request.quantity} {request.unit}</span>
                </div>
              </div>
            </div>
            
            <div className="md:border-l md:pl-4 md:border-gray-200">
              <h3 className="text-lg font-medium" style={{ color: '#1e0e4b' }}>Status</h3>
              <div className="mt-3">
                <div className="flex items-center">
                  <span className="text-gray-500 mr-2">Current Status:</span>
                  <span className={`px-2 py-1 rounded-md text-sm font-medium ${
                    request.status === 'OPENED' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {request.status === 'OPENED' ? 'Opened' : 'Closed'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Quotations Section */}
        <div className="px-6 py-4 overflow-auto flex-grow">
          <h3 className="text-lg font-medium mb-4" style={{ color: '#7747ff' }}>
            Quotations
          </h3>
          
          {quotations.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Supplier
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Expiration Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {quotations.map((quotation) => (
                    <tr key={quotation.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center">
                            <User size={16} style={{ color: '#7747ff' }} />
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">
                              {quotation.supplierName}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-sm text-gray-900">{formatPrice(quotation.price)}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Calendar size={16} className="text-gray-400 mr-1" />
                          <span className="text-sm text-gray-500">{quotation.expirationDate}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClasses(quotation.status)}`}>
                          {quotation.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex space-x-2">
                         
                            <>
                              <button
                                onClick={() => handleAccept(quotation.id)}
                                className="p-1.5 rounded-full bg-green-100 hover:bg-green-200 transition-colors"
                                title="Accept Quotation"
                              >
                                <Check size={16} className="text-green-600" />
                              </button>
                              <button
                                onClick={() => handleReject(quotation.id)}
                                className="p-1.5 rounded-full bg-red-100 hover:bg-red-200 transition-colors"
                                title="Reject Quotation"
                              >
                                <XIcon size={16} className="text-red-600" />
                              </button>
                            </>
                        
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No quotations available for this request.
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuotationsViewModal;