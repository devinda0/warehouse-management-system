import React, { useState, useEffect } from "react";
import { Eye, Trash2, FileText, Plus, Search, Filter } from "lucide-react";
import useAuth from "../hooks/useAuth";
import QuotationModal from "../components/QuotationModal";
import QuotationsViewModal from "../components/QuotationsViewModal";
import useAxios from "../hooks/useAxios";

function Request() {
  const { role, username } = useAuth();
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("");
  const [unit, setUnit] = useState("");
  const [quantity, setQuantity] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewingRequest, setViewingRequest] = useState(null);
  const [requests, setRequests] = useState([]);
  const axios = useAxios();

  useEffect(() => {
    axios.get('/request')
    .then((res) => {
      setRequests(res.data);
    })
    .catch((err) => {
      alert("Error fetching requests");
      console.log(err);
    })

  },[axios])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (itemName && quantity) {

      axios.post('/request', {
        name : itemName,
        category,
        unit,
        quantity: parseInt(quantity),
      })
      .then((res) => {
        setRequests([...requests, res.data]);
        setItemName("");
        setCategory("");
        setUnit("");
        setQuantity("");
      })
      .catch((err) => {
        alert("Error creating request");
        console.log(err);
      })
    }
  };

  const handleDelete = (id) => {
    axios.delete(`/request/${id}`)
    .then(() => {
      alert("Request deleted successfully");
      setRequests(requests.filter((request) => request.id !== id));
    })
    .catch((err) => {
      alert("Error deleting request");
      console.log(err);
    })
  };

  const handleView = (id) => {
    // Find the request with the matching id
    const request = requests.find((req) => req.id === id);
    if (request) {
      setViewingRequest(request);
      setViewModalOpen(true);
    }
  };

  const handleAddQuotation = (id) => {
    // Find the request with the matching id
    const request = requests.find((req) => req.id === id);
    if (request) {
      setSelectedRequest(request);
      setModalOpen(true);
    }
  };

  // Filter requests based on search query and status filter
  const filteredRequests = requests.filter((request) => {
    // Filter by search query (check both itemName and category)
    const matchesSearch =
      request.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.category.toLowerCase().includes(searchQuery.toLowerCase());

    // Filter by status
    const matchesStatus =
      statusFilter === "ALL" || request.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6" style={{ color: "#1e0e4b" }}>
          Request Management
        </h1>

        {role !== "supplier" && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2
              className="text-xl font-semibold mb-4"
              style={{ color: "#7747ff" }}
            >
              Add New Request
            </h2>
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Item Name
                </label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter category"
                  min="1"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Unit
                </label>
                <input
                  type="text"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter unit"
                  min="1"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity
                </label>
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
                  style={{ backgroundColor: "#7747ff" }}
                >
                  <Plus size={18} className="mr-2" />
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2
            className="text-xl font-semibold mb-4"
            style={{ color: "#7747ff" }}
          >
            All Requests
          </h2>

          {/* Search Bar */}
          <div className="mb-4 relative">
            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
              <div className="px-3 py-2 bg-gray-50">
                <Search size={18} className="text-gray-500" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 focus:outline-none"
                placeholder="Search by item name or category..."
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="sticky left-0 bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    style={{ color: "#1e0e4b" }}
                  >
                    Item Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    style={{ color: "#1e0e4b" }}
                  >
                    Category
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    style={{ color: "#1e0e4b" }}
                  >
                    Quantity
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    style={{ color: "#1e0e4b" }}
                  >
                    Unit
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    style={{ color: "#1e0e4b" }}
                  >
                    <div className="flex items-center">
                      <span className="mr-2">Status</span>
                      <div className="relative">
                        <select
                          value={statusFilter}
                          onChange={(e) => setStatusFilter(e.target.value)}
                          className="appearance-none bg-gray-50 border border-gray-300 rounded-md py-1 pl-2 pr-6 text-xs focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                          <option value="ALL">All</option>
                          <option value="OPENED">Opened</option>
                          <option value="CLOSED">Closed</option>
                        </select>
                        <Filter
                          size={12}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                        />
                      </div>
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider"
                    style={{ color: "#1e0e4b" }}
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRequests.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50">
                    <td className="sticky left-0 bg-white z-10 px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {request.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {request.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {request.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {request.unit}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {request.status === "OPENED" ? (
                        <span className="bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded">
                          Opened
                        </span>
                      ) : (
                        <span className="bg-red-100 text-red-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded">
                          Closed
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleView(request.id)}
                          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                          title="View Request"
                        >
                          <Eye size={18} style={{ color: "#1e0e4b" }} />
                        </button>

                        {role !== "supplier" && (
                          <button
                            onClick={() => handleDelete(request.id)}
                            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                            title="Delete Request"
                          >
                            <Trash2 size={18} style={{ color: "#7747ff" }} />
                          </button>
                        )}

                        {role === "supplier" && (
                          <button
                            onClick={() => handleAddQuotation(request.id)}
                            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                            title="Add Quotation"
                          >
                            <FileText size={18} style={{ color: "#7747ff" }} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredRequests.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No requests found.{" "}
              {role !== "supplier" &&
                "Add your first request using the form above."}
            </div>
          )}
        </div>
      </div>

      {/* Quotation Modal */}
      <QuotationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        request={selectedRequest}
      />

      <QuotationsViewModal
        isOpen={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        request={viewingRequest}
      />
    </div>
  );
}

export default Request;
