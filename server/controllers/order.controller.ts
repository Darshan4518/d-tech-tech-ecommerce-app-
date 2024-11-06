import { Request, Response } from "express";
import prisma from "../db/db.config";
import { Prisma } from "prisma/prisma-client";
import { AuthenticatedRequest } from "../authentication/isAuthenticated";

export const createOrder = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<any> => {
  try {
    const userId = req.userId;
    const { items, total } = req.body;

    const order = await prisma.order.create({
      data: {
        items: items as Prisma.JsonArray,
        total,
        userId: userId as number,
      },
    });

    return res
      .status(201)
      .json({ message: "Order created successfully", order });
  } catch (error: unknown) {
    console.error("Error creating order:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserOrders = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<any> => {
  try {
    const userId = req.userId;
    const orders = await prisma.user.findUnique({
      where: { id: userId },
      include: { Order: true },
    });

    return res.status(201).json({ success: true, orders });
  } catch (error: unknown) {
    console.error("Error creating order:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
