const elasticsearch = require('elasticsearch')
const client = new elasticsearch.Client({
    host: 'localhost:9200',
    // log: 'trace'
})

class ElasticSearchClient {
    async index (data) {
        let meta = JSON.parse(data.value)
        await client.index({
            index: 'kafka_js',
            type: meta.type,
            id: data.key,
            body: {
                topic: meta.topic,
                action: meta.action,
                value: meta.value
            }
        })

        console.log('Elasticsearch inserted')
    }

    async get (data) {
        const response = await client.get({
            index: 'kafka_js',
            type: data.type,
            id: data.id
        })

        return response
    }
}

module.exports = ElasticSearchClient