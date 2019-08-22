var express = require('express')
var router = express.Router()

router.get('/', (req, res) => {
  res.json({
    message: 'hello world'
  })
})

router.post('/test', (req, res) => {
  res.json(req.body)
})

router.get('/peoples/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const result = peoples.find(data => data.id === id)
  if (typeof result === 'undefined') {
    res.status(404).json({
      error: true,
      message: 'Data not found !'
    })
  } else {
    res.json(result)
  }
})

router.get('/peoples', (req, res) => {
  res.json(peoples)
})

router.put('/peoples/:id', (req, res) => {
  const id = parseInt(req.params.id)
  res.json({ id })
})

router.delete('/peoples/:id', (req, res) => {
  const id = parseInt(req.params.id)
  res.json({ id })
})

module.exports = router;
