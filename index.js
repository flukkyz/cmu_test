const express = require('express')
const cors = require('cors')
const basicAuth = require('express-basic-auth')
const db = require('./models')
const Employee  = db.Employee

const app = express()
 
app.use(basicAuth({
    users: { 'test': 'testing123' }
}))
app.use(express.json())
app.use(cors())

app.get('/',async (req, res) => {
    try {
        const lists = await Employee.findAll()
        return res.json({results: lists})
    } catch (error) {
        return res.status(500).json({
            message: 'Cannot get data from database.'
        })
    }
})
app.post('/',async (req, res) => {
    const data = req.body
    if(data){
        try {
            const lists = await Employee.findAll()
            return res.json({results: lists})
        } catch (error) {
            return res.status(500).json({
                message: 'Cannot get data from database.'
            })
        }
    }
    return res.status(400).json({
        message: 'Bad request, No body data'
    })
})
app.get('/:id',async (req, res) => {
    const id = req.params.id
    if(id){
        try {
            const lists = await Employee.findAll()
            return res.json({results: lists})
        } catch (error) {
            return res.status(500).json({
                message: 'Cannot get data from database.'
            })
        }
    }
    return res.status(400).json({
        message: 'Bad request, No param :id'
    })
})


 
var server = app.listen(8081, () => {
var host = server.address().address
var port = server.address().port

console.log("Server listening at ", host, port)
})