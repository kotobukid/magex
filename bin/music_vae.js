/* VAE: Variational Auto Encoder */

const s = require('../config/custom.json');
const child_process = require('child_process');
const path = require('path');

const id = 'hierdec-mel_16bar';

const options = [
    '--config=${id}',
    `--checkpoint_file=${s.MAG_DIR}\\music_vae\\${id}.tar`,
    `--mode=sample`,
    `--output_dir=outputs\\magenta_music\\music_vae\\${id}`,
    `--num_outputs=10`,
    `--num_steps=128`,
];

// tensorflow/stream_executor/platform/default/dso_loader.cc:55] Could not load dynamic library 'cudart64_100.dll'; dlerror: cudart64_100.dll not found
// CUDAは11がインストールされているのでエラー

child_process.exec(`${path.join(s.MAGENTA_PATH, 'music_vae_generate.exe')} ${options.join(' ')}`, (err, stdout, stderr) => {
    if (err) {
        console.error(err);
        return;
    }
});