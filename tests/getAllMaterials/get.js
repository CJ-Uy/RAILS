import prisma from "../../server/db/prisma.js";

const allMaterials = async () => {
    return await prisma.inventoryOfMaterials.findMany();
};

console.log(await allMaterials());
