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
            quantity: true,
            reservedQuantity: true,
        },
    });

    for (const reagent of allReagents) {
        reagent.maxRequestableQuantity =
            reagent.quantity - reagent.reservedQuantity;
    }

    return allReagents;
});
