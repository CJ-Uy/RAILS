import prisma from "~/server/db/prisma";

export default defineEventHandler(async (event) => {
    const data = await readBody(event);

    await prisma.notifications.create({
        data: {
            message: data.message,
            userId: data.requestorId,
            redirect: data.redirect,
        },
    });
});
