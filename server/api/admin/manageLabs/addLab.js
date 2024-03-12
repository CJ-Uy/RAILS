import prisma from "~/server/db/prisma";

export default defineEventHandler(async (event) => {
    const newData = await readBody(event);

    const locationId = await prisma.laboratoryLocations.findFirst({
        where: {
            name: newData.location,
        },
        select: {
            id: true,
        },
    });

    await prisma.laboratories.create({
        data: {
            name: newData.name,
            description: newData.description,
            location: {
                connect: {
                    id: locationId.id,
                },
            },
            hidden: newData.hidden,
        },
    });

    return "SUCCESS";
});
