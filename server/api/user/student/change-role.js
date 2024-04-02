import prisma from "~/server/db/prisma";
import Role from "~/server/db/role";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    let wantedRole;
    switch (body.role) {
        case "STUDENT":
            wantedRole = Role.STUDENT;
            break;
        case "TEACHER":
            wantedRole = Role.TEACHER;
            break;
        case "ADMIN":
            wantedRole = Role.ADMIN;
            break;
        default:
            throw new Error("Invalid role");
    }

    await prisma.changeRoleRequests.create({
        data: {
            userId: body.userId,
            wantedRole: wantedRole,
        },
    });
});
