const express = require('express');
const router = express.Router();
const child_process = require('child_process');
const path = require('path');

router.get('/', function (req, res, next) {
    res.render('index', {title: 'Magenta Frontend'});
});

const random_integer = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
};

router.post('/generate.json', function (req, res, next) {
    const s = req.settings;
    const body = req.body;

    const options = [
        `--config=${s.MAG_DIR}\\${body.config}`,
        `--bundle_file=${s.MAG_DIR}\\${body.config}.mag`,
        `--output_dir=outputs\\magenta_music\\${body.config}`,
        `--num_outputs=10`,
        `--num_steps=${body.bars}`,
        `--primer_melody="[${body.primer_melody.join(',')}]"`
    ];

    console.log('start generate');
    console.log(options.join(' '));
    console.log(`${path.join(req.settings.MAGENTA_PATH, 'melody_rnn_generate.exe')} ${options.join(' ')}`)

    child_process.exec(`${path.join(req.settings.MAGENTA_PATH, 'melody_rnn_generate.exe')} ${options.join(' ')}`, (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            res.json({success: false});
            return;
        }
        res.json({success: true});
    });
});

module.exports = router;
