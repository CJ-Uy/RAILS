import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const materials = prisma.inventoryOfMaterials.createMany({
    data: [
        {
            itemName: "",
            description: "",
        }
    ],
});

console.log(materials);
