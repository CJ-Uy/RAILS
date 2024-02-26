import prisma from "~/server/db/prisma";

export default defineEventHandler(async (event) => {
    const newData = await readBody(event);

    // Oringal Truth
    const originalData = await prisma.users.findFirst({
        where: {
            id: newData.id,
        },
    });

    // ------ All ID UPDATES ------ //
    // --- Handle all ID Deletion Updates
    // TODO: Test this with accounts that cannot be deleted (also implement the warning screen for those and possible work arounds?)
    // Student ID
    if (newData.studentsId === null && originalData.studentsId !== null) {
        await prisma.students.delete({
            where: {
                id: originalData.studentsId,
            },
        });
    }

    // Teacher ID
    if (newData.teachersId === null && originalData.teachersId !== null) {
        await prisma.teachers.delete({
            where: {
                id: originalData.teachersId,
            },
        });
    }

    // Admin ID
    if (newData.adminsId === null && originalData.adminsId !== null) {
        await prisma.admins.delete({
            where: {
                id: originalData.adminsId,
            },
        });
    }

    // -- Edge case
    // when an admin switches a user from student to teacher then back to student leaving a teacher profile
    if (newData.role === "STUDENT" && originalData.teachersId !== null) {
        await prisma.teachers.delete({
            where: {
                id: originalData.teachersId,
            },
        });
    }
    // when an admin switches a user from any role to admin then back to student leaving a admin profile
    if (newData.role !== "ADMIN" && originalData.adminsId !== null) {
        await prisma.admins.delete({
            where: {
                id: originalData.adminsId,
            },
        });
    }

    // --- Handle all ID Creation Updates
    // Student ID
    if (
        newData.studentsId === "NEW STUDENT ID" &&
        originalData.studentsId === null
    ) {
        await prisma.students.create({
            data: {
                userProfile: {
                    connect: {
                        id: newData.id,
                    },
                },
            },
        });
    }

    // Teacher ID
    if (
        newData.teachersId === "NEW TEACHER ID" && // Check if the update request wants a new teacher ID
        originalData.teachersId === null && // Check if the user doesnt already have a teacher profile
        // Check if they have the roles to even use the teacher profile
        (newData.role === "TEACHER" || newData.role === "ADMIN")
    ) {
        await prisma.teachers.create({
            data: {
                userProfile: {
                    connect: {
                        id: newData.id,
                    },
                },
            },
        });
    }

    // Admin ID
    if (
        newData.adminsId === "NEW ADMIN ID" && // Check if the update request wants a new teacher ID
        originalData.adminsId === null && // Check if the user doesnt already have a teacher profile
        // Check if they have the roles to even use the teacher profile
        newData.role === "ADMIN"
    ) {
        await prisma.admins.create({
            data: {
                userProfile: {
                    connect: {
                        id: newData.id,
                    },
                },
            },
        });
    }

    // ------ All VALUE UPDATES ------ //
    await prisma.users.update({
        where: {
            id: newData.id,
        },
        data: {
            lastName: newData.lastName,
            firstName: newData.firstName,
            role: newData.role,
        },
    });

    // ------ DELETING USERS ----- //
    // Here's the idea, try to delete normally and if it doesnt work cause its connected to different values then to protect data
    // just change the email so that the user can no longer login and would have a fresh acount when logging in again

    return "SUCCESS";
});
