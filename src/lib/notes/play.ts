import { audioContext } from "./notes";

export async function playNote(note: HTMLAudioElement, duration: number) {
    note.fastSeek(0);
    note.play();
    await new Promise((resolve) =>
        setTimeout(() => {
            note.pause();
            resolve(null);
        }, duration)
    );
}

export async function webAudioPlay(buffer: AudioBuffer, duration: number) {
    const sourceNode = audioContext.createBufferSource();
    sourceNode.buffer = buffer;

    const gainNode = audioContext.createGain();
    gainNode.gain.value = 1;
    sourceNode.connect(gainNode).connect(audioContext.destination);
    sourceNode.start();

    await new Promise((resolve) =>
        setTimeout(() => {
            sourceNode.stop();
            resolve(null);
        }, duration)
    );
}

export async function playSequence(
    notesToPlay: {
        buffer: AudioBuffer;
        timing: number;
    }[],
    wholeNoteDuration: number
) {
    for (let note of notesToPlay) {
        await webAudioPlay(note.buffer, wholeNoteDuration * note.timing);
    }
}
