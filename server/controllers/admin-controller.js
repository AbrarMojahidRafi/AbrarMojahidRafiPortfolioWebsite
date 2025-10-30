const { UserModel } = require("../models/users");
const { ContactModel } = require("../models/contacts");
const { name } = require("ejs");
const { contact } = require("./contacts-controller");
const { validateServiceModel, ServiceModel } = require("../models/services");

const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find({}, "-password"); // Exclude password field
    // console.log(users);
    if (users.length === 0) {
      return res.status(404).send({ message: "No users found" });
    }
    return res
      .status(200)
      .send({ message: "Users fetched successfully", users: users });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).send({ message: `Error fetching users: ${error}` });
  }
};

const getAllContacts = async (req, res) => {
  try {
    const contacts = await ContactModel.find({});
    // console.log(contacts);
    if (contacts.length === 0) {
      return res.status(404).send({ message: "No contacts found" });
    }
    return res
      .status(200)
      .send({ message: "Contacts fetched successfully", contacts: contacts });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return res
      .status(500)
      .send({ message: `Error fetching contacts: ${error}` });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await UserModel.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).send({ message: "User not found" });
    }
    return res
      .status(200)
      .send({ message: "User deleted successfully", user: deletedUser });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).send({ message: `Error deleting user: ${error}` });
  }
};

const deleteContactById = async (req, res) => {
  try {
    const contactId = req.params.id;
    const deletedContact = await ContactModel.findByIdAndDelete(contactId);
    if (!deletedContact) {
      return res.status(404).send({ message: "Contact not found" });
    }
    return res.status(200).send({
      message: "Contact deleted successfully",
      contact: deletedContact,
    });
  } catch (error) {
    console.error("Error deleting contact:", error);
    return res
      .status(500)
      .send({ message: `Error deleting contact: ${error}` });
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    // const updateData = req.body;
    const updatedUser = await UserModel.findOne(
      { _id: userId },
      { password: 0 }
    );
    if (!updatedUser) {
      return res.status(404).send({ message: "User not found" });
    }
    return res.status(200).send({ message: "User data", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).send({ message: `Error updating user: ${error}` });
  }
};

const updateUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const { username, email, phone } = req.body;
    const updateData = { name: username, email: email, contact: phone };
    // console.log("Update data received in backend:", updateData);
    const updatedUser = await UserModel.updateOne(
      { _id: userId },
      { $set: updateData }
    );
    // console.log("Updated user in backend:", updatedUser);
    if (!updatedUser) {
      return res.status(404).send({ message: "User not found" });
    }
    return res
      .status(200)
      .send({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    // console.error("Error updating user:", error);
    return res.status(500).send({ message: `Error updating user: ${error}` });
  }
};

const deleteService = async (req, res) => {
  try {
    const serviceId = req.params.serviceId;
    const deletedService = await ServiceModel.findByIdAndDelete(serviceId);
    if (!deletedService) {
      return res.status(404).send({ message: "Service not found" });
    }
    return res.status(200).send({
      message: "Service deleted successfully",
      service: deletedService,
    });
  } catch (error) {
    console.error("Error deleting service:", error);
    return res
      .status(500)
      .send({ message: `Error deleting service: ${error}` });
  }
};

// Get service by ID
const getServiceById = async (req, res) => {
  try {
    const serviceId = req.params.serviceId;
    const service = await ServiceModel.findOne({ _id: serviceId });

    if (!service) {
      return res.status(404).send({ message: "Service not found" });
    }

    return res.status(200).send({
      message: "Service data fetched successfully",
      service: service,
    });
  } catch (error) {
    console.error("Error fetching service:", error);
    return res
      .status(500)
      .send({ message: `Error fetching service: ${error}` });
  }
};

// Update service by ID
const updateServiceById = async (req, res) => {
  try {
    const serviceId = req.params.serviceId;
    const { service_name, service_description, delivery_time, price_range } =
      req.body;

    const updateData = {
      service_name,
      service_description,
      delivery_time,
      price_range,
    };

    // console.log("Update service data received in backend:", updateData);

    const updatedService = await ServiceModel.updateOne(
      { _id: serviceId },
      { $set: updateData }
    );

    // console.log("Updated service in backend:", updatedService);

    if (!updatedService) {
      return res.status(404).send({ message: "Service not found" });
    }

    return res.status(200).send({
      message: "Service updated successfully",
      service: updatedService,
    });
  } catch (error) {
    console.error("Error updating service:", error);
    return res
      .status(500)
      .send({ message: `Error updating service: ${error}` });
  }
};

module.exports = {
  getAllUsers,
  getAllContacts,
  deleteUserById,
  deleteContactById,
  getUserById,
  updateUserById,
  deleteService,
  getServiceById,
  updateServiceById,
};
