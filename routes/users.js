const express = require("express");
const router = express.Router();
const {
  getUsers,
  createUser,
  editUser,
  deleteUser,
  getLoginUser,
  loginUser,
} = require("../controllers/users.js");
const { protect } = require("../middleware/");

router.post("/login", loginUser);
router.get("/", protect, getUsers);
router.post("/", protect, createUser);
router.patch("/:id", protect, editUser);
router.delete("/:id", protect, deleteUser);
router.get("/login-user", protect, getLoginUser);
module.exports = router;
