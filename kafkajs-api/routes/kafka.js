var express = require('express')
var router = express.Router()
//  config cafka rest
const KafkaRest = require('../util/kafkaRest')
const kafka = new KafkaRest({ 'url': 'http://127.0.0.1:8082' })
// config es-client
const ElasticSearchClient = require('../util/es-client')
const client = new ElasticSearchClient()

router.get('/topics', async (req, res) => {
    let listTopics = await kafka.topics()
    res.status(200).json(listTopics)
})

router.get('/brokers', async (req, res) => {
    let listBrokers = await kafka.brokers()
    res.status(200).json(listBrokers)
})

router.get('/topics/:name', async (req, res) => {
    const { name } = req.params
    let metaTopic = await kafka.topic(name)
    res.json(metaTopic)
})

router.get('/event/:id', async (req, res) => {
    const { id } = req.params
    let items = await client.get({
        id: id,
        type: 'event',
    })
    res.json(items._source)
})

module.exports = router;