const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            //Get token from header (Bearer ....(token)....)
            token = req.headers.authorization.split(' ')[1]

            //Verify token and get the Payload
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            //Get user from token (And don't include the password)
            req.user = await User.findById(decoded.id).select('-password')

            next()

        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not Authorized.')
        }
    }

    if(!token){
        res.status(401)
        throw new Error("No Token so Not Authorized.")
    }
})

module.exports = { protect }