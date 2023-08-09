import prisma from "~/server/db/prisma";

export default defineEventHandler(async () => {
    const allTeachers = await prisma.teachers.findMany({
        select: {
            id: true,
            userProfile: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                },
            },
        },
    });

    const sortedTeachers = allTeachers.sort((a, b) => {
        if (a.userProfile[0].firstName < b.userProfile[0].firstName) {
            return -1;
        }
        if (a.userProfile[0].firstName > b.userProfile[0].firstName) {
            return 1;
        }
        if (a.userProfile[0].lastName < b.userProfile[0].lastName) {
            return -1;
        }
        if (a.userProfile[0].lastName > b.userProfile[0].lastName) {
            return 1;
        }
        return 0;
    });

    // Return the sorted teachers as an object with the teacher id as the key
    return sortedTeachers.reduce((acc, teacher) => {
        acc[teacher.id] = teacher;
        return acc;
    }, {});

});
