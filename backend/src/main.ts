import config from './config/server.json'
import models_init from './init/tables'
import './init/date'
import generateKeys from './init/generate-keys'
import app from './app'

function main() {
    app.listen(config.port, () => {
        console.log('starting server done')
    })
}

Promise.all([generateKeys(), models_init()]).then(main);
