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
    const tone_delta = req.body.tone === 'minor' ? 5 : 6;

    const key = random_integer(57, 69);
    const options = [
        `--config=${s.MAG_DIR}\\${req.body.config}`,
        `--bundle_file=${s.MAG_DIR}\\${req.body.bundle}.mag`,
        `--output_dir=outputs\\magenta_music\\${req.body.config}`,
        `--num_outputs=40`,
        `--num_steps=32`,
        `--primer_melody="[${key}, ${key + tone_delta}]"`
    ];
    console.log('start generate');
    console.log(options.join(' '));
    console.log(`${path.join(req.settings.MAGENTA_PATH, 'melody_rnn_generate.exe')} ${options.join(' ')}`)

    child_process.exec(`${path.join(req.settings.MAGENTA_PATH, 'melody_rnn_generate.exe')} ${options.join(' ')}`, (err, stdout, stderr) => {
        if (err) {
            // res.json({success: false});
            res.redirect('/?result=false');
            return;
        }
        res.redirect('/');
    })
});

module.exports = router;
