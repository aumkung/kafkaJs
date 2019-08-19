const express = require('express')
const app = express()
const port = 3000
const { Kafka } = require('kafkajs')

const kafka = new Kafka({
    clientId: 'RestFul-Api-Kafka',
    brokers: ['localhost:9092']
})
 
app.use(express.json())

app.get('/', (req, res) => {
  res.json({
    message: 'hello world'
  })
})

app.get('/peoples/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const result = peoples.find(data => data.id === id)
  if (typeof result === 'undefined') {
    res.status(404).json({
      error: true,
      message: 'Data not found !'
    })
  } else {
    res.json(result)
  }
})

app.get('/peoples', (req, res) => {
  res.json(peoples)
})

app.post('/v1/produce', async (req, res) => {
  const producer = kafka.producer()
  const payload = JSON.stringify(req.body)
  // Producing
  await producer.connect()
  await producer.send({
    topic: 'bubuMan',
    key: '',
    messages: [{
      value: payload
    }]
  })
  res.json(`send message success`)
})

// app.put('/peoples/:id', (req, res) => {
//   const id = parseInt(req.params.id)
//   res.json({ id })
// })

// app.delete('/peoples/:id', (req, res) => {
//   const id = parseInt(req.params.id)
//   res.json({ id })
// })

app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`)
})