import prisma from "~/server/db/prisma";

export default defineEventHandler(async () => {
    return await prisma.laboratoryReservations.findMany({
        where: {
            laboratoryRequest: {
                isSignedByAdmin: "APPROVED",
                isSignedByTeacher: "APPROVED",
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
