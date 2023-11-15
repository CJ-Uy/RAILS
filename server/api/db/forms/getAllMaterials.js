import prisma from "~/server/db/prisma";

export default defineEventHandler(async () => {
    const allMaterials = await prisma.inventoryOfMaterials.findMany({
        where: {
            available: true,
        },
        select: {
            id: true,
            itemName: true,
            description: true,
            classification: true,
            unit: true,
            quantity: true,
        },
    });

    return allMaterials;
});
