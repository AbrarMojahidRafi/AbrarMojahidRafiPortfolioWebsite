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
    message: {
      type: String,
      required: [true, 'Message is required'],
      minLength: [10, 'Message must be at least 10 characters'],
      maxLength: [1000, 'Message cannot exceed 1000 characters']
    },
    subject: {
      type: String,
      trim: true,
      required: [true, 'Subject is required'],
      minLength: [5, 'Subject must be at least 5 characters'],
      maxLength: [200, 'Subject cannot exceed 200 characters']
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
          .min(5)
          .max(200)
          .required(),
     
        message: Joi.string()
          .min(10)
          .max(1000)
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