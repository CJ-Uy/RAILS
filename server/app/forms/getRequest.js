// import prisma from "~/server/db/prisma.js";
import prisma from "../../db/prisma.js"

export default async function getRequest(id) {
    return await prisma.laboratoryRequests.findUnique({
        where: {
            id: id,
        },
        select: {
            createdAt: true,
            forSubject: true,
            concurrentTopic: true,
            otherGroupMembers: true,
            
            schoolYear: {
                select: {
                    yearStart: true,
                    yearEnd: true,
                },
            },

            requestor: {
                select: {
                    firstName: true,
                    lastName: true,
                },
            },

            gradeSection: {
                select: {
                    grade: true,
                    section: true,
                },
            },

            unit: {
                select: {
                    name: true,
                },
            },

            teacherInCharge: {
                select: {
                    userProfile: {
                        select: {
                            firstName: true,
                            lastName: true,
                        },
                    },
                },
            },

            // Requests
            materialsRequested: {
                select: {
                    controlNumber: true,
                    quantity: true,
                    name: true,
                    description: true,
                },
            },

            equipmentRequested: {
                select: {
                    controlNumber: true,
                    quantity: true,
                    name: true,
                    description: true,
                },
            },

            reagentsRequested: {
                select: {
                    controlNumber: true,
                    quantity: true,
                    name: true,
                    description: true,
                },
            },

            isSignedByTeacher: true,
            signedTeacher: {
                select: {
                    signature: true,
                    userProfile: {
                        select: {
                            firstName: true,
                            lastName: true,
                        },
                    },
                },
            },
            isSignedByAdmin: true,
            signedAdmin: {
                select: {
                    signature: true,
                    userProfile: {
                        select: {
                            firstName: true,
                            lastName: true,
                        },
                    },
                },
            },
        },
    });
}
