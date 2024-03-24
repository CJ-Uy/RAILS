import prisma from "~/server/db/prisma";

export default defineEventHandler(async (event) => {
    const newData = await readBody(event);

    return await prisma.units.delete({
        where: {
            id: newData.id,
        },
    });
});
