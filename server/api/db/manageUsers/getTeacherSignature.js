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
            return "No Saved Signature";
        }

        return signature;
    } catch (error) {
        return "No Teacher Account Found";
    }
});
