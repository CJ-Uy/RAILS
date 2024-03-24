import prisma from "~/server/db/prisma";

export default defineEventHandler(async (event) => {
    const newData = await readBody(event);
    return await prisma.gradeSection.update({
        where: {
            id: newData.id,
        },
        data: {
            name: newData.name,
            grade: newData.grade,
            section: newData.section,
            hidden: newData.hidden,
        },
    });
});
