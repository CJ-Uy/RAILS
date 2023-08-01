import prisma from "~/server/db/prisma";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    await prisma.changeRoleRequests.delete({
        where: {
            id: body,
        }
    });
    return "DELETED";
});
