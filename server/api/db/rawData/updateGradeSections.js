import prisma from "~/server/db/prisma";

export default defineEventHandler(async (event) => {
    const data = await readBody(event);

    if (data.changeType === "edit") {
        await prisma.gradeSection.update({
            where: {
                id: data.change.id,
            },
            data: {
                grade: Number(data.change.grade),
                section: data.change.section,
            },
        });
    } else if (data.changeType === "add") {
        await prisma.gradeSection.create({
            data: {
                grade: Number(data.change.grade),
                section: data.change.section,
            },
        });
    } else if (data.changeType === "delete") {
        await prisma.gradeSection.delete({
            where: {
                id: data.change.id,
            },
        });
    }
    return null;
});
