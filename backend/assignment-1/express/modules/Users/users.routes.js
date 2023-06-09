const { Router } = require("express");
const {
  getAllUsers,
  addUser,
  deleteUser,
  updateUser,
  getUser,
} = require("./users.controller");

const router = Router();

router.get("/users", getAllUsers);
router.post("/users", addUser);
router.get("/users/:id", getUser);
router.delete("/users/:id", deleteUser);
router.patch("/users/:id", updateUser);

module.exports = router;
