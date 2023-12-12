import prisma from "~/server/db/prisma";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { user, signature } = body;

    if (user.role == "ADMIN") {
        const admin = await prisma.users.findUnique({
            where: { id: user.id },
            include: { adminProfile: true },
        });

        if (admin.adminProfile) {
            await prisma.admins.update({
                where: { id: admin.adminProfile.id },
                data: { signature },
            });
        } else {
            await prisma.admins.create({
                data: {
                    signature,
                    userProfile: {
                        connect: { id: user.id },
                    },
                },
            });
        }
    } else if (user.role == "TEACHER") {
        const teacher = await prisma.users.findUnique({
            where: { id: user.id },
            include: { teacherProfile: true },
        });

        if (teacher.teacherProfile) {
            await prisma.teachers.update({
                where: { id: teacher.teacherProfile.id },
                data: { signature },
            });
        } else {
            await prisma.teachers.create({
                data: {
                    signature,
                    userProfile: {
                        connect: { id: user.id },
                    },
                },
            });
        }
    }

    return "SAVED";
});
