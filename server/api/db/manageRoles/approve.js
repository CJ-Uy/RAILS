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
    if (wantedRole === Role.TEACHER) {
        await prisma.teachers.upsert({
            where: { userProfileId: body.userId },
            update: {},
            create: {
                userProfile: {
                    connect: { id: body.userId },
                },
            },
        });
    } else if (wantedRole === Role.STUDENT) {
        await prisma.students.upsert({
            where: { userProfileId: body.userId },
            update: {},
            create: {
                userProfile: {
                    connect: { id: body.userId },
                },
            },
        });
    } else if (wantedRole === Role.ADMIN) {
        await prisma.admins.upsert({
            where: { userProfileId: body.userId },
            update: {},
            create: {
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
