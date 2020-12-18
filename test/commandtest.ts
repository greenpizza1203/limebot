const express = require('express'),
    nacl = require('tweetnacl'),
    _=require('lodash'),
    config = require('./config.json'),
    app = express();

app.use(express.json());
app.use((req, res, next) => {
    const raw = JSON.stringify(req.body);
    const signature = req.header('X-Signature-Ed25519');
    const timestamp = req.header('X-Signature-Timestamp');

    if (signature === undefined || timestamp === undefined) {
        return res.status(401).end('Missing signature!');
    }

    const isVerified = nacl.sign.detached.verify(
        Buffer.from(timestamp + raw),
        Buffer.from(signature, 'hex'),
        Buffer.from(config.publicKey, 'hex')
    );
    if (!isVerified) {
        return res.status(401).end('Invalid request signature!');
    }
    next();
});

function random(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function prop(options, key, defaultVal) {
    const opt = _.find(options, (o) => o.name === key);
    return _.isUndefined(opt) ? defaultVal : opt.value;
}

app.post('/', (req, res) => {
    const body = req.body;
    console.log(body);

    if (body.type === 1) { // Ping
        res.status(200).send({type: 1});
    } else {
        const command = body.data;

        if (command.name === 'rng') {
            const options = (command.options) ?? [{name: 'min', value: 1}, {
                name: 'max',
                value: 100
            }];
            const number = random(prop(options, 'min', 1), prop(options, 'max', 100));

            return res.status(200).send({
                type: 4,
                data: {
                    content: 'Random number is: ' + number
                }
            })
        } else if (command.name === 'ban') {
            const options = (command.options) ?? [{name: 'user', value: {}}];
            const name = body.member.user.username;

            return res.status(200).send({
                type: 4,
                data: {
                    content: '\u200B',
                    embeds: [{
                        title: '~~fake ban hehehehehe~~',
                        description: '**' + name + ' BANNED <@' + prop(options, 'user', 0) + '>**'
                    }]
                }
            });
        } else {
            return res.status(200).send({
                type: 4, // respond with a message, showing the user's input
                data: {
                    content: 'This is a test message'
                }
            });
        }
    }
});

app.listen(4589, () => {
    console.log('Listening on :4589');
});
