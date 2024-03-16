import prisma from "~/server/db/prisma";

export default defineEventHandler(async (event) => {
    const { data, transaction } = await readBody(event);

    await prisma.inventoryTransactions.create({
        data: {
            transactionType: transaction.transactionType,
            description: transaction.description,
            material: {
                connect: {
                    id: data.id,
                },
            },
            quantityOfChange: transaction.changeInQuantity,
            quantityBeforeChange: data.quantity,
            quantityAfterChange: transaction.newQuantity,
            units: data.units,
        },
    });

    await prisma.inventoryOfMaterials.update({
        where: {
            id: data.id,
        },
        data: {
            quantity: transaction.newQuantity,
        },
    });

    return "DONE";
});
