const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const errorHandler = require('./utils/errorHandler')


app.use(express.static('build'))
app.use(express.json())
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :resData'))
morgan.token('resData', function (req, res) { return JSON.stringify(req.body) })



const router = express.Router()



router.get('/persons', (req, res, next) => {
  Person
    .find({})
    .then(persons => {
      res.json(persons)
    })
    .catch(err => next(err))
})

router.get('/info', (req, res, next) => {
  Person
    .find({})
    .then(persons => {
      res.send(`
    <h1>Phonebook has info for ${persons.length} people</h1>
    <p>${new Date()}</p>
  `)
    })
    .catch(err => next(err))
})

router.get('/persons/:id', (req, res, next) => {
  const id = req.params.id
  Person
    .findById(id)
    .then(person => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).send('<h1>This person does not exits</h1>')
      }
    })
    .catch(err => next(err))
})


router.delete('/persons/:id', (req, res, next) => {
  const id = req.params.id
  Person
    .deleteOne({ id })
    .then(data =>
      res.status(204).send('delete success')
    )
    .catch(err => next(err))
})

router.put('/persons/:id', (req, res, next) => {
  const id = req.params.id
  const { number } = req.body
  Person
    .findByIdAndUpdate(id, { number })
    .then(data =>
      res.status(204).send('update success')
    )
    .catch(err => next(err))
})

router.post('/persons', async (req, res, next) => {

  const { name, number } = req.body

  const people = await Person.find({ name })

  if (!name || people) {
    return res.status(404).send({ error: 'name must be unique' })
  }

  if (!number) {
    return res.status(404).send({ error: 'number must be unique' })
  }

  const person = new Person({ name, number })

  person
    .save()
    .then(({ id, name, number }) =>
      res.status(200).send({
        data: {
          id, name, number
        },
        mess: 'add success'
      })
    )
    .catch(err => next(err))
})



app.use('/api', router)

app.use(errorHandler)

app.listen(process.env.PORT || '3001', () => {
  console.log('Listening port 3001......');
}) 
