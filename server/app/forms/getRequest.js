import prisma from "~/server/db/prisma.js";

export default async function getRequest(id) {
    return await prisma.laboratoryRequests.findUnique({
        where: {
            id: id.id,
        },
        include: {
            requestor: true,
            gradeSection: true,
            unit: true,
            teacherInCharge: {
                include: {
                    userProfile: true,
                },
            },
            materialsRequested: true,
            equipmentRequested: true,
            reagentsRequested: true,
            laboratoryReservations: {
                include: {
                    laboratoryReserved: true,
                    laboratoryRequest: true,
                },
            },
            signedTeacher: {
                include: {
                    userProfile: true,
                },
            },
            signedAdmin: {
                include: {
                    userProfile: true,
                },
            },
            schoolYear: true,
        },
    });
}
