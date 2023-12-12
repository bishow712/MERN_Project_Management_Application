//For HTTP requests (Does all HTTP work)
//Axios for HTTP request (Like Postman, ThunderClient)

import axios from 'axios'

//Frontend is in port 3000 and backend is in port 5000
//In frontend package.json "proxy" is used to redirect to port 5000 for backend call
const API_URL = '/api/users/'

//Register User
const register = async (userData) =>{
    const response = await axios.post(API_URL, userData)

    //Axios puts data inside the object called .data
    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

//login User
const login = async (userData) =>{
    const response = await axios.post(API_URL + 'login', userData) //Hit the login endpoint

    //Axios puts data inside the object called .data
    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

//Logout User
const logout = ()=>{
    localStorage.removeItem('user')
}

//Functions we want to export goes here
const authService = {
    register,
    logout,
    login
}

export default authService