import prisma from "~/server/db/prisma";

export default defineEventHandler(async (event) => {
    const newData = await readBody(event);

    try {
        await prisma.inventoryOfEquipment.delete({
            where: {
                id: newData.id,
            },
        });
        return "DELETION SUCCESSFUL";
    } catch {
        await prisma.inventoryOfEquipment.update({
            where: {
                id: newData.id,
            },
            data: {
                hidden: true,
            },
        });
        return "DELETION FAILED; MARKED HIDDEN";
    }
});
