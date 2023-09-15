import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

function multipleItems({
    name = "",
    description = "",
    classification = "",
    unit = "",
    quantity = 0,
} = {}) {
    let items = [];
    for (let i = 0; i < quantity; i++) {
        items.push({
            itemName: name,
            description: description,
            classification: classification,
            unit: unit,
            code: `${name}-${(i + 1).toString().padStart(2, "0")}`,
        });
    }
    return items;
}

const materials = await prisma.inventoryOfMaterials.createMany({
    data: [
        ...multipleItems({
            name: "Acid Burette",
            description: "50 mL",
            classification: "Fragile",
            unit: "pcs",
            quantity: 21,
        }),
        ...multipleItems({
            name: "Alcohol Lamp",
            description: "",
            classification: "Fragile",
            unit: "pcs",
            quantity: 61,
        }),
        ...multipleItems({
            name: "Base Burrette",
            description: "50 mL",
            classification: "Fragile",
            unit: "pcs",
            quantity: 26,
        }),

        ...multipleItems({
            name: "Wood Stopper",
            description: "Large",
            classification: "Non-Fragile",
            unit: "pcs",
            quantity: 2,
        }),
        ...multipleItems({
            name: "Wood Stopper",
            description: "Medium",
            classification: "Non-Fragile",
            unit: "pcs",
            quantity: 64,
        }),
        ...multipleItems({
            name: "Wood Stopper",
            description: "Small",
            classification: "Non-Fragile",
            unit: "pcs",
            quantity: 1,
        }),
        ...multipleItems({
            name: "Roratary Evaporator Filter",
            description: "",
            classification: "Others",
            unit: "pcs",
            quantity: 1,
        }),
        ...multipleItems({
            name: "Water Pump",
            description: "",
            classification: "Others",
            unit: "pcs",
            quantity: 1,
        }),
    ],
});

console.log(materials);
