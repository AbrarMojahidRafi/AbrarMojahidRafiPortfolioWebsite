// Models 
const {validateContactModel, ContactModel} = require("../models/contacts");

// --------------------------------
// Contact Logic
// --------------------------------

const contact = async (req, res) => {
    try {
        // console.log("Hello World! From Contact controller", req.body); 

        // Extracting data from the request body
        const { username, contact, email, subject, message } = req.body ;

        // Working on the validation part
        const error = validateContactModel({ name: username, contact: contact, email: email, subject: subject, message: message });  

        if (error) {

            // // Using error-handling middleware 
            // const statusCode = 400; // Bad Request
            // const message = error.details[0].message;
            // const extraDetails = "Validation error in contact form";

            // const error = {statusCode, message, extraDetails}; 
            // console.log(error.details[0].message);
            // next(error); // Passing the error to the error-handling middleware
            
            return res.status(400).send(error.details[0].message);
        }

        // Save the "contact" to the database
        const createdContact = await ContactModel.create({ name: username, contact: contact, email: email, subject: subject, message: message });
        
        // console.log("Contact form submitted successfully.");
        res.status(200).send({ 
            message: "Contact form submitted successfully", 
            contactId: createdContact._id.toString()
        });
    }   
    catch (error) {
        console.error("Error rendering contact page:", error); 
    } 
}

// --------------------------------
// --------------END--------------- 
// --------------------------------

module.exports = { contact };