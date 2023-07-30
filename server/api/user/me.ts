import prisma from "~/server/db/prisma";
import { getServerSession } from "#auth";

export default eventHandler(async (event) => {
    const session = await getServerSession(event);

    if (!session) {
        return { status: "unauthenticated" };
    }

    // Database logic
    /*
        TODO: Add the secret button to login page to allow admins to login through username and password
    */
    const userInDatabase = await prisma.users.findFirst({
        where: {
            email: session.user.email,
        },
    });

    if (userInDatabase) {
        // User already exists in the database
        if (
            session.given_name !== userInDatabase.firstName ||
            session.family_name !== userInDatabase.lastName
        ) {
            // Old user with the same email gets their email set to revoked
            await prisma.users.update({
                where: { id: userInDatabase.id },
                data: { email: "REVOKED EMAIL" },
            });

            // Create a new user
            return await prisma.users.create({
                data: {
                    email: session.user?.email,
                    imageLink: session.user?.image,
                    firstName: session.given_name,
                    lastName: session.family_name,
                    studentProfile: { create: {} },
                },
            });
        }

        // Return the current existing user if their first and last names match
        else {
            return userInDatabase;
        }
    }

    // Completely new user (no conflicting emails)
    else {
        // Create a new user
        return await prisma.users.create({
            data: {
                email: session.user?.email,
                imageLink: session.user?.image,
                firstName: session.given_name,
                lastName: session.family_name,
                studentProfile: { create: {} },
            },
        });
    }
});

// import { getToken } from "#auth";

// export default eventHandler((event) => getToken({ event }));
