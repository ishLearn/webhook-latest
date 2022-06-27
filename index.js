const express = require('express')

const { exec } = require('child_process')

const app = express()

app.get('/', (req, res) => {
  console.log('GET /')
  const dockerPath =
    process.env.DOCKER_PATH ||
    '/root/ishlearn-servers/docker/docker-compose.yml'
  exec(`docker compose -f ${dockerPath} pull`, (err, stdout, stderr) => {
    if (err || stderr) return res.status(500).end()
    console.log(stdout)
    console.log('Reloading')
    exec(`docker compose -f ${dockerPath} up -d`, (err, stdout, stderr) => {
      console.log(`Compose is up again.`)
    })
  })
  res.status(200).end()
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Webhook server listening on ${PORT}`))
