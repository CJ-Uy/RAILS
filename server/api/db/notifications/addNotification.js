import prisma from "~/server/db/prisma";

export default defineEventHandler(async (event) => {
    const data = await readBody(event);

    if (data.notificationType === "teacherApprove") {
        await prisma.notifications.create({
            data: {
                message: "Your request has been approved by your teacher.",
                userId: data.requestorId,
            },
        });
    } else if (data.notificationType === "teacherDecline") {
        await prisma.notifications.create({
            data: {
                message: "Your request has been declined by your teacher.",
                userId: data.requestorId,
            },
        });
    }
});
