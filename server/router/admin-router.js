const express = require("express");
const authMiddleware = require("../middleware/auth-middleware");
const adminMiddleware = require("../middleware/admin-middleware");

const router = express.Router();

const adminController = require("../controllers/admin-controller");

router
  .route("/users")
  .get(authMiddleware, adminMiddleware, adminController.getAllUsers);
router
  .route("/contacts")
  .get(authMiddleware, adminMiddleware, adminController.getAllContacts);
router
  .route("/users/delete/:id")
  .delete(authMiddleware, adminMiddleware, adminController.deleteUserById);
router
  .route("/contacts/delete/:id")
  .delete(authMiddleware, adminMiddleware, adminController.deleteContactById);
router
  .route("/user/edit/:id")
  .get(authMiddleware, adminMiddleware, adminController.getUserById);
router
  .route("/user/update/:id")
  .patch(authMiddleware, adminMiddleware, adminController.updateUserById);

// service delete route
router
  .route("/services/delete/:serviceId")
  .delete(authMiddleware, adminMiddleware, adminController.deleteService);
// service edit button route
router
  .route("/services/edit/:serviceId")
  .get(authMiddleware, adminMiddleware, adminController.getServiceById);
router
  .route("/services/update/:serviceId")
  .patch(authMiddleware, adminMiddleware, adminController.updateServiceById); 
router
  .route("/services/create")
  .post(authMiddleware, adminMiddleware, adminController.createService);

module.exports = router;
