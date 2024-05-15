const express = require("express");
const AuthController = require("../../../controllers/AuthController");
const { RegisterValidate } = require("../../../validations");

const router = express.Router();

router.post(
    "/register",
    RegisterValidate(),
    AuthController.validate,
    AuthController.registerUser
);

module.exports = router;
