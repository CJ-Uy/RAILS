import prisma from "~/server/db/prisma";

export default defineEventHandler(async () => {
    return await prisma.laboratoryLocations.findMany({
        where: {
            hidden: false,
        },
    });
});
