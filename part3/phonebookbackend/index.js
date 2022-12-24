const express = require('express')

const app = express()
const morgan = require('morgan')

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :resData'))
morgan.token('resData', function (req, res) { return JSON.stringify(req.body) })

let persons = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]


app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/info', (req, res) => {
  res.send(`
    <h1>Phonebook has info for ${persons.length} people</h1>
    <p>${new Date()}</p>
  `)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(p => p.id === id)
  if (person) {
    res.json(person)
  } else {
    res.status(404).send('<h1>This person does not exits</h1>')
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)
  res.status(204).send('success')
})

app.post('/api/persons', (req, res) => {
  console.log(req);

  const { name, number } = req.body
  if (!name || persons.find(p => p.name === name)) {
    return res.status(404).send({ error: 'name must be unique' })
  }

  if (!number) {
    return res.status(404).send({ error: 'number must be unique' })
  }
  const id = Math.floor(Math.random() * 100000000)
  persons = [...persons, { id, name, number }]
  res.status(200).send({
    data: {
      name, number
    },
    mess: 'add success'
  })

})



app.listen('3001', () => {
  console.log('Listening port 3001......');
})