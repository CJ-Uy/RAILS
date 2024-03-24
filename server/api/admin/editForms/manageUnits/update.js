import prisma from "~/server/db/prisma";

export default defineEventHandler(async (event) => {
    const newData = await readBody(event);

    // Get the old rank of the record to be updated
    const oldRecord = await prisma.units.findUnique({
        where: {
            id: newData.id,
        },
        select: {
            frequencyRank: true,
        },
    });

    const oldRank = oldRecord.frequencyRank;
    const newRank = newData.frequencyRank;

    // Temporarily remove the frequencyRank from the record being updated
    await prisma.units.update({
        where: { id: newData.id },
        data: { frequencyRank: 0 }, // or use a placeholder value
    });

    // Start a transaction to ensure atomic operations
    const result = await prisma.$transaction(async (prisma) => {
        if (oldRank < newRank) {
            // If the rank is increased, decrement the ranks of all records between the old and new ranks
            await prisma.units.updateMany({
                where: {
                    AND: [
                        { frequencyRank: { gt: oldRank } },
                        { frequencyRank: { lte: newRank } },
                    ],
                },
                data: {
                    frequencyRank: {
                        decrement: 1,
                    },
                },
            });
        } else if (oldRank > newRank) {
            // If the rank is decreased, increment the ranks of all records between the old and new ranks
            await prisma.units.updateMany({
                where: {
                    AND: [
                        { frequencyRank: { lt: oldRank } },
                        { frequencyRank: { gte: newRank } },
                    ],
                },
                data: {
                    frequencyRank: {
                        increment: 1,
                    },
                },
            });
        }

        // Update the record with the new rank
        return await prisma.units.update({
            where: {
                id: newData.id,
            },
            data: {
                name: newData.name,
                frequencyRank: newData.frequencyRank,
            },
        });
    });

    return result;
});
