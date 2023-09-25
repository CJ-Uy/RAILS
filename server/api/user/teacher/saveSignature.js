import prisma from "~/server/db/prisma";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    await prisma.teachers.update({
        where: {
            id: body.user.teachersId,
        },
        data: {
            signature: body.signature,
        },
    });

    return "SAVED";
});
