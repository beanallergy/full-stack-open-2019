const mongoose = require('mongoose')

if ( process.argv.length < 3 ) {
  console.log('give password as argument')
  process.exit(1)
}
const password = process.argv[2]

const url =
  `mongodb+srv://dev:${password}@cluster0-mj68t.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true })

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', phonebookSchema)

if ( process.argv.length == 3 ) {
  Person.find({}).then(result => {
    console.log("phonebook:")

    result.forEach(item => {
      console.log(`${item.name} ${item.number}`)
    })    
    mongoose.connection.close()
})
} else if ( process.argv.length == 5 ) {
  const name = process.argv[3]
  const number = process.argv[4]

  const item = new Person({
    name: `${name}`,
    number: `${number}`
  })

  item.save().then(response => {
    console.log(`added ${item.name} number ${item.number} to phonebook`)
    mongoose.connection.close()
  })
} else console.log("Wrong number of argumnents")