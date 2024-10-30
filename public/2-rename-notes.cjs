const fs = require("fs");

let notesFolder = fs.readdirSync("./notes2");

// console.log(notesFolder);

for (let file of notesFolder) {
    const flatRegex = /([A-G])b(\d)\.mp3/;
    const nonFlatRegex = /([A-G])(\d)\.mp3/;

    if (flatRegex.test(file)) {
        let [, letter, number] = flatRegex.exec(file);
        let newFileName = `${number} ${letter.toUpperCase()}.Flat.mp3`;
        fs.renameSync("./notes2/" + file, "./notes2/" + newFileName);
        console.log("Flat note:", file, "(New name:", newFileName, ")");
    } else if (nonFlatRegex.test(file)) {
        let [, letter, number] = nonFlatRegex.exec(file);
        let newFileName = `${number} ${letter.toUpperCase()}.mp3`;
        fs.renameSync("./notes2/" + file, "./notes2/" + newFileName);
        console.log("Non-flat note:", file, "(New name:", newFileName, ")");
    }
}
