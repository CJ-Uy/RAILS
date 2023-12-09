import prisma from "~/server/db/prisma";
import SignedStatus from "~/server/db/signedStatus";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    return prisma.laboratoryRequests.update({
        where: {
            id: body.id,
        },
        data: {
            isSignedByTeacher: SignedStatus.REJECTED,
            signedTeacherId: null,
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
