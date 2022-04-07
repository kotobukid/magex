const s = require('../config/custom.json');
const child_process = require('child_process');
const path = require('path');

const options = [
    '--config=chord_pitches_improv',
    `--bundle_file=${s.MAG_DIR}\\chord_pitches_improv.mag`,
    `--output_dir=outputs\\magenta_music\\chord_pitches_improv`,
    `--num_outputs=10`,
    `--temperature=0.8`,
    `--qpm=120`,
    `--primer_melody="[60]"`,
    // `--primer_melody="[60, -2, 60, -2, 67, -2, 67, -2, 69, -2, 69, -2, 67, -2, -2, -2]"`,
    `--backing_chords="C C G G F F C C"`,
    `--steps_per_chord=16`,
    `--render_chords=False`
];

const options2 = [
    '--config=chord_pitches_improv',
    `--bundle_file=${s.MAG_DIR}\\chord_pitches_improv.mag`,
    `--output_dir=outputs\\magenta_music\\chord_pitches_improv`,
    `--num_outputs=1`,
    `--temperature=1.0`,
    `--qpm=120`,
    `--primer_melody="[60]"`,
    // `--primer_melody="[60, -2, 60, -2, 67, -2, 67, -2, 69, -2, 69, -2, 67, -2, -2, -2]"`,
    `--backing_chords="C C G G F F C C"`,
    `--steps_per_chord=16`,
    `--render_chords=True`
];

child_process.exec(`${path.join(s.MAGENTA_PATH, 'improv_rnn_generate.exe')} ${options.join(' ')}`, (err, stdout, stderr) => {
    if (err) {
        console.error(err);
        return;
    }
    child_process.exec(`${path.join(s.MAGENTA_PATH, 'improv_rnn_generate.exe')} ${options2.join(' ')}`, (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            return;
        }
    });
});