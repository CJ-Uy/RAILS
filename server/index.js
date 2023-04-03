const express = require ("express")
const app = express()
const port = 4000

app.listen (port, () => {
    console.log(
      `\n(-ω-)ゞ Server is now online!\nListening at http://localhost:${port}\n`
    );
} )