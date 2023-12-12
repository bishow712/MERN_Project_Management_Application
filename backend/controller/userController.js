const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const User = require('../models/userModel')

//Register New User
//@route POST /api/users
//@access Public
const registerUser = asyncHandler(async (req,res) =>{
    const { name, email, password } = req.body

    if(!name || !email || !password) {
        res.status(400)
        throw new Error("Fill all the user fields.")
    }

    //Check if user exists
    const userExists = await User.findOne({email})
    if(userExists) {
        res.status(400)
        throw new Error("User already exists.")
    }

    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    
    //Create User
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    })

    if (user){
        res.status(201).json({
            _id:user.id, 
            name: user.name, 
            email: user.email,
            token: generateToken( user._id ),
        })
    } else {
        res.status(400)
        throw new Error("Invalid User Data.")
    }
})

//Authenticate a user
//@route POST /api/users/login
//@access Public
const loginUser = asyncHandler(async (req,res) =>{
    const { email, password } = req.body

    //Checking for matching User Email and Password
    const user = await User.findOne({email})
    if(email && (await bcrypt.compare(password, user.password))){
        res.json({
            _id:user.id, 
            name: user.name, 
            email: user.email,
            token: generateToken( user._id ),
        })
    } else {
        res.status(400)
        throw new Error("Invalid Credentials!!")
    }
})

//Get (my)user data
//@route POST /api/users/me
//@access Private
const getMe = asyncHandler(async (req,res) =>{
    res.status(200).json(req.user)
})

//@route GET /api/users
//@access Private
const getUser = asyncHandler(async (req,res) => {
    const users = await User.find()

    res.status(200).json(users)
})

// //@route POST /api/users
// //@access Private
// const setUser = asyncHandler(async (req,res) => {
//     if(!req.body.userName){
//         res.status(400).json({message : "Error occured."})
//     }

//     const user = await User.create({
//         userName: req.body.userName,
//         userDuration: req.body.userDuration,
//     })

//     res.status(200).json(user)
// })

// //@route PUT /api/users/:id
// //@access Private
// const updateUser = asyncHandler(async (req,res) => {
//     const user = await User.findById(req.params.id) 

//     if(!user){
//         res.status(400).json({message:"Error while updating."})
//     }

//     const updatedGoal = await User.findByIdAndUpdate(req.params.id, req.body, {
//         new: true
//     })

//     res.status(200).json(updatedGoal)
// })

// //@route DELETE /api/users/:id
// //@access Private
// const deleteUser = asyncHandler(async (req,res) => {
//     const user = await User.findById(req.params.id) 

//     if(!user){
//         res.status(400).json({message:"Error while deleting."})
//     }

//     await user.remove

//     res.status(200).json({ id: req.params.id })
// })

//Generate JWT(JSON Web Token)
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}


module.exports = {registerUser, loginUser, getMe, getUser}