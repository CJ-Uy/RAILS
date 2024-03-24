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

    // Update User Role
    await prisma.users.update({
        where: {
            id: body.userId,
        },
        data: {
            role: wantedRole,
        },
    });

    // Create their ROLE Profile
    const user = await prisma.users.findUnique({
        where: { id: body.userId },
        select: { teacherProfile: true, adminProfile: true },
    });
    if (wantedRole === Role.TEACHER && !user.teacherProfile) {
        await prisma.teachers.create({
            data: {
                userProfile: {
                    connect: { id: body.userId },
                },
            },
        });
    } else if ((wantedRole === Role.ADMIN) && !user.adminProfile) {
        await prisma.admins.create({
            data: {
                userProfile: {
                    connect: { id: body.userId },
                },
            },
        });
    }

    // Delete Change Role Request
    await prisma.changeRoleRequests.delete({
        where: {
            id: body.id,
        },
    });

    return "CHANGED ROLE";
});
