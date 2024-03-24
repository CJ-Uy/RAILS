import prisma from "~/server/db/prisma";

export default defineEventHandler(async (event) => {
    const newData = await readBody(event);
    if (newData.currentSchoolYear) {
        // If we want to set the currentSchoolYear to true, we need to set all other SchoolYears to false
        await prisma.schoolYear.updateMany({
            where: {
                currentSchoolYear: true,
            },
            data: {
                currentSchoolYear: false,
            },
        });
    } else {
        // If it was originally true but now is false we need to set the next SchoolYear to true
        const oldData = await prisma.schoolYear.findUnique({
            where: {
                id: newData.id,
            },
        });
        if (oldData.currentSchoolYear) {
            // Prisma query to find the SchoolYear with the largest yearEnd
            const maxYearEndSchoolYear = await prisma.schoolYear.findFirst({
                orderBy: {
                    yearEnd: "desc",
                },
            });

            // Prisma query to update the currentSchoolYear to true for the found entry
            await prisma.schoolYear.update({
                where: {
                    id: maxYearEndSchoolYear.id,
                },
                data: {
                    currentSchoolYear: true,
                },
            });
        }
    }
    return await prisma.schoolYear.update({
        where: {
            id: newData.id,
        },
        data: {
            ...newData,
        },
    });
});
