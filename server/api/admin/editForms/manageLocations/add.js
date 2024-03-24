import prisma from "~/server/db/prisma";

export default defineEventHandler(async (event) => {
    const newData = await readBody(event);

    return await prisma.laboratoryLocations.create({
        data: {
            name: newData.name,
            description: newData.description,
            hidden: newData.hidden,
        },
    });
});
