import "dotenv/config";
import { spawn } from "child_process";

export default defineEventHandler(() => {
    // create a variable to store the dump string
    let dump = "";

    // spawn a subprocess that runs the mysqldump command with the connection object
    const mysqldump = spawn("mysqldump", [
        "-h",
        process.env.HOST,
        "-u",
        process.env.USER,
        "-p" + process.env.PASSWORD,
        process.env.DATABASE,
    ]);

    // listen to the stdout stream of the subprocess and append the data to the dump variable
    mysqldump.stdout.on("data", (data) => {
        dump += data.toString();
    });

    // return a promise that resolves with the dump variable when the subprocess closes
    return new Promise((resolve, reject) => {
        mysqldump.on("close", () => {
            resolve(dump);
        });
        mysqldump.on("error", (err) => {
            reject(err);
        });
    });
});
