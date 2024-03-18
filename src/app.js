const express = require('express');
const dbConnect = require('../db/connect')
const { config } = require('dotenv')

config()

dbConnect()

const userRoutes = require('../routes/user.routes')
const bodyParser = require('body-parser')

//se usa express para la middleware
const app = express()
const port = process.env.PORT || 3000
app.use(bodyParser.json())


app.use('/users', userRoutes)


app.listen(port, ()=>{
    console.log(`Servidor iniciado con exito en el puerto ${port}`)
} )


