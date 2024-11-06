import { NextFunction, Request, Response } from "express";

export interface AuthenticatedRequest extends Request {
  userId?: number;
}

const isAuthenticated = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): any => {
  const userIdHeader = req.headers["user-id"];
  if (!userIdHeader) {
    return res.status(400).json({ message: "User is not authenticated" });
  }

  const userId = Number(userIdHeader);

  if (isNaN(userId)) {
    return res.status(400).json({ message: "Invalid User ID" });
  }
  req.userId = userId;
  next();
};

export default isAuthenticated;
