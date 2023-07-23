import { prisma } from "~/server/db/prisma";

export default defineEventHandler(async () => {
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

    const allGradeSection = await prisma.gradeSection.findMany();
    const sortedGradeSection = sortDataByGradeAndSection(allGradeSection);
    const formatedGradeSection = [];
    for (const { grade, section } of sortedGradeSection) {
        const gradeSection = `${grade}-${section}`;
        formatedGradeSection.push(gradeSection);
    }
    return formatedGradeSection;
});
