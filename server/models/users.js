const Joi = require("joi");
const mongoose = require("mongoose");
// const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

// User Schema
const userSchema = mongoose.Schema({
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
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
      index: true
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minLength: [8, 'Password must be at least 8 characters'],
      select: false // Hide password by default when querying
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
  });

// Validation function using Joi
function validateUserModel(data){
    const userSchema = Joi.object({
        name: Joi.string()
          .min(3)
          .max(50)
          .required(),
        
        contact: Joi.string()
          .required()
          .messages({
            'string.pattern.base': 'Please use a valid contact number'
          }),
     
        email: Joi.string()
          .email({ tlds: { allow: true } })
          .lowercase()
          .required(),
     
        password: Joi.string()
          .min(8)
          .max(128)
          .required(),
        
        isAdmin: Joi.boolean()
          .default(false)
      });      

    let {error} = userSchema.validate(data);
    return error;
}

// // Running this codes before saving the user in the database
// userSchema.pre('save', async function(next) {
//     const user = this;
//     if (!user.isModified('password')) return next(); 

//     try {
//         const salt = await bcrypt.genSalt(10);
//         const hash_password = await bcrypt.hash(user.password, salt);
//         user.password = hash_password;
//         next();
//     } catch (err) {
//         next(err);
//     }   
// });

// --- INSTANCE METHOD
// JWT Token generation method 
userSchema.methods.generateToken = function() {
    try{
      return jwt.sign(
        { 
          userId: this._id.toString(), 
          email: this.email, 
          isAdmin: this.isAdmin 
        }, 
        process.env.JWT_SECRET_KEY_FOR_GENERATING_TOKEN, 
        { expiresIn: '15d' }
      );
    } catch(error){
      console.error("Error generating token:", error);
      throw new Error("Token generation failed");
    } 
}

let UserModel = mongoose.model("User", userSchema);

module.exports = {validateUserModel, UserModel};