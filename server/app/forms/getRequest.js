import prisma from "~/server/db/prisma.js";

export default async function getRequest(id) {
    return await prisma.laboratoryRequests.findUnique({
        where: {
            id: id.id,
        },
        select: {
            createdAt: true,
            forSubject: true,
            concurrentTopic: true,
            noOfStudents: true,
            otherGroupMembers: true,
            independentTime: true,
            independentLocation: true,

            schoolYear: {
                select: {
                    yearStart: true,
                    yearEnd: true,
                    campus: true,
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

            laboratoryReservations: {
                select: {
                    controlNumber: true,
                    startTime: true,
                    endTime: true,
                    laboratoryReserved: {
                        select: {
                            name: true,
                        },
                    },
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
