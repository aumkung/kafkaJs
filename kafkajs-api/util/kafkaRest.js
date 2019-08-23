const axios = require('axios')

class KafkaRest {
    constructor(config) {
        this.axios = axios.create({
            baseURL: config.url,
            timeout: 1000
        })
    }

    async topics () {
        let items = []
        let meta = await this.axios.get('/topics', {
            headers: {'Accept': 'application/vnd.kafka.v2+json'}
        }).then(res => {
            res.data.forEach(d => {
                items.push({
                    name: d
                })
            })
            return items
        })

        return meta
    }

    async topic (name = null) {
        if (name) {
            let meta = await this.axios.get(`/consumers/bubuMan-group/instances/127.0.0.1:9092/records?timeout=3000&max_bytes=300000`, {
                headers: {'Accept': 'application/vnd.kafka.json.v2+json'}
            }).then(res => {
                console.log('fuck yeeah')
                return res.data
            }).catch(err => {
                console.log(err.response)
                return err.response.data
            })

            return meta
        } 
    }

    async brokers () {
        let meta = await this.axios.get('/brokers', { headers: {'Accept': 'application/vnd.kafka.v2+json'} }).then(res => res.data).catch(err => err.response.data)
        return meta
    }
 }

 module.exports = KafkaRest
