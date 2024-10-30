import { TONIC_SOLFA_NOTES } from "./notes";

export type SolfaNote = {
    noteOffset: number;
    /** A fraction of 1 */
    timing: number;
};

export function parseTonicSolfa(text: string) {
    let snippets = text
        .split(/\s/)
        .map((snippet) => snippet.trim())
        .filter(
            (snippet) => snippet != "|" && snippet != "|||" && snippet != ""
        );

    let regex1 = /([a-zA-Z]+)(_|\^)?(\d+)/;
    let regex2 = /([a-zA-Z]+)(_|\^)?\((\d+)\/(\d+)\)/;

    let result: SolfaNote[] = [];

    for (let snippet of snippets) {
        let noteName = "";
        let flatOrSharp: string | undefined = undefined;
        let timing = 1;

        if (regex1.test(snippet)) {
            let match = regex1.exec(snippet);
            if (match) {
                noteName = match[1];
                flatOrSharp = match[2];
                timing = 1 / Number(match[3]);
            }
        } else if (regex2.test(snippet)) {
            let match = regex2.exec(snippet);
            if (match) {
                noteName = match[1];
                flatOrSharp = match[2];
                timing = Number(match[3]) / Number(match[4]);
            }
        }

        if (noteName) {
            let noteOffset = TONIC_SOLFA_NOTES[noteName];
            if (noteOffset == undefined)
                throw new Error("Invalid note name: " + noteName);
            if (flatOrSharp) {
                noteOffset +=
                    flatOrSharp === "^" ? 12 : flatOrSharp === "_" ? -12 : 0;
            }
            result.push({
                noteOffset,
                timing,
            });
        } else {
            throw new Error("Failed to parse note: " + snippet);
        }
    }

    return result;
}
