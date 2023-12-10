import prisma from "~/server/db/prisma";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    try {
        await prisma.admins.update({
            where: {
                id: body.user.adminsId,
            },
            data: {
                signature: null,
            },
        });

        return "Successfully Deleted";
    } catch (error) {
        return error;
    }
});
