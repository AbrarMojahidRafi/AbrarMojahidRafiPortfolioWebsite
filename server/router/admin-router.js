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

module.exports = router;
