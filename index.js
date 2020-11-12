const express = require('express')
const cors = require('cors')
const moment = require('moment')
const basicAuth = require('express-basic-auth')
const db = require('./models')
const Employee  = db.Employee

const app = express()
 
app.use(basicAuth({
    users: { 'test': 'testing123' },
    unauthorizedResponse: (req) => {
        return 'Invaild Username or Password'
    }
}))
app.use(express.json())
app.use(cors())

app.get('/employees',async (req, res) => {
    try {
        const lists = await Employee.findAll()
        return res.json({result: lists})
    } catch (error) {
        return res.status(500).json({
            message: 'Cannot get data from database.'
        })
    }
})
app.post('/employees',async (req, res) => {
    const data = req.body
    if(data){
        if(!data.firstname){
            return res.status(500).json({
                message: "Invaild form, firstname is not be blank."
            })
        }
        if(!data.lastname){
            return res.status(500).json({
                message: "Invaild form, lastname is not be blank."
            })
        }
        if(!data.birthday){
            return res.status(500).json({
                message: "Invaild form, birthday is not be blank."
            })
        }
        const d = moment(data.birthday,'YYYY-MM-DD');
        if(d == null || !d.isValid()){
            return res.status(500).json({
                message: "Invaild form, birthday is invaild."
            })
        }
        if(!data.email){
            return res.status(500).json({
                message: "Invaild form, email is not be blank."
            })
        }
        if(!/\S+@\S+\.\S+/.test(data.email)){
            return res.status(500).json({
                message: "Invaild form, email is invaild."
            })
        }
        try {
            const newData = await db.sequelize.transaction((t) => {
                return Employee.create(data,{
                    transaction: t
                })
            })
            return res.status(201).json({result: newData})
        } catch (error) {
            return res.status(500).json({
                message: 'Cannot post data from database.'
            })
        }
    }
    return res.status(400).json({
        message: 'Bad request, No body data'
    })
})
app.get('/employees/:id',async (req, res) => {
    const id = req.params.id
    if(id){
        try {
            const lists = await Employee.findByPk(id)
            return res.json({result: lists})
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
app.put('/employees/:id',async (req, res) => {
    const id = req.params.id
    const data = req.body
    if(id && data){
        if(!data.firstname){
            return res.status(500).json({
                message: "Invaild form, firstname is not be blank."
            })
        }
        if(!data.lastname){
            return res.status(500).json({
                message: "Invaild form, lastname is not be blank."
            })
        }
        if(!data.birthday){
            return res.status(500).json({
                message: "Invaild form, birthday is not be blank."
            })
        }
        const d = moment(data.birthday,'YYYY-MM-DD');
        if(d == null || !d.isValid()){
            return res.status(500).json({
                message: "Invaild form, birthday is invaild."
            })
        }
        if(!data.email){
            return res.status(500).json({
                message: "Invaild form, email is not be blank."
            })
        }
        if(!/\S+@\S+\.\S+/.test(data.email)){
            return res.status(500).json({
                message: "Invaild form, email is invaild."
            })
        }
        try {
            db.sequelize.transaction((t) => {
                return Employee.update(data,{
                    where: {
                        id
                    }
                },{
                    transaction: t
                })
            })
            return res.json({result: data})
        } catch (error) {
            return res.status(500).json({
                message: 'Cannot put data from database.'
            })
        }
    }
    return res.status(400).json({
        message: 'Bad request not param :id'
    })
})
app.delete('/employees/:id',async (req, res) => {
    const id = req.params.id
    if(id){
        try {
            await Employee.destroy({
                where: {
                    id
                }
            })
            return res.status(204).send()
        } catch (error) {
            return res.status(500).json({
                message: 'Cannot delete data from database.'
            })
        }
    }
    return res.status(400).json({
        message: 'Bad request, No param :id'
    })
})

 
var server = app.listen(3000, () => {
var host = server.address().address
var port = server.address().port

console.log("Server listening at ", host, port)
})