import prisma from "~/server/db/prisma";

export default defineEventHandler(async () => {
    return await prisma.inventoryOfEqupiment.findMany({
        include: {
            location: true,
            laboratories: true,
            schoolYear: true,
        },
    });
});
