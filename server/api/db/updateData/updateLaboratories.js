import prisma from "~/server/db/prisma";

export default defineEventHandler(async (event) => {
    const data = await readBody(event);

    if (data.changeType === "edit") {
        await prisma.laboratories.update({
            where: {
                id: data.change.id,
            },
            data: {
                name: data.change.name,
            },
        });
    } else if (data.changeType === "add") {
        await prisma.laboratories.create({
            data: {
                name: data.change.name,
            },
        });
    } else if (data.changeType === "delete") {
        await prisma.laboratories.delete({
            where: {
                id: data.change.id,
            },
        });
    }
    return null;
});
