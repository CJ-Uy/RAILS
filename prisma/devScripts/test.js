import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
    const allGradeSection = await prisma.gradeSection.findMany();
    console.log(allGradeSection);
    await prisma.$disconnect();
};

main();