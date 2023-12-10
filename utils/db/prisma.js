import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default prisma;

/*
    Doing this is important because it allows us to use the same instance of 
    Prisma Client across our entire application. This is becaue everytime a 
    Prisma Client is initialized it creates several new connections to the
    database which in turn has a maximum number of possible connections only.
*/

/*
    Needed to make a seperate connection for utils for some reason. I could not 
    resolve the issue with trying to import the one from server. Additionally, If I
    kept the other util functions inside the server they would all run on start up
*/
