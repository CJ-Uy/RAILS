import prisma from "~/server/db/prisma";

export default defineEventHandler(async (event) => {
    const newData = await readBody(event);

    if (newData.currentSchoolYear) {
        // Update the current school year to false
        await prisma.schoolYear.updateMany({
            where: {
                currentSchoolYear: true,
            },
            data: {
                currentSchoolYear: false,
            },
        });
    }

    // Create the New School Year
    await prisma.schoolYear.create({
        data: {
            ...newData,
        },
    });
});
