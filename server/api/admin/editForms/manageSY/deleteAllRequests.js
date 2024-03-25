import prisma from "~/server/db/prisma";

export default defineEventHandler(async (event) => {
    const newData = await readBody(event);

    await prisma.$transaction([
        prisma.laboratoryReservations.deleteMany({
            where: { laboratoryRequestId: newData.id },
        }),
        prisma.reagentRequests.deleteMany({
            where: { laboratoryRequestId: newData.id },
        }),
        prisma.materialRequests.deleteMany({
            where: { laboratoryRequestId: newData.id },
        }),
        prisma.equipmentRequests.deleteMany({
            where: { schoolYearId: newData.id },
        }),

        prisma.laboratoryRequests.deleteMany({
            where: { schoolYearId: newData.id },
        }),
    ]);

    return "DONE";
});
