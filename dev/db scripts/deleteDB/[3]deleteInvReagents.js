import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const deleteReagents = await prisma.inventoryOfReagents.deleteMany({});

console.log(`Deleted ${deleteReagents.count} reagents`);
