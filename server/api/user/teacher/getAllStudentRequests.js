import prisma from "~/server/db/prisma";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    return prisma.laboratoryRequests.findMany({
        where: {
            teacherInChargeId: body.teacherId,
        },
    });
});
