const { Kafka } = require('kafkajs')

const kafka = new Kafka({
    clientId: 'RestFul-Api-Kafka',
    brokers: ['127.0.0.1:9092']
})

const consumer = kafka.consumer({ groupId: 'bubuMan-group' })
 
const run = async () => {
    // Consuming
    await consumer.connect()
    await consumer.subscribe({ topic: 'bubuMan', fromBeginning: false })
    
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log({
                partition,
                offset: message.offset,
                value: message.value.toString(),
            })
            // console.log(JSON.parse(message.value.toString()))
        },
    })
}
 
run().catch(console.error)