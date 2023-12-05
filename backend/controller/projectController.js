const asyncHandler = require('express-async-handler')

const Project = require('../models/projectModel')

//@route GET /api/projects
//@access Private
const getProject = asyncHandler(async (req,res) => {
    const projects = await Project.find()

    res.status(200).json(projects)
})

//@route POST /api/projects
//@access Private
const setProject = asyncHandler(async (req,res) => {
    if(!req.body.projectName){
        res.status(400).json({message : "Error occured."})
    }

    const project = await Project.create({
        projectName: req.body.projectName,
        projectDuration: req.body.projectDuration,
    })

    res.status(200).json(project)
})

//@route PUT /api/projects/:id
//@access Private
const updateProject = asyncHandler(async (req,res) => {
    console.log("PUT")
})

//@route DELETE /api/projects/:id
//@access Private
const deleteProject = asyncHandler(async (req,res) => {
    console.log("Delete")
})

module.exports = {getProject, setProject, updateProject, deleteProject}