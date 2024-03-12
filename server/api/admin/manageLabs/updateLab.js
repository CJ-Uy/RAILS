import prisma from "~/server/db/prisma";

export default defineEventHandler(async (event) => {
    const newData = await readBody(event);
    /*
    Values that can change:
        newData.name
        newData.description
        newData.location.name
        newData.hidden
    */
    const locationId = await prisma.laboratoryLocations.findFirst({
        where: {
            name: newData.location.name,
        },
        select: {
            id: true,
        },
    });

    await prisma.laboratories.update({
        where: {
            id: newData.id,
        },
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
});
