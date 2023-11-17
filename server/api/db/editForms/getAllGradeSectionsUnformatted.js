import prisma from "~/server/db/prisma";

function sortDataByGradeAndSection(arr) {
    return arr.sort((a, b) => {
        // Compare by grade first
        if (a.grade !== b.grade) {
            return a.grade - b.grade;
        }
        // If grade is equal, compare by section
        return a.section.localeCompare(b.section);
    });
}

export default defineEventHandler(async () => {
    const allGradeSection = await prisma.gradeSection.findMany();
    const sortedGradeSection = sortDataByGradeAndSection(allGradeSection);

    return sortedGradeSection;
});
