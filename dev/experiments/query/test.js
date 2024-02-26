import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const request = await prisma.laboratoryRequests.findUnique({
    where: {
        id: "f80c5064-0549-48c3-9c09-ef670efa81e8",
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

console.dir(request, { depth: null });
