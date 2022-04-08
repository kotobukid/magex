const s = require('../config/custom.json');
const child_process = require('child_process');
const path = require('path');

const progression_komuro = ['Am F G C', 32];
const progression_marusa = ['F E Am C F E Am C', 16];
const progression_twinkle_star = ['C C G G F F C C', 16];

const options = [
    '--config=chord_pitches_improv',
    `--bundle_file=${s.MAG_DIR}\\chord_pitches_improv.mag`,
    `--output_dir=outputs\\magenta_music\\chord_pitches_improv`,
    `--num_outputs=10`,
    `--temperature=0.8`,
    `--qpm=120`,
    `--primer_melody="[60]"`,
    `--backing_chords="${progression_marusa[0]}"`,
    `--steps_per_chord=${progression_marusa[1]}`,
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
    `--backing_chords="${progression_marusa[0]}"`,
    `--steps_per_chord=${progression_marusa[1]}`,
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