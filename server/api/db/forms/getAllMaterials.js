import prisma from "~/server/db/prisma";

export default defineEventHandler(async () => {
    const allMaterials = await prisma.inventoryOfMaterials.findMany({
        where: {
            available: true,
        },
    });

    const filteredMaterials = allMaterials.reduce((accumulator, current) => {
        // Check if the instance of the material is already in the accumulator by seeing if it has an index
        const index = accumulator.findIndex(
            (item) =>
                item.materialName === current.itemName &&
                item.description === current.description &&
                item.classification === current.classification &&
                item.unit === current.unit,
        );

        // If it is in the accumultor, add the quantity to the existing quantity and the id to the ids array
        if (index !== -1) {
            accumulator[index].quantity += current.quantity;
            accumulator[index].ids.push(current.id);
            return accumulator;
        } else {
            // filter current to only the fields we need
            const filteredCurrent = {
                materialName: current.itemName,
                description: current.description,
                classification: current.classification,
                unit: current.unit,
                quantity: current.quantity,
                ids: [current.id],
            };

            // add filteredCurrent to the accumulator
            return [...accumulator, filteredCurrent];
        }
    }, []);

    return filteredMaterials;
});
