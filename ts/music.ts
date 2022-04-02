import {Bar} from "./types";

export const chord_name = (bar: Bar): string => {
    const name: string = ['C', 'C♯/D♭', 'D', 'D♯/E♭', 'E', 'F', 'F♯/G♭', 'G', 'G♯/A♭', 'A', 'A♯/B♭', 'B'][bar.scale_key % 12];

    return `${name}`;
};
