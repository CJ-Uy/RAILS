import prisma from "~/server/db/prisma";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    return prisma.laboratoryRequests.update({
        where: {
            id: body.id,
        },
        data: {
            isSignedByTeacher: true,
            signedTeacherId: body.user.teachersId,
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
