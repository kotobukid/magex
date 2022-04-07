const s = require('../config/custom.json');
const child_process = require('child_process');
const path = require('path');

// kick: 36 (C1)
// snare: 38 (D1)
// ch: 42 (F#1)
// oh: 46 (A#1)
// low tom: 45 (A1)
// mid tom: 48 (C2)
// high tom: 50 (D2)
// crash cymbal: 49 (C#2)
// ride cymbal: 51 (D#2)

const options = [
    '--config=drum_kit',
    `--bundle_file=${s.MAG_DIR}\\drum_kit_rnn.mag`,
    `--output_dir=outputs\\magenta_music\\drums`,
    `--num_outputs=10`,
    `--num_steps=128`,
    `--qpm=120`,
    `--primer_drums="[(36,)]"`,
];

child_process.exec(`${path.join(s.MAGENTA_PATH, 'drums_rnn_generate.exe')} ${options.join(' ')}`, (err, stdout, stderr) => {
    if (err) {
        console.error(err);
        return;
    }
});