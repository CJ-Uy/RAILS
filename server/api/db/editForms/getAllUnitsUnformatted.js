import prisma from "~/server/db/prisma";

export default defineEventHandler(async () => {
    const allUnits = await prisma.units.findMany();
    return allUnits;
});
