import prisma from "~/server/db/prisma";

function sortDataByFrequencyAndUnit(arr) {
    return arr.sort((a, b) => {
        // Compare by grade first
        if (a.frequencyRank !== b.frequencyRank) {
            return a.frequencyRank - b.frequencyRank;
        }
        // If grade is equal, compare by section
        return a.name.localeCompare(b.name);
    });
}

export default defineEventHandler(async () => {
    const allUnits = await prisma.units.findMany();
    const sortedUnits = sortDataByFrequencyAndUnit(allUnits);

    return sortedUnits;
});
