const express = require("express");

const tickets = require("./tickets");
const users = require("./users");
const auth = require("./auth");

const router = express.Router();

router.use("/tickets", tickets);
router.use("/users", users);
router.use("/auth", auth);

module.exports = router;
