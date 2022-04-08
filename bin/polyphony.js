const s = require('../config/custom.json');
const child_process = require('child_process');
const path = require('path');

const options = [
    `--bundle_file=${s.MAG_DIR}\\polyphony_rnn.mag`,
    `--output_dir=outputs\\magenta_music\\polyphony`,
    `--num_outputs=10`,
    `--temperature=1.3`,
    `--qpm=128`,
    // `--primer_pitches="[67, 64, 60]"`,
    `--primer_melody="[60,-2,-2,-2, 60, -2,-2,-2, 67, -2,-2,-2, 67,-2,-2,-2, 69,-2,-2,-2, 69,-2,-2,-2, 67,-2,-2,-2,-2,-2,-2,-2,]"`,
    `--condition_on_prime=False`,
    `--inject_primer_during_generation=False`,
    `--num_steps=${128 + 32 + 1}`
];


child_process.exec(`${path.join(s.MAGENTA_PATH, 'polyphony_rnn_generate.exe')} ${options.join(' ')}`, (err, stdout, stderr) => {
    if (err) {
        console.error(err);
        return;
    }
});