import prisma from "~/server/db/prisma";
import dayjs from "dayjs";

export default defineEventHandler(async () => {
    let allUsers = await prisma.users.findMany();
    for (let user of allUsers) {
        user.createdAt = dayjs(user.createdAt).format(
            "MMMM D, YYYY - HH:mm:ss",
        );
        user.updatedAt = dayjs(user.updatedAt).format(
            "MMMM D, YYYY - HH:mm:ss",
        );
    }

    return allUsers;
});
