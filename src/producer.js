const { Kafka } = require('kafkajs')

const kafka = new Kafka({
    clientId: 'RestFul-Api-Kafka',
    brokers: ['localhost:9092']
})

const producer = kafka.producer()
 
const run = async () => {
    // Producing
    await producer.connect()
    var pageview = 2
    for (i = 0;i <= pageview;i++) {
        await producer.send({
            topic: 'bubuMan',
            messages: [
            { value: `pageview: ${i}` },
            ],
        })
        console.log(`produce pageview: ${i}`)
    }
}
 
run().catch(console.error)