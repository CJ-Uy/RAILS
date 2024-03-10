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
    // Update Role
    await prisma.users.update({
        where: {
            id: newData.id,
        },
        data: {
            firstName: newData.firstName,
            lastName: newData.lastName,
            role: newData.role,
        },
    });

    async function updateProfile(status, profileName) {
        const profileId = originalData[`${profileName.toLowerCase()}Id`];
        if (profileId) {
            if (status === "ACTIVE" || status === "INACTIVE") {
                await prisma[profileName].update({
                    where: { id: profileId },
                    data: { hidden: status === "INACTIVE" },
                });
            } else if (status === "DELETE") {
                try {
                    await prisma[profileName].delete({
                        where: { id: profileId },
                    });
                } catch {
                    updateProfile("INACTIVE", profileName);
                }
            }
        } else if (
            !profileId &&
            (status === "ACTIVE" || status === "INACTIVE")
        ) {
            await prisma[profileName].create({
                data: {
                    userProfile: { connect: { id: newData.id } },
                    hidden: status === "INACTIVE",
                },
            });
        }
    }

    // Update Profiles
    updateProfile(newData.studentProfileStatus, "students");
    updateProfile(newData.teacherProfileStatus, "teachers");
    updateProfile(newData.adminProfileStatus, "admins");

    // Previous ID management
    // --- Handle all ID Deletion Updates
    // Student ID
    // if (newData.studentsId === null && originalData.studentsId !== null) {
    //     await prisma.students.delete({
    //         where: {
    //             id: originalData.studentsId,
    //         },
    //     });
    // }

    // // Teacher ID
    // if (newData.teachersId === null && originalData.teachersId !== null) {
    //     await prisma.teachers.delete({
    //         where: {
    //             id: originalData.teachersId,
    //         },
    //     });
    // }

    // // Admin ID
    // if (newData.adminsId === null && originalData.adminsId !== null) {
    //     await prisma.admins.delete({
    //         where: {
    //             id: originalData.adminsId,
    //         },
    //     });
    // }

    // // -- Edge case
    // // when an admin switches a user from student to teacher then back to student leaving a teacher profile
    // if (newData.role === "STUDENT" && originalData.teachersId !== null) {
    //     await prisma.teachers.delete({
    //         where: {
    //             id: originalData.teachersId,
    //         },
    //     });
    // }
    // // when an admin switches a user from any role to admin then back to student leaving a admin profile
    // if (newData.role !== "ADMIN" && originalData.adminsId !== null) {
    //     await prisma.admins.delete({
    //         where: {
    //             id: originalData.adminsId,
    //         },
    //     });
    // }

    // // --- Handle all ID Creation Updates
    // // Student ID
    // if (
    //     newData.studentsId === "NEW STUDENT ID" &&
    //     originalData.studentsId === null
    // ) {
    //     await prisma.students.create({
    //         data: {
    //             userProfile: {
    //                 connect: {
    //                     id: newData.id,
    //                 },
    //             },
    //         },
    //     });
    // }

    // // Teacher ID
    // if (
    //     newData.teachersId === "NEW TEACHER ID" && // Check if the update request wants a new teacher ID
    //     originalData.teachersId === null && // Check if the user doesnt already have a teacher profile
    //     // Check if they have the roles to even use the teacher profile
    //     (newData.role === "TEACHER" || newData.role === "ADMIN")
    // ) {
    //     await prisma.teachers.create({
    //         data: {
    //             userProfile: {
    //                 connect: {
    //                     id: newData.id,
    //                 },
    //             },
    //         },
    //     });
    // }

    // // Admin ID
    // if (
    //     newData.adminsId === "NEW ADMIN ID" && // Check if the update request wants a new teacher ID
    //     originalData.adminsId === null && // Check if the user doesnt already have a teacher profile
    //     // Check if they have the roles to even use the teacher profile
    //     newData.role === "ADMIN"
    // ) {
    //     await prisma.admins.create({
    //         data: {
    //             userProfile: {
    //                 connect: {
    //                     id: newData.id,
    //                 },
    //             },
    //         },
    //     });
    // }

    // // ------ All VALUE UPDATES ------ //
    // await prisma.users.update({
    //     where: {
    //         id: newData.id,
    //     },
    //     data: {
    //         lastName: newData.lastName,
    //         firstName: newData.firstName,
    //         role: newData.role,
    //     },
    // });

    return "SUCCESS";
});
