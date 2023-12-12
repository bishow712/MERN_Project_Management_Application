const path = require('path')
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

//For Deployment (Heroku)
//Serve frontend (Also do npm run build in frontend folder)
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')))
}
else {
    app.get('/', (req,res)=> res.send('Set environment to production.'))
}

app.use(errorHandler)

app.listen(port, ()=>console.log(`Server started on port ${port}`))