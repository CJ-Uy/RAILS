import { PrismaClient } from "@prisma/client";
import { flatten } from "flat";

const prisma = new PrismaClient();

function flattenObject(obj) {
    // Initialize empty object for flattened key-value pairs.
    const toReturn = {};

    // Loop through each property in the object.
    for (const key in obj) {
        // Skip non-own properties (inherited from prototype).
        if (!Object.hasOwn(obj, key)) continue;

        const value = obj[key];

        // Recursively flatten nested objects.
        if (typeof value === "object" && value !== null) {
            const flatObject = flattenObject(value);

            // Combine and add flattened key-value pairs.
            for (const nestedKey in flatObject) {
                toReturn[`${key}.${nestedKey}`] = flatObject[nestedKey];
            }
        } else {
            // Add non-nested key-value pair.
            toReturn[key] = value;
        }
    }

    // Return the final flattened object.
    return toReturn;
}

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

console.dir(flatten(allRequestsData[0]), { depth: null });
