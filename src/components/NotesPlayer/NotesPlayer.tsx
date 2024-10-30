import { useState } from "react";

import "./NotesPlayer.css";
import { NOTE_KEYS } from "../../notes/notes";
import { parseTonicSolfa } from "../../notes/parseTonicSolfa";
import { playSequence } from "../../notes/play";

export function NotesPlayer({
    noteFileBuffers,
}: {
    noteFileBuffers: AudioBuffer[];
}) {
    const [soprano, setSoprano] = useState(
        "| Do(3/8) Re8 Do8 So_8 Mi_8 So_8 | Do2 Mi2 | La_(3/8) Ti_8 Do8 Ti_8 Do8 Mi8 | Re1 | Do(3/8) | Re8 Do8 So_8 Mi_8 So_8 | Do2 Mi2 | Re(3/8) Mi8 Re8 So_8 Ti_8 La_8 | So_1 ||| Fa(3/8) Re8 Ti_8 So_8 Mi8 Re8 | Do2 So_2 | Do(3/8) Do8 Do8 Ti_8 Do8 Re8 | Mi1 | Mi(3/8) Re8 Do8 So_8 Do8 Mi8 | So2 Fa2 | Fa8 Mi8 Re8 Do8 Mi4 Re4 | Do1 |"
    );
    const [alto, setAlto] = useState(
        "| Mi_(3/8) Fa_8 Mi_8 So_8 Mi_8 So_8 | Mi_2 So_2 | Fa_(3/8) Fa_8 Fe_8 Fe_8 Fe_8 Fe_8 | So_1 | Mi_(3/8) Fa_8 Mi_8 So_8 Mi_8 So_8 | Mi_2 So_2 | So_(3/8) So_8 So_8 So_8 Fe_8 Fe_8 | So_1 ||| Ti_(3/8) Ti_8 So_8 So_8 So_8 So_8 | So_2 Mi_2 | Mi_(3/8) Mi_8 La_4 La_4 | Se_4 La_4 Se_2 | So_(3/8) Fa_8 Mi_8 Mi_8 Mi_8 So_8 | So_4 Ta_4 La_2 | La_8 La_8 La_8 La_8 So_4 Fa_4 | Mi_1 |"
    );
    const [tenor, setTenor] = useState(
        "| So_(3/8) So_8 So_8 So_8 Mi_8 So_8 | So_2 Do2 | Do(3/8) Re8 Re8 Re8 La_8 Do8 | Ti_1 | So_(3/8) So_8 So_8 So_8 Mi_8 So_8 | So_2 Do2 | Ti_(3/8) Do8 Ti_8 Ti_8 Re8 Do8 | Ti_1 ||| Re(3/8) Re8 Re8 Ti_8 So_8 Fa8 | Mi2 Do2 | Do(3/8) Do8 La_4 La_4 | Ti_4 Do4 Ti_2 | Do(3/8) So_8 So_8 Do8 Do8 Do8 | Do2 Do2 | Do8 Do8 Do8 Do8 Do4 Ti_4 | Do1 |"
    );
    const [bass, setBass] = useState(
        "| Do_(3/8) Do_8 Do_8 Do_8 Mi_8 So_8 | Do_2 Do_2 | Fa_(3/8) Fa_8 Re_8 Re_8 Re_8 Re_8 | So_1 | Do_(3/8) Do_8 Do_8 So_8 Mi_8 So_8 | Do_2 Do_2 | Re_(3/8) Re_8 Re_8 Re_8 Re_8 Re_8 | So_1 ||| So_(3/8) So_8 So_8 So_8 So_8 So_8 | Do_2 Do_2 | La_(3/8) La_8 Fa_4 Fa_4 | Mi_4 La_4 Mi_2 | Do_(3/8) Do_8 Do_8 Do_8 Do_8 Do_8 | Mi_2 Fa_2 | Re_8 Mi_8 Fa_8 Fe_8 So_4 So_4 Do_1 |"
    );
    const [key, setKey] = useState("B_");

    // async function playAllNotes() {
    //     for (const buffer of NOTE_FILE_BUFFERS) {
    //         // await webAudioPlay(buffer, 200);
    //     }
    // }

    async function testParsing() {
        const KEY_INDEX = NOTE_KEYS[key];

        if (!KEY_INDEX) {
            throw new Error("Unrecognised key: " + key);
        }
        const NOTE_DURATION = 2000;

        const sequences = [
            { text: soprano, noteOffset: 0 },
            { text: alto, noteOffset: 0 },
            { text: tenor, noteOffset: -12 },
            { text: bass, noteOffset: -12 },
        ].map((text) =>
            parseTonicSolfa(text.text).map((value) => ({
                buffer: noteFileBuffers[
                    KEY_INDEX + value.noteOffset + text.noteOffset
                ],
                timing: value.timing,
            }))
        );

        for (const sequence of sequences) {
            playSequence(sequence, NOTE_DURATION);
        }
    }

    return (
        <>
            <p>
                <input
                    defaultValue={key}
                    onInput={(e) =>
                        setKey((e.target as HTMLInputElement).value)
                    }
                    type="text"
                    placeholder="Key"
                />
                <br />
                <textarea
                    defaultValue={soprano}
                    onInput={(e) =>
                        setSoprano((e.target as HTMLInputElement).value)
                    }
                    placeholder="Soprano"
                    // cols={80}
                    rows={6}
                />
                <br />
                <textarea
                    defaultValue={alto}
                    onInput={(e) =>
                        setAlto((e.target as HTMLInputElement).value)
                    }
                    placeholder="Alto"
                    // cols={80}
                    rows={6}
                />
                <br />
                <textarea
                    defaultValue={tenor}
                    onInput={(e) =>
                        setTenor((e.target as HTMLInputElement).value)
                    }
                    placeholder="Tenor"
                    // cols={80}
                    rows={6}
                />
                <br />
                <textarea
                    defaultValue={bass}
                    onInput={(e) =>
                        setBass((e.target as HTMLInputElement).value)
                    }
                    placeholder="Bass"
                    // cols={80}
                    rows={6}
                />
            </p>
            <p>
                <button onClick={() => testParsing()}>Play</button>
            </p>
        </>
    );
}
