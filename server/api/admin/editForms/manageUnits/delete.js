import prisma from "~/server/db/prisma";

export default defineEventHandler(async (event) => {
    const newData = await readBody(event);

    // Get the rank of the record to be deleted
    const deletedRecord = await prisma.units.findUnique({
        where: {
            id: newData.id,
        },
        select: {
            frequencyRank: true,
        },
    });

    // Delete the record
    await prisma.units.delete({
        where: {
            id: newData.id,
        },
    });

    // Update the ranks of all records that have a higher rank than the deleted record
    if (deletedRecord) {
        await prisma.units.updateMany({
            where: {
                frequencyRank: {
                    gt: deletedRecord.frequencyRank,
                },
            },
            data: {
                frequencyRank: {
                    decrement: 1,
                },
            },
        });
    }

    return deletedRecord;
});
