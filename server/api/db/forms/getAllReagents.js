import prisma from "~/server/db/prisma";

export default defineEventHandler(async () => {
    // TODO: set the quantity to the available quantity the day of the lab activity?
    const allReagents = await prisma.InventoryOfReagents.findMany({
        where: {
            available: true,
        },
    });

    const filteredReagents = allReagents.reduce((accumulator, current) => {
        // Check if the instance of the reagent is already in the accumulator by seeing if it has an index
        const index = accumulator.findIndex(
            (item) =>
                item.chemicalName === current.chemicalName &&
                item.description === current.description
        );

        // If it is in the accumultor, add the quantity to the existing quantity
        if (index !== -1) {
            accumulator[index].currentQuantity += current.currentQuantity;
            accumulator[index].maxQuantity += current.maxQuantity;
            return accumulator;
        } else {
            // filter current to only the fields we need
            const filteredCurrent = {
                chemicalName: current.chemicalName,
                description: current.description,
                unit: current.unit,
                currentQuantity: current.currentQuantity,
                maxQuantity: current.maxQuantity,
            };

            // add filteredCurrent to the accumulator
            return [...accumulator, filteredCurrent];
        }
    }, []);

    return filteredReagents;
});
