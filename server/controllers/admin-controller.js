const { UserModel } = require("../models/users");
const { ContactModel } = require("../models/contacts");
getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find({}, '-password'); // Exclude password field
        console.log(users);
        if (users.length === 0) {
            return res.status(404).send({ message: "No users found" });
        }
        return res.status(200).send({ message: "Users fetched successfully", users: users });
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).send({ message: `Error fetching users: ${error}` });
    }
}

getAllContacts = async (req, res) => {
    try {
        const contacts = await ContactModel.find({});
        console.log(contacts);
        if (contacts.length === 0) {
            return res.status(404).send({ message: "No contacts found" });
        } 
        return res.status(200).send({ message: "Contacts fetched successfully", contacts: contacts });
    } catch (error) {
        console.error("Error fetching contacts:", error);
        return res.status(500).send({ message: `Error fetching contacts: ${error}` });
    }
};

module.exports = { getAllUsers, getAllContacts }; 