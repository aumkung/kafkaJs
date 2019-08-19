const { Kafka } = require('kafkajs')

const kafka = new Kafka({
    clientId: 'RestFul-Api-Kafka',
    brokers: ['127.0.0.1:9092']
})

const producer = kafka.producer()
 
const run = async () => {
    // Producing
    await producer.connect()
    var pageview = 1
    for (i = 0;i <= pageview;i++) {
        await producer.send({
            key: 'clip:pv',
            topic: 'bubuMan',
            messages: [
                { value: `pageview: ${i}` },
            ],
        })
        console.log(`produce pageview: ${i}`)
    }
}
 
run().catch(console.error)