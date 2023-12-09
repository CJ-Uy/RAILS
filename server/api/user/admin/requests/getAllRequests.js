import { flatten } from "flat";
import prisma from "~/server/db/prisma";

export default defineEventHandler(async () => {
    const allRequestsData = await prisma.laboratoryRequests.findMany({
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

    const flattenedAllRequestsData = [];
    for (const request of allRequestsData) {
        flattenedAllRequestsData.push(flatten(request));
    }

    return flattenedAllRequestsData;
});
