import { PrismaClient } from "@prisma/client";
import { getServerSession } from "#auth";
const prisma = new PrismaClient();

export default eventHandler(async (event) => {
    const session = await getServerSession(event);

    if (!session) {
        return { status: "unauthenticated" };
    }

    // Database logic
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
    console.log(`${session.user?.name} has logged in!`);
    return session;
});
