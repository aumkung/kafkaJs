const express = require('express')
const app = express()
const port = 3000
app.use(express.json())

const peoples = [
  {
    id: 1,
    name: 'bubuMan'
  },
  {
    id: 2,
    name: 'aumkung'
  }
]

app.get('/', (req, res) => {
  res.json({
    message: 'hello world'
  })
})

app.get('/peoples/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const result = peoples.find(data => data.id === id)
  if (typeof result === 'undefined') {
    res.json({
      error: true,
      message: 'Data not found !'
    })
  } else {
    res.json(result)
  }
})

app.get('/peoples', (req, res) => {
  res.json(peoples)
})

app.post('/peoples', (req, res) => {
  const payload = req.body
  res.json(payload)
})

app.put('/peoples/:id', (req, res) => {
  const id = parseInt(req.params.id)
  res.json({ id })
})

app.delete('/peoples/:id', (req, res) => {
  const id = parseInt(req.params.id)
  res.json({ id })
})

app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`)
})