import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const request = await prisma.laboratoryRequests.findUnique({
    where: {
        id: "97e87157-361e-427e-9896-26047559abbc",
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
        schoolYear: true,
    },
});

console.log(request);
