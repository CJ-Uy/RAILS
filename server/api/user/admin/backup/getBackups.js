import { backup } from "@vorlefan/prisma-backup";
import { BackupModels } from "@vorlefan/prisma-backup/dist/types/backup";
import prisma from "~/server/db/prisma";

const [user] = await prisma.$transaction([prisma.user.findMany({})]);

// w/out encrypt

await runBackup({
    models: {
        user,
    },
});
