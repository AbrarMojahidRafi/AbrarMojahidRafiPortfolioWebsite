// -------------------------------- 
// Imports
const bcrypt = require("bcryptjs");

// Models
const {validateUserModel, UserModel} = require("../models/users");

// --------------------------------
// // Home Logic 
// --------------------------------

const home = (req, res) => {
    try {
        res.status(200).send("Hello World! From Home controller");
    }   
    catch (error) {
        console.error("Error rendering home page:", error); 
    } 
}

// -------------------------------- 
// Register Logic
// -------------------------------- 

const register = async (req, res) => {
    try {
        // res.status(200).send("Hello World! From Register controller");

        // Extracting data from the request body
        // console.log("Request Body:", req.body);
        const { username, phone, email, password } = req.body; 

        // Check if user with the same email already exists
        const userExists = await UserModel.findOne({ email });
        if(userExists){
            return res.status(400).send("User with this email already exists.");
        }

        // Working on the validation part
        const error = validateUserModel({ name: username, contact: phone, email: email, password: password });  
        if (error) {

            // // Using error-handling middleware 
            // const statusCode = 400; // Bad Request
            // const message = error.details[0].message;
            // const extraDetails = "";

            // const error = {statusCode, message, extraDetails}; 

            // next(error); // Passing the error to the error-handling middleware
            console.log("Validation error in user registration");
            return res.status(400).send(error.details[0].message);
        }

        // Hash the password before saving 
        const salt = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(password, salt);

        // Save the "user" to the database
        // console.log({ username, phone, email, password: hash_password });
        const createdUser = await UserModel.create({ name: username, contact: phone, email: email, password: hash_password });

        // GENERATE JWT TOKEN AND SEND IT TO THE CLIENT
        // printing it right now.
        res.status(201).send({ 
            message: "User registered successfully", 
            token: await createdUser.generateToken(), 
            userId: createdUser._id.toString()
        });
        
    }   
    catch (error) {
        console.error("Error rendering register page:", error); 
    }
}


// -------------------------------- 
// login Logic
// --------------------------------

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Basic validation
        if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
        }

        // Check if user with the provided email exists
        const existedUser = await UserModel.findOne({ email }).select('+password');
        if (!existedUser) {

            // const statusCode = 400; // Bad Request
            // const message = "User with this email does not exist. Please register first.";
            // const extraDetails = "Login error: Email not found"; 
            // const error = {statusCode, message, extraDetails};
            // next(error); // Passing the error to the error-handling middleware

            return res.status(400).send("User with this email does not exist. Please register first."); 
        }

        // Compare the provided password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, existedUser.password);
        if (!isPasswordValid) {
            return res.status(400).send("Invalid password. Please try again.");
        }

        // Email and password is matched, so go to the client
        res.status(200).send({ 
            message: "Login successful", 
            token: await existedUser.generateToken(), // If email and password are valid, generate a JWT token
            userId: existedUser._id.toString()
        });

    } catch (error) {
        // const statusCode = 500; // Internal Server Error
        // const message = "An error occurred during login. Please try again later.";
        // const extraDetails = "Login error"; 
        // const errorObj = {statusCode, message, extraDetails};
        // next(error); // Passing the error to the error-handling middleware

        console.error("Error during login:", error);
        res.status(500).send("An error occurred during login. Please try again later.");
    }
}

// --------------------------------



// -------------------------------- 
// --------------END--------------- 
// -------------------------------- 

module.exports = { home, register, login };  
