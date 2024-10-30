import { useEffect, useState } from "react";
import "./App.css";
import { NotesPlayer } from "./components/NotesPlayer/NotesPlayer";
import { audioContext, NOTE_FILE_NAMES } from "./notes/notes";

function App() {
    const [noteFileBuffers, setNoteFileBuffers] = useState<
        AudioBuffer[] | null
    >(null);

    useEffect(() => {
        Promise.all(
            NOTE_FILE_NAMES.map((value) =>
                fetch("/notes2/" + value)
                    .then((response) => response.arrayBuffer())
                    .then((data) => audioContext.decodeAudioData(data))
            )
        ).then(setNoteFileBuffers);
    }, []);

    return (
        <main>
            {noteFileBuffers ? (
                <NotesPlayer noteFileBuffers={noteFileBuffers} />
            ) : (
                <>Loading...</>
            )}
        </main>
    );
}

export default App;
