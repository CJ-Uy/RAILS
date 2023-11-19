import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const allLocations = await prisma.laboratoryLocations.findMany();

console.log(allLocations);
