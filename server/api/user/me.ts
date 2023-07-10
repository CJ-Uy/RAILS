import { PrismaClient } from "@prisma/client";
import { getServerSession } from "#auth";
const prisma = new PrismaClient();

export default eventHandler(async (event) => {
    const session = await getServerSession(event);

    if (!session) {
        return { status: "unauthenticated" };
    }

    // Database logic
    /*
        TODO: Check if the email already exists but is under a different name if so change the email of the previous account and store the new one
        TODO: Check for the ROLE of the user here or on auth metaheads (add ROLE to the return of session)
        TODO: Add the secret button to login page to allow admins to login through username and password
    */
    const user = await prisma.users.upsert({
        where: {
            email: session.user.email,
        },
        update: {},
        create: {
            email: session.user?.email,
            imageLink: session.user?.image,
            firstName: session.given_name,
            lastName: session.family_name,
        },
    });
    // console.log(`${JSON.stringify(user)}`);
    return user;
});
