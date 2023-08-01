import prisma from "~/server/db/prisma";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    await prisma.changeRoleRequests.create({
        data: {
            userId: body.userId,
            wantedRole: body.role,
        },
    });
});
