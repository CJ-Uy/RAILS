import prisma from "~/server/db/prisma";

export default defineEventHandler(async () => {
    const allEquipment = await prisma.InventoryOfEquipment.findMany({
        where: {
            available: true,
        },
    });

    const filteredEquipment = allEquipment.reduce((accumulator, current) => {
        // Check if the instance of the equipment is already in the accumulator by seeing if it has an index
        const index = accumulator.findIndex(
            (item) =>
                item.equipmentName === current.equipmentName &&
                item.description === current.description &&
                item.modelNoOrManufacturer === current.modelNoOrManufacturer,
        );

        // If it is in the accumultor, add the quantity to the existing quantity and the id to the ids array
        if (index !== -1) {
            accumulator[index].quantity += current.quantity;
            accumulator[index].ids.push(current.id);
            return accumulator;
        } else {
            // filter current to only the fields we need
            const filteredCurrent = {
                equipmentName: current.equipmentName,
                description: current.description,
                modelNoOrManufacturer: current.modelNoOrManufacturer,
                quantity: current.quantity,
                ids: [current.id],
            };

            // add filteredCurrent to the accumulator
            return [...accumulator, filteredCurrent];
        }
    }, []);

    return filteredEquipment;
});
