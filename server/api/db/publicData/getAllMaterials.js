import prisma from "~/server/db/prisma";

export default defineEventHandler(async () => {
    return await prisma.inventoryOfMaterials.findMany({
        where: {
            hidden: false,
        },
        include: {
            location: true,
            laboratories: true,
            schoolYear: true,
        },
    });
});
