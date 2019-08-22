const Kafka = require('node-rdkafka')
// console.log(Kafka.librdkafkaVersion)
const producer = new Kafka.Producer({
    'client.id': 'RestFul-Api-Kafka',
    'metadata.broker.list': '127.0.0.1:9092',
    'dr_cb': true
})

const runProducer = async (count) => {
  await producer.connect()

  producer.on('ready', async () => {
    try {
      for (var i = 1;i < count;i++) {
          await producer.produce(
            // Topic to send the message to
              'bubuMan-topic-1',
            // optionally we can manually specify a partition for the message
            // this defaults to -1 - which will use librdkafka's default partitioner (consistent random for keyed messages, random for unkeyed messages)
              null,
            // Message to send. Must be a buffer
              Buffer.from(JSON.stringify({
                  id: i,
                  pageview: 500
              })),
            // for keyed messages, we also specify the key - note that this field is optional
            `test:pv:${i}`,
            // you can send a timestamp here. If your broker version supports it,
            // it will get added. Otherwise, we default to 0
            Date.now(),
            // you can send an opaque token here, which gets passed along
            // to your delivery reports
          )

          console.log(`produce pageview: ${i}`)
      }
    } catch (err) {
      console.error('A problem occurred when sending our message');
      console.error(err);
    }
  })

  // var opts = {
  //   topic: 'librdtesting-01',
  //   timeout: 10000
  // };
  
  // producer.getMetadata(opts, function(err, metadata) {
  //   if (err) {
  //     console.error('Error getting metadata');
  //     console.error(err);
  //   } else {
  //     console.log('Got metadata');
  //     console.log(metadata);
  //   }
  // });

  // Any errors we encounter, including connection errors
  producer.on('event.error', function(err) {
      console.error('Error from producer');
      console.error(err);
  })
}

runProducer(10)