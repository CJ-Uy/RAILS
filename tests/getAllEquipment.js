import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

    // TODO: set the quantity to the available quantity the day of the lab activity?
    const allEquipment = await prisma.InventoryOfEqupiment.findMany({
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

        // If it is in the accumultor, add the quantity to the existing quantity
        if (index !== -1) {
            accumulator[index].quantity += current.quantity;
            return accumulator;
        } else {
            // filter current to only the fields we need
            const filteredCurrent = {
                equipmentName: current.equipmentName,
                description: current.description,
                modelNoOrManufacturer: current.modelNoOrManufacturer,
                quantity: current.quantity,
            };

            // add filteredCurrent to the accumulator
            return [...accumulator, filteredCurrent];
        }
    }, []);

    console.log(filteredEquipment);
}

main();
