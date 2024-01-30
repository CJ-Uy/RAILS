import "dotenv/config";
import mysqldump from "mysqldump";

export default defineEventHandler(async () => {
    let dbCopy;
    await mysqldump({
        connection: {
            host: process.env.HOST,
            user: process.env.USER,
            password: process.env.PASSWORD,
            database: process.env.DATABASE,
        },
        stdout: true,
    }).then((result) => {
        dbCopy = result;
    });
    return dbCopy;
});
