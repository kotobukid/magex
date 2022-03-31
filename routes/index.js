const express = require('express');
const router = express.Router();
const child_process = require('child_process');
const path = require('path');

router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

const random_integer = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
};

router.post('/generate.json', function (req, res, next) {
    const s = req.settings;
    const options = [
        `--config=${s.MAG_DIR}\\lookback_rnn`,
        `--bundle_file=${s.MAG_DIR}\\basic_rnn.mag`,
        `--output_dir=outputs\\magenta_music\\lookback5`,
        `--num_output=40`,
        `--num_steps=32`,
        `--primer_melody="[${random_integer(57, 69)}]"`
    ];
    console.log('start generate');
    console.log(options.join(' '));

    child_process.exec(`${path.join(req.settings.MAGENTA_PATH, 'melody_rnn_generate.exe')} ${options.join(' ')}`, (err, stdout, stderr) => {
        if (err) {
            res.json({success: false});
            return;
        }
        res.json({success: true});
    })
});

module.exports = router;
