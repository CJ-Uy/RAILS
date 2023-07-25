import { prisma } from "~/server/db/prisma";

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
    const allGradeSection = await prisma.GradeSection.findMany();

    const sortedGradeSection = sortDataByGradeAndSection(allGradeSection);

    const formatedGradeSection = {};
    for (const { id, grade, section } of sortedGradeSection) {
        const gradeSection = `${grade}-${section}`;
        formatedGradeSection[id] = gradeSection;
    }

    return formatedGradeSection;
});
