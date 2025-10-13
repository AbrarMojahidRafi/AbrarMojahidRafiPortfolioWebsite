const express = require("express");

const router = express.Router();

const servicecontrollers = require("../controllers/services-controller");

router.route("/service").get(servicecontrollers.service);

module.exports = router;
