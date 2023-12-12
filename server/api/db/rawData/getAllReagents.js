import prisma from "~/server/db/prisma";

export default defineEventHandler(async () => {
    return await prisma.inventoryOfReagents.findMany({
        include: {
            location: true,
            laboratories: true,
            schoolYear: true,
        },
    });
});


