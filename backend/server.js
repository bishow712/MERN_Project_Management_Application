const express = require('express')
//.config() allows us to have .env file with our variables
const dotenv = require('dotenv').config()
const {connectDB} = require('./config/db')
const { errorHandler } = require('./middleware/errorMiddleware')
const port = process.env.PORT || 5000

const app = express()

connectDB()

//Middlewares (app.use(....))
//Middleware for accepting body data on POST
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//Middleware for routing
app.use('/api/projects', require('./routes/projectRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

app.use(errorHandler)

app.listen(port, ()=>console.log(`Server started on port ${port}`))