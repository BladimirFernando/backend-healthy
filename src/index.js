const express = require('express')
//const cors = require('cors')
const routes = require('./routes/routes')

//declara la variables para el servidor
const app = express() 

//middleware
app.use(express.json())
app.use('/', routes)

const PORT = process.env.PORT || 3010
app.listen(PORT, () => {
    console.log(`Listen Port: ${PORT}`)
})