const Kafka = require('node-rdkafka')

const consumer = new Kafka.KafkaConsumer({
    'group.id': 'RestFul-Api-Kafka',
    'metadata.broker.list': '127.0.0.1:9092',
    }, {})

const runConsumer = async () => {
    // Flowing mode
    await consumer.connect()

    await consumer.on('ready', (e) => {
        consumer.subscribe(['test-topic-2'])
        // Consume from the librdtesting-01 topic. This is what determines
        // the mode we are running in. By not specifying a callback (or specifying
        // only a callback) we get messages as soon as they are available.
        consumer.consume();
        console.log('... consumer topic: bubuMan ...')
    })

    await consumer.on('data', (data) => {
        // Output the actual message contents
        const result = {
            partition: data.partition,
            key: data.key.toString(),
            value: data.value.toString()
        }

        console.log(result)
    })
}

runConsumer()