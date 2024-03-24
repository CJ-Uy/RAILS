import prisma from "~/server/db/prisma";

export default defineEventHandler(async (event) => {
    const newData = await readBody(event);

    return await prisma.laboratoryLocations.delete({
        where: {
            id: newData.id,
        },
    });
});
