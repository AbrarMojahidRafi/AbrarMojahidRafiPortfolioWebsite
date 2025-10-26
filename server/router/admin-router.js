const express = require("express");
const authMiddleware = require("../middleware/auth-middleware");
const adminMiddleware = require("../middleware/admin-middleware");

const router = express.Router();

const adminController = require("../controllers/admin-controller");

router.route("/users").get(authMiddleware, adminMiddleware, adminController.getAllUsers);
router.route("/contacts").get(authMiddleware, adminMiddleware, adminController.getAllContacts);

module.exports = router;
