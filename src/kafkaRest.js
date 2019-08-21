const axios = require('axios')

module.exports = class KafkaRest {
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

    topic (name = null) {
        if (name) {
            this.axios.post(`/topics/${name}`, {}, {
                headers: {'Content-Type': 'application/vnd.kafka.v1+json', 'Accept': 'application/vnd.kafka.v1+json, application/vnd.kafka+json; q=0.9, application/json; q=0.8'}
            }).then(res => {
                console.log(res.data)
            }).catch(err => {
                console.log(err.response.data)
            })
        } 
    }
 }
