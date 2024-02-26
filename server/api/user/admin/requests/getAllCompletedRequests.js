import { flatten } from "flat";
import dayjs from "dayjs";
import prisma from "~/server/db/prisma";

export default defineEventHandler(async (event) => {
    const data = await readBody(event);
    const allRequestsData = await prisma.laboratoryRequests.findMany({
        where: {
            completeStatus: "COMPLETED",
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

    const flattenedAllRequestsData = [];
    const flatteningOptions = {
        safe: true, // This preserves all arrays
        delimiter: "-", // This is the chosen separator the default is "." and it has a weird interaction with NuxtLabsUI's table component always failing to be found
    };
    for (const request of allRequestsData) {
        const flattenedRequest = flatten(request, flatteningOptions);

        flattenedRequest.createdAt = dayjs(flattenedRequest.createdAt).format(
            "MMM DD, YYYY - HH:mm",
        );

        flattenedRequest.updatedAt = dayjs(flattenedRequest.updatedAt).format(
            "MMM DD, YYYY - HH:mm",
        );

        // The following block are workarounds to flatten the objects inside always single element arrays
        // teacherInChare.userProfile[0]
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
