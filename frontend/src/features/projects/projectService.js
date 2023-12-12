//For HTTP requests (Does all HTTP work)
//Axios for HTTP request (Like Postman, ThunderClient)

import axios from 'axios'

//Frontend is in port 3000 and backend is in port 5000
//In frontend package.json "proxy" is used to redirect to port 5000 for backend call
const API_URL = '/api/projects/'

//Create new project
const createProject = async (projectData, token) =>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }

    const response = await axios.post(API_URL, projectData, config)

    return response.data
}

//Get user projects
const getProjects = async (token) =>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }

    const response = await axios.get(API_URL, config)

    return response.data
}

//Delete user project
const deleteProject = async (projectId, token) =>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }

    const response = await axios.delete(API_URL + projectId, config)

    return response.data
}

//Functions we want to export goes here
const projectService = {
    createProject,
    getProjects,
    deleteProject,
}

export default projectService