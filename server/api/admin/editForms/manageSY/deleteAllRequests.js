import prisma from "~/server/db/prisma";

export default defineEventHandler(async (event) => {
    const newData = await readBody(event);

    await prisma.$transaction([
        // Delete related records in ReagentRequests first
        prisma.reagentRequests.deleteMany({
            where: { laboratoryRequestId: newData.id },
        }),
        // Then delete records in MaterialRequests that reference laboratoryRequestId
        prisma.materialRequests.deleteMany({
            where: { laboratoryRequestId: newData.id },
        }),
        // Then delete records in EquipmentRequests, and finally LaboratoryRequests
        prisma.equipmentRequests.deleteMany({
            where: { schoolYearId: newData.id },
        }),

        prisma.laboratoryRequests.deleteMany({
            where: { schoolYearId: newData.id },
        }),
    ]);

    return "DONE";
});
