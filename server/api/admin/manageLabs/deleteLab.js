import prisma from "~/server/db/prisma";

export default defineEventHandler(async (event) => {
    const newData = await readBody(event);

    await prisma.laboratories.delete({
        where: {
            id: newData.id,
        },
    });
});
