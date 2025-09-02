const express = require("express");

const router = express.Router();

const contactcontrollers = require("../controllers/contacts-controller");

router.route("/contact").post(contactcontrollers.contact);

module.exports = router;
