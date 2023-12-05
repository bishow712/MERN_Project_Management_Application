const asyncHandler = require('express-async-handler')


//@route GET /api/projects
//@access Private
const getProject = asyncHandler(async (req,res) => {
    console.log("GET")
})

//@route POST /api/projects
//@access Private
const setProject = asyncHandler(async (req,res) => {
    console.log("POST")
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