import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const deleteReagents = await prisma.reagentRequests.deleteMany({});
const deleteMaterials = await prisma.materialRequests.deleteMany({});
const deleteEquipment = await prisma.equipmentRequests.deleteMany({});

const deleteLabRes = await prisma.laboratoryReservations.deleteMany({});

const deleteLabRequests = await prisma.laboratoryRequests.deleteMany({});

console.log(`Deleted ${deleteReagents.count} reagents`);
console.log(`Deleted ${deleteMaterials.count} materials`);
console.log(`Deleted ${deleteEquipment.count} equipment`);
console.log(`Deleted ${deleteLabRes.count} lab reservations`);
console.log(`Deleted ${deleteLabRequests.count} lab requests`);
