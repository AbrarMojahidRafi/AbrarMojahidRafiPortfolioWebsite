import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminNewService = () => {
  const [formData, setFormData] = useState({
    service_name: "",
    service_description: "",
    delivery_time: "",
    price_range: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:3000/api/admin/AbrarMojahidRafi_PortfolioWebsite/services/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("Service created successfully!");
        // Reset form
        setFormData({
          service_name: "",
          service_description: "",
          delivery_time: "",
          price_range: "",
        });
      } else {
        toast.error(data.message || "Failed to create service");
      }
    } catch (error) {
      toast.error("An error occurred while creating the service");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Create New Service
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Service Name */}
        <div>
          <label
            htmlFor="service_name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Service Name *
          </label>
          <input
            type="text"
            id="service_name"
            name="service_name"
            value={formData.service_name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter service name"
          />
        </div>

        {/* Service Description */}
        <div>
          <label
            htmlFor="service_description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Service Description *
          </label>
          <textarea
            id="service_description"
            name="service_description"
            value={formData.service_description}
            onChange={handleChange}
            required
            rows="4"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter service description"
          />
        </div>

        {/* Delivery Time */}
        <div>
          <label
            htmlFor="delivery_time"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Delivery Time *
          </label>
          <input
            type="text"
            id="delivery_time"
            name="delivery_time"
            value={formData.delivery_time}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., 3-5 days, 1 week, etc."
          />
        </div>

        {/* Price Range */}
        <div>
          <label
            htmlFor="price_range"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Price Range *
          </label>
          <input
            type="text"
            id="price_range"
            name="price_range"
            value={formData.price_range}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., $100-$500, $50-$200, etc."
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => navigate(`/admin/services`)}
          >
            {loading ? "Creating Service..." : "Create Service"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminNewService;
