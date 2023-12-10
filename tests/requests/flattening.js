import { PrismaClient } from "@prisma/client";
import { flatten } from "flat";

const prisma = new PrismaClient();

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
    safe: true,
    delimiter: "-",
};
for (const request of allRequestsData) {
    const flattenedRequest = flatten(request, flatteningOptions);

    delete flattenedRequest["teacherInCharge-userProfile"];

    const teacherInChargeUserProfile = request.teacherInCharge.userProfile[0];
    for (const [key, value] of Object.entries(teacherInChargeUserProfile)) {
        flattenedRequest[`teacherInCharge-userProfile-${key}`] = value;
    }

    flattenedAllRequestsData.push(flattenedRequest);
}

console.log(flattenedAllRequestsData);

