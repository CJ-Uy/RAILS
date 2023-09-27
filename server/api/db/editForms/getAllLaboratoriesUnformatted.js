import prisma from "~/server/db/prisma";

export default defineEventHandler(async () => {
    const allLaboratories = await prisma.laboratories.findMany();
    return allLaboratories;
});
