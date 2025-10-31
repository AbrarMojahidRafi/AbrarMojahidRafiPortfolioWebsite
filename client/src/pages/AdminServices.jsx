import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingServiceId, setDeletingServiceId] = useState(null);
  const navigate = useNavigate();

  // Memoized function to get all services data
  const getAllServicesData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3000/api/data/AbrarMojahidRafi_PortfolioWebsite/service`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // console.log("Response status while fetching services:", response);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      // console.log("All services data from backend: ", data);

      setServices(data || []);
    } catch (error) {
      console.error("Error while getting all services data", error);
      toast.error("Failed to load services data!");
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteService = async (serviceId) => {
    // Confirmation dialog before deletion
    if (!window.confirm("Are you sure you want to delete this service?")) {
      return;
    }

    setDeletingServiceId(serviceId);
    const toastId = toast.loading("Deleting service...");

    try {
      const response = await fetch(
        `http://localhost:3000/api/admin/AbrarMojahidRafi_PortfolioWebsite/services/delete/${serviceId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.update(toastId, {
          render: "Service deleted successfully!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
          closeButton: true,
        });
        // Optimistic update - remove service from state immediately
        setServices((prevServices) =>
          prevServices.filter((service) => service._id !== serviceId)
        );
      } else {
        throw new Error(data.message || "Failed to delete service");
      }
    } catch (error) {
      console.error("Error while deleting service", error);
      toast.update(toastId, {
        render: error.message || "Error deleting service!",
        type: "error",
        isLoading: false,
        autoClose: 3000,
        closeButton: true,
      });
    } finally {
      setDeletingServiceId(null);
    }
  };

  useEffect(() => {
    getAllServicesData();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-600">Loading services...</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Admin Services Management
          </h1>
          <button
            onClick={() => navigate("/admin/service/create")}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md font-medium transition-colors"
          >
            Add New Service
          </button>
        </div>

        {services.length === 0 ? (
          <div className="bg-white shadow-md rounded-lg p-8 text-center">
            <p className="text-gray-500 text-lg">No services found.</p>
          </div>
        ) : (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Service Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Service Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Delivery Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price Range
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {services.map((service) => (
                    <tr
                      key={service._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-normal">
                        <div className="text-sm font-medium text-gray-900">
                          {service.service_name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-normal">
                        <div className="text-sm text-gray-500 max-w-md">
                          {service.service_description}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {service.delivery_time || "N/A"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {service.price_range || "N/A"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap space-x-2">
                        <button
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors disabled:opacity-50"
                          onClick={() =>
                            navigate(`/admin/service/edit/${service._id}`)
                          }
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors disabled:opacity-50"
                          onClick={() => deleteService(service._id)}
                          disabled={deletingServiceId === service._id}
                        >
                          {deletingServiceId === service._id
                            ? "Deleting..."
                            : "Delete"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default AdminServices;
