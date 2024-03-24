import prisma from "~/server/db/prisma";

export default defineEventHandler(async (event) => {
    const newData = await readBody(event);
    if (newData.currentSchoolYear) {
        // Prisma query to find the SchoolYear with the largest yearEnd
        const maxYearEndSchoolYear = await prisma.schoolYear.findFirst({
            orderBy: {
                yearEnd: "desc",
            },
        });

        // Prisma query to update the currentSchoolYear to true for the found entry
        if (maxYearEndSchoolYear) {
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

    return await prisma.schoolYear.delete({
        where: {
            id: newData.id,
        },
    });
});
