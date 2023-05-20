import { getServerSession } from "#auth";

export default eventHandler(async (event) => {
    const session = await getServerSession(event);

    if (!session) {
        return { status: "unauthenticated" };
    }
    // Insert database login and stuff ?
    return session;
});
