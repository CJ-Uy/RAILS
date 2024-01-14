import prisma from "~/server/db/prisma";

export default defineEventHandler(async (event) => {
    const data = await readBody(event);

    await prisma.notifications.update({
        where: {
            id: data.notificationId,
        },
        data: {
            isRead: true,
        },
    });
});
