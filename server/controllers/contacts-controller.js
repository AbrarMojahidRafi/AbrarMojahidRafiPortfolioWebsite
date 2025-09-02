// Models 
const {validateContactModel, ContactModel} = require("../models/contacts");

// --------------------------------
// Contact Logic
// --------------------------------

const contact = async (req, res) => {
    try {
        res.status(200).send("Hello World! From Contact controller");

        // Extracting data from the request body
        const { name, contact, email, subject, message } = req.body ;

        // Working on the validation part
        const error = validateContactModel({ name, contact, email, subject, message });  
        if (error) {

            // // Using error-handling middleware 
            // const statusCode = 400; // Bad Request
            // const message = error.details[0].message;
            // const extraDetails = "Validation error in contact form";

            // const error = {statusCode, message, extraDetails}; 

            // next(error); // Passing the error to the error-handling middleware
            console.log(error.details[0].message);
            return res.status(400).send(error.details[0].message);
        }

        // Save the "contact" to the database
        const createdContact = await ContactModel.create({ name, contact, email, subject, message });

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