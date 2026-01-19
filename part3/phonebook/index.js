require('dotenv').config()
const Person = require('./models/person')

const express = require('express')
const app = express()

const morgan = require('morgan')
morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.use(express.json())
app.use(express.static('dist'))

let persons = [
]

app.get('/api/persons', (request, response) => {
    Person.find({}).then(res => {
        response.json(res)
    })
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(res => {
        response.json(res)
    })
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(p => p.id !== id)
    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'missing name or number'
        })
    }

    const alreadyExists = persons.find(person => person.name === body.name)
    if (alreadyExists) {
        return response.status(409).json({
            error: 'this user already exists'
        })
    }

    const newPerson = new Person({
        name: body.name,
        number: body.number
    })

    newPerson.save().then(newPerson => {
        response.json(newPerson)
    })


})
app.get('/info', (request, response) => {
    const info = `
        Phonebook has info for ${persons.length} people <br><br>
        ${new Date()}
    `
    response.send(info)
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})