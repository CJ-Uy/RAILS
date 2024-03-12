import dayjs from "dayjs";
import prisma from "~/server/db/prisma";

export default defineEventHandler(async () => {
    const allUsers = await prisma.users.findMany({
        include: {
            studentProfile: true,
            teacherProfile: true,
            adminProfile: true,
        },
    });
    for (const user of allUsers) {
        user.createdAt = dayjs(user.createdAt).format(
            "MMMM D, YYYY - HH:mm:ss",
        );
        user.updatedAt = dayjs(user.updatedAt).format(
            "MMMM D, YYYY - HH:mm:ss",
        );
    }

    return allUsers;
});
