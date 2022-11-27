import express from "express";
import {
  getUsers,
  getUserById,
  createUser,
  blockUsers,
  unBlockUsers,
  deleteUser,
  deleteUsers,
} from "../controllers/Users.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();
router.get("/users", verifyUser, getUsers);
router.get("/users/:id", verifyUser, getUserById);
router.post("/users", createUser);
router.post("/users/block", verifyUser, blockUsers);
router.post("/users/unblock", verifyUser, unBlockUsers);
router.delete("/users/:id", verifyUser, deleteUser);
router.post("/users/delete", verifyUser, deleteUsers);

export default router;
