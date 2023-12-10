import prisma from "~/server/db/prisma";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    try {
        const signature = await prisma.teachers.findUnique({
            where: {
                id: body.teachersId,
            },
            select: {
                signature: true,
            },
        });

        if (signature.signature === null) {
            return [false, "No Saved Signature"];
        }

        return [true, signature];
    } catch (error) {
        return [false, "No Teacher Account Found"];
    }
});
