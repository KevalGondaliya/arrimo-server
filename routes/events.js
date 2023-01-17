const express = require("express");
const router = express.Router();
const {
  createEvent,
  getEvents,
  getLoginUserEvents,
  editEvent,
  deleteEvent,
} = require("../controllers/events.js");
const { protect } = require("../middleware/");

router.post("/", protect, createEvent);
router.get("/all", protect, getEvents);
router.get("/", protect, getLoginUserEvents);
router.patch("/:id", protect, editEvent);
router.delete("/:id", protect, deleteEvent);
module.exports = router;
