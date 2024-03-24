import prisma from "~/server/db/prisma";

export default defineEventHandler(async () => {
    const allLaboratories = await prisma.laboratories.findMany({
        where: {
            hidden: false,
        },
        select: {
            id: true,
            createdAt: true,
            updatedAt: true,
            name: true,
            description: true,
            location: true,
            supplies: true,
            equipment: true,
            reagents: true,
            laboratoryReservations: true,
            hidden: true,
        },
    });
    return allLaboratories;
});
