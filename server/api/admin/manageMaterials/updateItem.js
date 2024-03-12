import prisma from "~/server/db/prisma";

export default defineEventHandler(async (event) => {
    const newData = await readBody(event);

    const updatedItem = await prisma.inventoryOfMaterials.update({
        where: {
            id: newData.id,
        },
        data: {
            itemName: newData.itemName,
            description: newData.description,
            quantity: newData.quantity,
            unit: newData.unit,
            unitCost: newData.unitCost,
            classification: newData.classification,
            code: newData.code,
            supplier: newData.supplier,
            dateReceived: newData.dateReceived,
            additionalPurchase: newData.additionalPurchase,
            make: newData.make,
            damage: newData.damage,
            balancePerCard: newData.balancePerCard,
            balancePerCount: newData.balancePerCount,
            currentlyInUse: newData.currentlyInUse,
            available: newData.available,
            hidden: newData.hidden,
        },
    });

    return "SUCCESS";
});
