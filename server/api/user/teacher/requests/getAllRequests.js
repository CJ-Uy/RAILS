import prisma from "~/server/db/prisma";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    return prisma.laboratoryRequests.findMany({
        where: {
            teacherInChargeId: body.teacherId,
        },
        include: {
            requestor: true,
            gradeSection: true,
            materialsRequested: true,
            reagentsRequested: true,
            equipmentRequested: true,
            teacherInCharge: true,
            laboratoryReservations: true,
            signedTeacher: true,
            signedAdmin: true,
            schoolYear: true,
        },
    });
});
