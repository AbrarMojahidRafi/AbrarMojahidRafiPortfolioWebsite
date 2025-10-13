const Joi = require("joi");
const mongoose = require("mongoose");

// Service Schema
const serviceSchema = mongoose.Schema({
    service_name: {
        type: String,
        trim: true,
        required: [true, 'Service name is required'],
        index: true
    },
    service_description: {
        type: String,
        required: [true, 'Service description is required']
    },
    delivery_time: {
        type: String,
        trim: true,
        required: [true, 'Delivery time is required']
    },
    price_range: {
        type: String,
        trim: true,
        required: [true, 'Price range is required']
    }
});

// Validation function using Joi for Service
function validateServiceModel(data) {
    const serviceSchema = Joi.object({
        service_name: Joi.string()
            .required()
            .messages({
                'string.empty': 'Service name is required'
            }),
        
        service_description: Joi.string()
            .required()
            .messages({
                'string.empty': 'Service description is required'
            }),
        
        delivery_time: Joi.string()
            .required()
            .messages({
                'string.empty': 'Delivery time is required'
            }),
        
        price_range: Joi.string()
            .required()
            .messages({
                'string.empty': 'Price range is required'
            })
    });

    let { error } = serviceSchema.validate(data);
    return error;
}

let ServiceModel = mongoose.model("Service", serviceSchema);

module.exports = { validateServiceModel, ServiceModel };