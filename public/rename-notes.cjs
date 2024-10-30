const fs = require("fs");

let notesFolder = fs.readdirSync("./notes");

// console.log(notesFolder);

for (let file of notesFolder) {
    const sharpRegex = /([a-g])-(\d)\.ogg/;
    const nonSharpRegex = /([a-g])(\d)\.ogg/;

    if (sharpRegex.test(file)) {
        let [, letter, number] = sharpRegex.exec(file);
        let newFileName = `${number} ${letter.toUpperCase()}.Sharp.ogg`;
        fs.renameSync("./notes/" + file, "./notes/" + newFileName);
        console.log("Sharp note:", file, "(New name:", newFileName, ")");
    } else if (nonSharpRegex.test(file)) {
        let [, letter, number] = nonSharpRegex.exec(file);
        let newFileName = `${number} ${letter.toUpperCase()}.ogg`;
        fs.renameSync("./notes/" + file, "./notes/" + newFileName);
        console.log("Non-sharp note:", file, "(New name:", newFileName, ")");
    }
}
