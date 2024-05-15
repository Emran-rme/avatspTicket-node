const express = require("express");
const TicketController = require("../../../controllers/TicketController");

const router = express.Router();

router.get("/", TicketController.index);
router.get("/:id", TicketController.show);
router.post("/", TicketController.store);

module.exports = router;
