const express = require('express')
const app = express()
const port = 3000
//  config cafka rest
const KafkaRest = require('./kafkaRest.js')
// const KafkaRest = require('kafka-rest')
const kafka = new KafkaRest({ 'url': 'http://localhost:8082' })
app.use(express.json())

app.get('/v1/topics', async (req, res) => {
    let listTopics = await kafka.topics()
    res.status(200).json(listTopics)
})

app.post('/v1/topics/:name', async (req, res) => {
    const { name } = req.params
    // kafka.topic(name).get(function(err, topic) {
    //   console.log(topic.raw)
      // console.log(topic.toString() + " (raw: " + JSON.stringify(topic.raw) + ")")
    // })
})

// kafka.topic('test-topic-2').get(function(err, topic) {
//   console.log(topic.raw.partitions)
//   // console.log(topic.toString() + " (raw: " + JSON.stringify(topic.raw) + ")")
// })

kafka.topic('test-topic-2')

app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`)
})