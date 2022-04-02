export declare type Cell = {
    col: number,
    row: number,
    note_length: number
};

export declare type Bar = {
    bar_length: number,
    role: 'tonic' | 'dominant' | 'subdominant' | 'continue' | 'any',
    invert: 0 | 1 | 2,
    scale_key: number
}

export declare type BarRelative = {
    bar_length: number,
    role: 'tonic' | 'dominant' | 'subdominant' | 'continue' | 'any',
    invert: 0 | 1 | 2,
    key_offset: number
}
