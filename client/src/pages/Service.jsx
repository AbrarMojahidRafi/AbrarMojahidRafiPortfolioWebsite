import React from 'react';
import { useAuth } from '../store/auth';

const Service = () => {

  const { services } = useAuth();

  // console.log(services);
  
  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Our Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional solutions tailored to your business needs with quality and precision
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* Getting each service from services using map function. */}
          {services && services.map((currService, index) => {
          
          return (
            <div 
              key={index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden"
            >
              {/* Card Header */}
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {currService.service_name}
                </h3>
                <div className="w-12 h-1 bg-indigo-600 rounded-full"></div>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <p className="text-gray-600 leading-relaxed mb-6">
                  {currService.service_description}
                </p>

                {/* Service Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500">Delivery Time</span>
                    <span className="text-sm font-semibold text-gray-800 bg-blue-50 px-3 py-1 rounded-full">
                      {currService.delivery_time}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500">Price Range</span>
                    <span className="text-sm font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                      {currService.price_range}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 pb-6">
                <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors duration-200 transform hover:scale-105 active:scale-95">
                  Get Quote
                </button>
              </div>
            </div>
          ); 
          })}
            
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Can't find what you're looking for?
          </p>
          <button className="bg-white text-indigo-600 border border-indigo-600 hover:bg-indigo-50 font-semibold py-3 px-8 rounded-xl transition-colors duration-200">
            Contact Us for Custom Solutions
          </button>
        </div>
      </div>
    </div>
  );
};

export default Service;