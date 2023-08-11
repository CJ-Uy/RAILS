import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/*
The argument of the request is how likely the request will be made.
(It's unlikely to ask for a reagent without equipment/materials and a laboratory reservation)
    1: Laboratory Reservation Request
    2: Equipment and Materials Request
    3: Reagents Request
*/

let body = { codes: [1, 2, 3] };

const schoolYear = await prisma.schoolYear.findFirst({
    where: {
        currentSchoolYear: true,
    },
});

const currentSchoolYear = `${schoolYear.yearStart}-${schoolYear.yearEnd}-`;

let controlNumbers = {};
for (const code of body.codes) {
    switch (code) {
        case 1:

            break;
        case 2:
            break;
        case 3:
            break;
    }
}
