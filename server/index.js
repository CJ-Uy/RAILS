require("dotenv").config(); //This allows the env file to be read
const express = require("express");
const app = express();
const port = process.env.SERVER_PORT; //The server port number is taken from the .env file

app.listen (port, () => {
    console.log(
      `\n(-ω-)ゞ Server is now online!\nListening at http://localhost:${port}\n`
    );
})
