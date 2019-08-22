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
            // console.log(name)
            let meta = await this.axios.post(`/topics/${name}`, {}, {
                headers: {
                    'Accept': 'application/vnd.kafka.binary.v2+json', 
                    'Content-Type': 'application/vnd.kafka.v2+json'
                }
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
 }

 module.exports = KafkaRest
