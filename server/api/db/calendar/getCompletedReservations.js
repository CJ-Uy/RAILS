import prisma from "~/server/db/prisma";

export default defineEventHandler(async () => {
    return await prisma.laboratoryReservations.findMany({
        where: {
            laboratoryRequest: {
                completeStatus: {
                    in: ["PENDING", "UNDERWAY"],
                },
                materialRequestsAdminApproval: "APPROVED",
                equipmentRequestsAdminApproval: "APPROVED",
                reagentRequestsAdminApproval: "APPROVED",
                laboratoryReservationsAdminApproval: "APPROVED",
                materialRequestsTeacherApproval: "APPROVED",
                equipmentRequestsTeacherApproval: "APPROVED",
                reagentRequestsTeacherApproval: "APPROVED",
                laboratoryReservationsTeacherApproval: "APPROVED",
            },
        },
        include: {
            laboratoryReserved: true,
            laboratoryRequest: {
                include: {
                    gradeSection: true,
                    unit: true,
                    teacherInCharge: true,
                },
            },
        },
    });
});
