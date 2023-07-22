import Prisma from "@prisma/client";

const { PrismaClient } = Prisma;

const prisma = new PrismaClient();

export { prisma };

/*
    Doing this is important because it allows us to use the same instance of 
    Prisma Client across our entire application. This is becaue everytime a 
    Prisma Client is initialized it creates several new connections to the
    database which in turn has a maximum number of possible connections only.
*/
