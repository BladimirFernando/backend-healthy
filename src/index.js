const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const admin = require('firebase-admin')
const serviceAccount = require('./config/serviceAccountKey.json')

//Rutas que vamos a usar 
const auth = require('./routes/auth')
const users = require('./routes/users')

//declara la variables para el servidor
const app = express() 

//inicializar Firebase admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

//middleware 
app.use(cors())
app.use(bodyParser.json)

//decirle ala solucion las rutas 
app.use('api/auth', auth)
//app.use('api/users', users)

const PORT = process.env.PORT || 3010
app.listen(PORT, () => {
    console.log(`Listen Port: ${PORT}`)
})