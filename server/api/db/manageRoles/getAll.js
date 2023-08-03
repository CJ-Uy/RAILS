import prisma from "~/server/db/prisma";
import dayjs from "dayjs";

export default defineEventHandler(async () => {
    let allRoleRequests = await prisma.changeRoleRequests.findMany();

    for (const roleRequest of allRoleRequests) {
        const user = await prisma.users.findUnique({
            where: {
                id: roleRequest.userId,
            },
            select: {
                firstName: true,
                lastName: true,
                role: true,
            },
        });

        roleRequest.name = `${user.lastName}, ${user.firstName}`;
        roleRequest.currentRole = user.role;
        roleRequest.createdAt = dayjs(roleRequest.createdAt).format("MMMM D, YYYY - HH:mm:ss");
    }
    return allRoleRequests;
});
