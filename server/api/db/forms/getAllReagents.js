import prisma from "~/server/db/prisma";

export default defineEventHandler(async () => {
    const allReagents = await prisma.InventoryOfReagents.findMany({
        where: {
            available: true,
        },
        select: {
            id: true,
            chemicalName: true,
            description: true,
            unit: true,
            currentQuantity: true,
            maxRequestableQuantity: true,
        },
    });

    return allReagents;
});
