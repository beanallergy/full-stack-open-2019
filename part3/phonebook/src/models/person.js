const mongoose = require('mongoose')
const url = process.env.MONGODB_URI
const uniqueValidator = require('mongoose-unique-validator')

console.log('connecting to', url)
mongoose.set('strictQuery',false)
mongoose.connect(url, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const phonebookSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: [true, 'User name required'],
    unique: true
  },
  number: {
    type: String,
    minlength: 8,
    required: [true, 'User phone number required'],
    validate: {
      validator: function(val) {
        return /\d{2,3}-\d+/.test(val)
      },
      message: props => `${props.value} is not a valid phone number. The first part should have 2 or 3 numbers and the second part should consist of numbers.`
    }
  }
})

phonebookSchema.plugin(uniqueValidator)
phonebookSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
//mongoose.set('useFindAndModify', false)
module.exports = mongoose.model('Person', phonebookSchema)
