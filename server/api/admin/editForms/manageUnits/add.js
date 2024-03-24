import prisma from "~/server/db/prisma";

export default defineEventHandler(async (event) => {
    const newData = await readBody(event);

    // If frequencyRank is not provided, assign it to the last
    if (!newData.frequencyRank) {
        const maxRankRecord = await prisma.units.findFirst({
            orderBy: {
                frequencyRank: "desc",
            },
            select: {
                frequencyRank: true,
            },
        });

        newData.frequencyRank = maxRankRecord
            ? maxRankRecord.frequencyRank + 1
            : 1;
    } else {
        // Get all records that have a rank equal to or greater than the new record, ordered by rank in descending order
        const recordsToUpdate = await prisma.units.findMany({
            where: {
                frequencyRank: {
                    gte: newData.frequencyRank,
                },
            },
            orderBy: {
                frequencyRank: "desc",
            },
            select: {
                id: true,
            },
        });

        // Update the ranks of these records one by one
        for (const record of recordsToUpdate) {
            await prisma.units.update({
                where: {
                    id: record.id,
                },
                data: {
                    frequencyRank: {
                        increment: 1,
                    },
                },
            });
        }
    }

    // Insert the new record
    return await prisma.units.create({
        data: newData,
    });
});
