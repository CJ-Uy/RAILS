import prisma from "~/server/db/prisma";
import Role from "~/server/db/role";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    let wantedRole;
    switch (body.newRole) {
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

    await prisma.users.update({
        where: {
            id: body.userId,
        },
        data: {
            role: wantedRole,
        },
    });

    await prisma.changeRoleRequests.delete({
        where: {
            id: body.id,
        },
    });

    return "CHANGED ROLE";
});
