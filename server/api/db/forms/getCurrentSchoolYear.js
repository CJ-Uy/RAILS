import prisma from "~/server/db/prisma";

export default defineEventHandler(async () => {
    const schoolYear = await prisma.schoolYear.findFirst({
        where: {
            currentSchoolYear: true,
        },
        select: {
            id: true,
            yearStart: true,
            yearEnd: true,
        },
    });

    return {
        [schoolYear.id]: `${schoolYear.yearStart} - ${schoolYear.yearEnd}`,
    };
});
