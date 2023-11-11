import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const materials = await prisma.inventoryOfMaterials.createMany({
    data: [
        {
            itemName: "Acid Burette",
            description: "50 mL",
            classification: "Fragile",
            unit: "pcs",
            quantity: 21,
        },
        {
            itemName: "Alcohol Lamp",
            description: "",
            classification: "Fragile",
            unit: "pcs",
            quantity: 61,
        },
        {
            itemName: "Base Burrette",
            description: "50 mL",
            classification: "Fragile",
            unit: "pcs",
            quantity: 26,
        },

        {
            itemName: "Wood Stopper",
            description: "Large",
            classification: "Non-Fragile",
            unit: "pcs",
            quantity: 2,
        },
        {
            itemName: "Wood Stopper",
            description: "Medium",
            classification: "Non-Fragile",
            unit: "pcs",
            quantity: 64,
        },
        {
            itemName: "Wood Stopper",
            description: "Small",
            classification: "Non-Fragile",
            unit: "pcs",
            quantity: 1,
        },
        {
            itemName: "Roratary Evaporator Filter",
            description: "",
            classification: "Others",
            unit: "pcs",
            quantity: 1,
        },
        {
            itemName: "Water Pump",
            description: "",
            classification: "Others",
            unit: "pcs",
            quantity: 1,
        },
    ],
});

console.log(materials);
