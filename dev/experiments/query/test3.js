import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const allRequestsData = await prisma.laboratoryRequests.findMany({
    where: {
        completeStatus: { in: ["CLEARED", "NOT_CLEARED"] },
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
            },
        },
        schoolYear: true,
    },
});

console.log(allRequestsData);
