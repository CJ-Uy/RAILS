import prisma from "~/server/db/prisma";

export default defineEventHandler(async (event) => {
    const data = await readBody(event);

    if (data.changeType === "edit") {
        const temp = {
            ...(await prisma.units.findUnique({
                where: {
                    frequencyRank: Number(data.change.frequencyRank),
                },
            })),
        };
        await prisma.units.update({
            where: {
                id: temp.id,
            },
            data: {
                frequencyRank: -1,
            },
        });
        await prisma.units.update({
            where: {
                id: data.change.id,
            },
            data: {
                frequencyRank: Number(data.change.frequencyRank),
            },
        });
        await prisma.units.update({
            where: {
                id: temp.id,
            },
            data: {
                frequencyRank: data.origFrequencyRank,
            },
        });
    } else if (data.changeType === "add") {
        await prisma.units.create({
            data: {
                name: data.change.name,
            },
        });
    } else if (data.changeType === "delete") {
        await prisma.units.delete({
            where: {
                id: data.change.id,
            },
        });
    }
    return null;
});
