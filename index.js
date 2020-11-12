const express = require('express')
const cors = require('cors')
const basicAuth = require('express-basic-auth')

const app = express()
 
app.use(basicAuth({
    users: { 'test': 'testing123' }
}))
app.use(express.json())
app.use(cors())

app.get('/', function (req, res) {
    res.send('Hello World');
})
 
var server = app.listen(8081, function () {
var host = server.address().address
var port = server.address().port

console.log("Server listening at ", host, port)
})