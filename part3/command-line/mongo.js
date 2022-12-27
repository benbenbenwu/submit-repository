const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

console.log(process.argv);

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]


const url =
  `mongodb+srv://ben:${password}@cluster0.fq6n4s6.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name,
  number,
})

if (name) {
  person.save().then(result => {
    console.log('person saved!')
  })
}

Person.find({}).then(result => {
  console.log('phonebook:');
  result.forEach(({ name, number }) => {
    console.log(`${name} ${number}`)
  })
}).then(res =>
  mongoose.connection.close()
)