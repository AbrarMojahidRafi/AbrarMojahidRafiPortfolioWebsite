import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminServiceUpdate = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState({
    service_name: "",
    service_description: "",
    delivery_time: "",
    price_range: "",
  });
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  // Fetch service data by ID
  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        setFetchLoading(true);
        const response = await fetch(
          `http://localhost:3000/api/admin/AbrarMojahidRafi_PortfolioWebsite/services/edit/${serviceId}`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch service data");
        }

        const data = await response.json();
        setService({
          service_name: data.service.service_name || "",
          service_description: data.service.service_description || "",
          delivery_time: data.service.delivery_time || "",
          price_range: data.service.price_range || "",
        });

        toast.success("Service data loaded successfully!");
      } catch (error) {
        console.error("Error fetching service:", error);
        toast.error("Failed to load service data");
        navigate("/admin/services");
      } finally {
        setFetchLoading(false);
      }
    };

    if (serviceId) {
      fetchServiceData();
    }
  }, [serviceId, navigate]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setService((prevService) => ({
      ...prevService,
      [name]: value,
    }));
  };

  // Handle textarea changes
  const handleTextareaChange = (e) => {
    const { name, value } = e.target;
    setService((prevService) => ({
      ...prevService,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Show loading toast
    const toastId = toast.loading("Updating service...");

    try {
      const response = await fetch(
        `http://localhost:3000/api/admin/AbrarMojahidRafi_PortfolioWebsite/services/update/${serviceId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(service),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        // Update toast to error
        toast.update(toastId, {
          render: data.message || "Failed to update service!",
          type: "error",
          isLoading: false,
          autoClose: 3000,
          closeButton: true,
        });
        throw new Error(data.message || "Failed to update service");
      }

      // Update toast to success
      toast.update(toastId, {
        render: "Service updated successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
        closeButton: true,
      });

      // Redirect after successful update with delay to show toast
      setTimeout(() => {
        navigate("/admin/services");
      }, 1500);
    } catch (error) {
      console.error("Error updating service:", error);
      // Ensure toast is updated even if there's an unexpected error
      if (!toast.isActive(toastId)) {
        toast.error(error.message || "Failed to update service");
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle cancel with confirmation toast
  const handleCancel = () => {
    toast.info("Cancelled editing service", {
      autoClose: 2000,
    });
    navigate("/admin/services");
  };

  if (fetchLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-gray-600 text-lg">Loading service data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Edit Service</h1>
              <p className="text-gray-600 mt-1">Update service information</p>
            </div>
            <button
              onClick={handleCancel}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Services
            </button>
          </div>
        </div>

        {/* Form Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Service Name Field */}
            <div>
              <label
                htmlFor="service_name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Service Name
              </label>
              <input
                type="text"
                id="service_name"
                name="service_name"
                value={service.service_name}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                placeholder="Enter service name"
              />
            </div>

            {/* Service Description Field */}
            <div>
              <label
                htmlFor="service_description"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Service Description
              </label>
              <textarea
                id="service_description"
                name="service_description"
                value={service.service_description}
                onChange={handleTextareaChange}
                required
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-vertical"
                placeholder="Enter service description"
              />
            </div>

            {/* Delivery Time Field */}
            <div>
              <label
                htmlFor="delivery_time"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Delivery Time
              </label>
              <input
                type="text"
                id="delivery_time"
                name="delivery_time"
                value={service.delivery_time}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                placeholder="e.g., 7-10 days, 2 weeks, 1 month"
              />
            </div>

            {/* Price Range Field */}
            <div>
              <label
                htmlFor="price_range"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Price Range
              </label>
              <input
                type="text"
                id="price_range"
                name="price_range"
                value={service.price_range}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                placeholder="e.g., $100-$500, $50-$200, Custom quote"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={handleCancel}
                disabled={loading}
                className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Updating...
                  </>
                ) : (
                  "Update Service"
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-blue-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">
                Update Service Information
              </h3>
              <div className="mt-2 text-sm text-blue-700">
                <p>
                  Make changes to the service information as needed. All fields
                  are required for a complete service listing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminServiceUpdate;
