const express = require('express')
//.config() allows us to have .env file with our variables
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000

const app = express()

//MiddleWares
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/projects', require('./routes/projectRoutes'))

app.listen(port, ()=>console.log(`Server started on port ${port}`))