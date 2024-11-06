import express from "express";
const router = express.Router();
import { createUser, login, updateUser } from "../controllers/user.controller";

router.route("/create").post(createUser);
router.route("/update/:id").put(updateUser);
router.route("/login").post(login);

export default router;
