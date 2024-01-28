import prisma from "../db/prisma.js";

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
            equipmentRequestsAdminApprover: {
                include: {
                    userProfile: true,
                },
            },
            materialRequestsAdminApprover: {
                include: {
                    userProfile: true,
                },
            },
            reagentRequestsAdminApprover: {
                include: {
                    userProfile: true,
                },
            },
            laboratoryReservationsAdminApprover: {
                include: {
                    userProfile: true,
                },
            },
            schoolYear: true,
        },
    });
}
