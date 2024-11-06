import prisma from "../db/db.config";
import { Request, Response } from "express";
import bcrypt from "bcrypt";

interface Create {
  name: string;
  email: string;
  password: string;
}

export const createUser = async (req: Request, res: Response): Promise<any> => {
  const { name, email, password }: Create = req.body;

  // Input validation
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check if user already exists
  const userExist = await prisma.user.findUnique({
    where: { email: email },
  });

  if (userExist) {
    return res.status(400).json({ message: "User  already exists" });
  }

  try {
    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
    });

    return res.status(201).json({
      message: "User  created successfully",
      success: true,
      newUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password }: { email: string; password: string } = req.body;
    console.log(email, password);

    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    res
      .status(200)
      .json({ message: "Logged successfully", success: true, user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateUser = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  const { name, email, password }: Create = req.body;

  // Input validation
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const updateUser = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
    });

    return res.status(201).json({
      message: "User  updated successfully",
      success: true,
      updateUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
