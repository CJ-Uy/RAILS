import prisma from "~/server/db/prisma";

export default defineEventHandler(async (event) => {
    const data = await readBody(event);

    console.log(data);

    return await prisma.laboratories.findFirst({
        where: {
            name: data.labName,
        },
        select: {
            colorCode: true,
        },
    });
});
