import prisma from "~/server/db/prisma";

export default defineEventHandler(async (event) => {
    const newData = await readBody(event);

    const newReagent = await prisma.inventoryOfReagents.create({
        data: {
            chemicalName: newData.chemicalName,
            description: newData.description,
            classification: newData.classification,
            quantity: newData.quantity,
            reservedQuantity: newData.reservedQuantity,
            casNumber: newData.casNumber,
            code: newData.code,
            manufacturerName: newData.manufacturerName,
            supplier: newData.supplier,
            unit: newData.unit,
            DGClass: newData.DGClass,
            subRisk: newData.subRisk,
            PG: newData.PG,
            riskPhrase: newData.riskPhrase,
            hazSub: newData.hazSub,
            poisonSchedule: newData.poisonSchedule,
            currentSDS: newData.currentSDS,
            dateReceived: newData.dateReceived,
            expiryDate: newData.expiryDate,
            dateOpened: newData.dateOpened,
            status: newData.status,
            available: newData.available,
            hidden: newData.hidden,
        },
    });

    return "SUCCESS";
});
