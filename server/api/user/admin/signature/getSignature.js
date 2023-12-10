import prisma from "~/server/db/prisma";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    try {
        const signature = await prisma.admins.findUnique({
            where: {
                id: body.adminsId,
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
        return [false, "No Admin Account Found"];
    }
});
