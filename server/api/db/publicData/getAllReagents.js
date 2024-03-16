import prisma from "~/server/db/prisma";

export default defineEventHandler(async () => {
    return await prisma.inventoryOfReagents.findMany({
        where: {
            hidden: false,
        },
        include: {
            location: true,
            laboratories: true,
            schoolYear: true,
        },
    });
});
