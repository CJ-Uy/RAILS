import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const allReagents = await prisma.inventoryOfReagents.findMany({
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

const filteredReagents = allReagents.reduce((accumulator, current) => {
    // Check if the instance of the reagent is already in the accumulator by seeing if it has an index
    const index = accumulator.findIndex(
        (item) =>
            item.chemicalName === current.chemicalName &&
            item.description === current.description,
    );

    // If it is in the accumultor, add the quantity to the existing quantity adn the id to the ids array
    if (index !== -1) {
        accumulator[index].currentQuantity += current.currentQuantity;
        accumulator[index].maxQuantity += current.maxQuantity;
        accumulator[index].ids.push(current.id);
        return accumulator;
    } else {
        // filter current to only the fields we need
        const filteredCurrent = {
            chemicalName: current.chemicalName,
            description: current.description,
            unit: current.unit,
            currentQuantity: current.currentQuantity,
            maxQuantity: current.maxQuantity,
            ids: [current.id],
        };

        // add filteredCurrent to the accumulator
        return [...accumulator, filteredCurrent];
    }
}, []);

console.log(filteredReagents);
