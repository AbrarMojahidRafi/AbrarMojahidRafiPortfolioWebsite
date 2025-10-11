const Joi = require("joi");
const mongoose = require("mongoose");

// Contact Schema
const contactSchema = mongoose.Schema({
    name: {
      type: String,
      trim: true,
      required: [true, 'Name is required'],
      minLength: [3, 'Name must be at least 3 characters'],
      maxLength: [50, 'Name cannot exceed 50 characters'],
      index: true
    },
    contact: {
      type: String,
      trim: true,
      required: [true, 'Contact is required'],
      index: true
    },
    email: {
      type: String,
      trim: true,
      required: [true, 'Email is required'],
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
      index: true
    },
    subject: {
      type: String,
      trim: true,
      required: [true, 'Subject is required']
    },
    message: {
      type: String,
      required: [true, 'Message is required']
    },
    isRead: {
        type: Boolean,
        default: false
    },
    responded: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Validation function using Joi for Contact
function validateContactModel(data){
    const contactSchema = Joi.object({
        name: Joi.string()
          .min(3)
          .max(50)
          .required(),
        
        contact: Joi.string()
          .required()
          .messages({
            'string.empty': 'Contact number is required'
          }),
     
        email: Joi.string()
          .email({ tlds: { allow: true } })
          .lowercase()
          .required(),
        
        subject: Joi.string()
          .required(),
     
        message: Joi.string()
          .required(),
        
        isRead: Joi.boolean()
          .default(false),
          
        responded: Joi.boolean()
          .default(false)
      });      

    let {error} = contactSchema.validate(data);
    return error;
}

let ContactModel = mongoose.model("Contact", contactSchema);

module.exports = {validateContactModel, ContactModel};