import { Router } from "express";
import { createOrder, getUserOrders } from "../controllers/order.controller";
import isAuthenticated from "../authentication/isAuthenticated";

const router = Router();

router.route("/create").post(createOrder);
router.route("/").get(isAuthenticated, getUserOrders);

export default router;
