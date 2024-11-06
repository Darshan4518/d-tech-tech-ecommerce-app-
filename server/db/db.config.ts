import { PrismaClient } from "prisma/prisma-client";
const prisma = new PrismaClient({
  log: ["query"],
});

export default prisma;
