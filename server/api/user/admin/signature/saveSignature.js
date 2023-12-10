import prisma from "~/server/db/prisma";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    await prisma.admins.update({
        where: {
            id: body.user.adminsId,
        },
        data: {
            signature: body.signature,
        },
    });

    return "SAVED";
});
