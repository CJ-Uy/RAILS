import { flatten } from "flat";
import dayjs from "dayjs";
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
        // signedTeacher-userProfile[0]
        if (request.signedTeacher) {
            delete flattenedRequest["signedTeacher-userProfile"];
            const signedTeacherUserProfile =
                request.signedTeacher.userProfile[0];
            for (const [key, value] of Object.entries(
                signedTeacherUserProfile,
            )) {
                flattenedRequest[`signedTeacher-userProfile-${key}`] = value;
            }
        }
        // signedAdmin-userProfile[0]
        // TODO: test this
        if (request.signedAdmin) {
            delete flattenedRequest["signedAdmin-userProfile"];
            const signedAdminUserProfile = request.signedAdmin.userProfile[0];
            for (const [key, value] of Object.entries(signedAdminUserProfile)) {
                flattenedRequest[`signedAdmin-userProfile-${key}`] = value;
            }
        }

        flattenedAllRequestsData.push(flattenedRequest);
    }
    return flattenedAllRequestsData;
});
