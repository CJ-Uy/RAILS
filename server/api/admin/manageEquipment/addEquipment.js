import prisma from "~/server/db/prisma";

export default defineEventHandler(async (event) => {
    const newData = await readBody(event);

    const newEquipment = await prisma.inventoryOfEquipment.create({
        data: {
            equipmentName: newData.equipmentName,
            description: newData.description,
            serialNumber: newData.serialNumber,
            quantity: newData.quantity,
            currentlyInUse: newData.currentlyInUse,
            available: newData.available,
            code: newData.code,
            modelNoOrManufacturer: newData.modelNoOrManufacturer,
            unit: newData.unit,
            unitCost: newData.unitCost,
            dateReceived: newData.dateReceived,
            propertyNumber: newData.propertyNumber,
            acquisitionType: newData.acquisitionType,
            supplier: newData.supplier,
            status: newData.status,
        },
    });

    return newEquipment;
});
