import prisma from "~/server/db/prisma";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    
    console.log("body: ", body);

    return "SAVED";
});
