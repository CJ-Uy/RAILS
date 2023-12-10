import fs from "fs";

const input = {
    // Insert input here
};

const output = Object.keys(input).map((key) => ({
    key,
    label: "",
    sortable: true,
}));

fs.writeFile(
    "./tests/formatRequestJs/keys.txt",
    JSON.stringify(output),
    (err) => {
        if (err) throw err;
        console.log("The file has been saved!");
    },
);
