const { Kafka } = require('kafkajs')

const kafka = new Kafka({
    clientId: 'RestFul-Api-Kafka',
    brokers: ['127.0.0.1:9092']
})

const producer = kafka.producer()
 
const run = async () => {
    // Producing
    await producer.connect()
    var pageview = 10
    for (i = 0;i <= pageview;i++) {
        await producer.send({
            key: JSON.stringify(`test:pv:${i}`),
            topic: 'bubuMan-topic-2',
            messages: [
                { value: JSON.stringify({
                    id: i,
                    pageview: 500
                }) },
            ],
        })
        console.log(`produce pageview: ${i}`)
    }
}
 
run().catch(console.error)