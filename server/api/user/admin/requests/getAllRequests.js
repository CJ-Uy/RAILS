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
    const flatteningOptions = {
        safe: true, // This preserves all arrays
        delimiter: "-", // This is the chosen separator the default is "." and it has a weird interaction with NuxtLabsUI's table component always failing to be found
    };
    for (const request of allRequestsData) {
        const flattenedRequest = flatten(request, flatteningOptions);

        // This is a workaround to flatten "teacherInCharge-userProfile" key as it is always a single element array
        delete flattenedRequest["teacherInCharge-userProfile"];
        const teacherInChargeUserProfile =
            request.teacherInCharge.userProfile[0];
        for (const [key, value] of Object.entries(teacherInChargeUserProfile)) {
            flattenedRequest[`teacherInCharge-userProfile-${key}`] = value;
        }

        flattenedAllRequestsData.push(flattenedRequest);
    }

    return flattenedAllRequestsData;
});
