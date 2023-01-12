import * as dotenv from 'dotenv'

import config from './config'
import app from './server'
dotenv.config()

app.listen(config.port, () => {
  console.log(`Server listening on port ${config.port}`)
})

app.get('/', (req, res) => {
  res.json({ message: 'ok' })
})

process.on('uncaughtException', function (err) {
  console.log(err)
})
