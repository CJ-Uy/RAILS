import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const deleteLabs = await prisma.laboratories.deleteMany({});

console.log(`Deleted ${deleteLabs.count} materials`);
