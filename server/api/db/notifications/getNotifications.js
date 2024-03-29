import prisma from "~/server/db/prisma";

export default defineEventHandler(async (event) => {
    const data = await readBody(event);

    return await prisma.notifications.findMany({
        where: {
            userId: data.userId,
        },
    });
});
