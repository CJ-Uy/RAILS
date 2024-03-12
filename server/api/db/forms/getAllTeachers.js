import prisma from "~/server/db/prisma";

export default defineEventHandler(async () => {
    const allTeachers = await prisma.teachers.findMany({
        where: {
            hidden: false,
        },
        select: {
            id: true,
            userProfile: {
                select: {
                    firstName: true,
                    lastName: true,
                },
            },
        },
    });

    // Sort teachers alphabetically by first name, then last name
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

    // Filter to only needed data
    const filteredTeachers = {};
    for (const teacher of sortedTeachers) {
        filteredTeachers[teacher.id] =
            `${teacher.userProfile[0].firstName} ${teacher.userProfile[0].lastName}`;
    }

    // Return the sorted teachers as an object with the teacher id as the key
    return filteredTeachers;
});
