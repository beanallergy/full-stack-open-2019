require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
//const bodyParser = require('body-parser')
const cors = require('cors')
const Person = require('./models/person')

app.use(express.json())
app.use(cors())
// frontend static content
app.use(express.static('build'))

morgan.token('post-object', (res) => {
  return JSON.stringify(res.body)
})
// Morgan tiny format
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-object'))

app.get('/info', (request, response, next) => {
  Person.find({})
    .then(result => {
      const info_string = `Phonebook has info for ${result.length} people`
      response.send(`<p> ${info_string} </p> <p> ${Date()} </p>`)
    })
    .catch(error => next(error))
})

app.get('/api/persons', (request, response, next) => {
  Person.find({})
    .then(result => response.json(result))
    .catch(error => next(error))
})

// GET
app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(result => {
      if (result) response.json(result)
      else response.status(404).end()
    })
    .catch(error => next(error))
})

// DELETE
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => response.status(204).end())
    .catch(error => next(error))
})

// POST
app.post('/api/persons', (request, response, next) => {
  const body = request.body
  if (!body) {
    return response.status(400).send({ error: 'The content is missing' })
  }
  const newPerson = new Person({
    name: body.name,
    number: body.number
  })
  newPerson.save()
    .then(result => response.json(result))
    .catch(error => next(error))
})

// PUT
app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  const updatedPerson = {
    name: body.name,
    number: body.number
  }
  const updateOptions = {
    new: true,
    runValidators: true
  }
  const nullErrorMsg = 'Object to be updated does not exist.'
  Person.findByIdAndUpdate(request.params.id, updatedPerson, updateOptions)
    .then(result => {
      console.log('PUT promise fulfilled - result:', result)
      result ? response.json(result) : response.status(400).json({ error: nullErrorMsg })
    })
    .catch(error => next(error))
})

// Error handlers
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError' && error.kind == 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}
app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})