var express = require('express')
var router = express.Router()
//  config cafka rest
const KafkaRest = require('../util/kafkaRest.js')
const kafka = new KafkaRest({ 'url': 'http://127.0.0.1:8082' })

router.get('/topics', async (req, res) => {
    let listTopics = await kafka.topics()
    res.status(200).json(listTopics)
})

router.get('/topics/:name', async (req, res) => {
    const { name } = req.params
    let metaTopic = await kafka.topic(name)
    res.json(metaTopic)
    // kafka.topic(name).get(function(err, topic) {
    //   console.log(topic.raw)
    //   console.log(topic.toString() + " (raw: " + JSON.stringify(topic.raw) + ")")
    // })
})

module.exports = router;