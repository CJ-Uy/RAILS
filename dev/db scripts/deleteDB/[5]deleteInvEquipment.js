import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const deleteReagents = await prisma.inventoryOfEqupiment.deleteMany({});

console.log(`Deleted ${deleteReagents.count} materials`);
