const express = require('express')
const morgan = require('morgan')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

let persons = [
  {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": 2
  },
  {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
  },
  {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
  }
]

app.use(bodyParser.json())
app.use(cors())
app.use(express.static('build'))

morgan.token('post-object', (res) => {
  return JSON.stringify(res.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-object'))

app.get('/info', (request, response) => {
  const info_string = `Phonebook has info for ${persons.length} people`
  response.send(`<p> ${info_string} </p> <p> ${Date()} </p>`)
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(p => p.id === id)
  if (person) response.json(person)
  else response.status(404).end()
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(p => p.id !== id)
  response.status(204).end()
})

const generateID = () => {
  return Math.floor(Math.random() * (1000 - 5)) + 5;
}

const postErrorHandler = (body, response) => {
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'The name or number is missing'
    })
  } else if (persons.find(person => person.name === body.name)) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }
}

app.post('/api/persons', (request, response) => {
  postErrorHandler(request.body, response)
  const newPerson = {
    name: request.body.name,
    number: request.body.number,
    id: generateID(),
  }
  persons = persons.concat(newPerson)
  response.json(newPerson)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})