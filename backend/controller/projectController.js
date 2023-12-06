const asyncHandler = require('express-async-handler')

const Project = require('../models/projectModel')
const User = require('../models/userModel')


//@route GET /api/projects
//@access Private
const getProject = asyncHandler(async (req,res) => {
    //{ user: req.user.id } -- To match the id present in the token
    const projects = await Project.find({ user: req.user.id })

    res.status(200).json(projects)
})

//@route POST /api/projects
//@access Private
const setProject = asyncHandler(async (req,res) => {
    if(!req.body.projectName){
        res.status(400)
        throw new Error('Fill all the fields.')
    }

    const project = await Project.create({
        projectName: req.body.projectName,
        projectDuration: req.body.projectDuration,
        user: req.user.id,
    })

    res.status(200).json(project)
})

//@route PUT /api/projects/:id
//@access Private
const updateProject = asyncHandler(async (req,res) => {
    const project = await Project.findById(req.params.id) 

    if(!project){
        res.status(400)
        throw new Error('Project not found for updating.')
    }

    //Checking for user
    const user = await User.findById(req.user.id)
    if(!user){
        res.status(401)
        throw new Error('User not found.')
    }
    //Make sure the logged in user matches the project user
    if(project.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedGoal = await Project.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })

    res.status(200).json(updatedGoal)
})

//@route DELETE /api/projects/:id
//@access Private
const deleteProject = asyncHandler(async (req,res) => {
    const project = await Project.findById(req.params.id) 

    if(!project){
        res.status(400)
        throw new Error("Project not found for deleting.")
    }

    //Checking for user
    const user = await User.findById(req.user.id)
    if(!user){
        res.status(401)
        throw new Error('User not found.')
    }
    //Make sure the logged in user matches the project user
    if(project.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    await project.remove

    res.status(200).json({ id: req.params.id })
})

module.exports = {getProject, setProject, updateProject, deleteProject}