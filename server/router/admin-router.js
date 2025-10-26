const express = require("express");
const authMiddleware = require("../middleware/auth-middleware");

const router = express.Router();

const adminController = require("../controllers/admin-controller");

router.route("/users").post(authMiddleware, adminController.getAllUsers);
router.route("/contacts").post(authMiddleware, adminController.getAllContacts);

module.exports = router;
