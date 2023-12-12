import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import projectService from './projectService'

//Get user from local storage (Token and other data)
// const project = JSON.parse(localStorage.getItem('project'))

//User part or authentication
//Initial State
const initialState = {
    projects: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

//Create new Project
export const createProject = createAsyncThunk('projects/create', async(projectData, thunkAPI)=>{
    try {
        //Projects are protected soo fetching token
        const token = thunkAPI.getState().auth.user.token
        return await projectService.createProject(projectData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//Get User Project
export const getProjects = createAsyncThunk('projects/getAll', async (_,thunkAPI)=>{
    try {
        const token = thunkAPI.getState().auth.user.token
        return await projectService.getProjects(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//Delete user Project
export const deleteProject = createAsyncThunk('projects/delete', async(id, thunkAPI)=>{
    try {
        //Projects are protected soo fetching token
        const token = thunkAPI.getState().auth.user.token
        return await projectService.deleteProject(id, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//Creating a Slice
export const projectSlice = createSlice({
    name: 'project',
    //State (In variable above)
    initialState,
    //Reducers
    reducers: {
        //Reducer actions
        reset: (state) => initialState,
    },
    //it is async thunk function so (pending, fulfilled or rejected) state is handled in extrareducers
    extraReducers: (builder) => {
        builder
            .addCase(createProject.pending, (state)=>{
                 state.isLoading = true
            })
            .addCase(createProject.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.projects.push(action.payload)
            })
            .addCase(createProject.rejected, (state,action)=>{
                state.isLoading=false
                state.isError=true
                state.message = action.payload
            })
            .addCase(getProjects.pending, (state)=>{
                state.isLoading = true
           })
           .addCase(getProjects.fulfilled, (state, action) => {
               state.isLoading = false
               state.isSuccess = true
               state.projects = action.payload
           })
           .addCase(getProjects.rejected, (state,action)=>{
               state.isLoading=false
               state.isError=true
               state.message = action.payload
           })
           .addCase(deleteProject.pending, (state)=>{
                state.isLoading = true
           })
           .addCase(deleteProject.fulfilled, (state, action) => {
               state.isLoading = false
               state.isSuccess = true
               state.projects = state.projects.filter((project) => project._id !== action.payload.id) 
           })
           .addCase(deleteProject.rejected, (state,action)=>{
               state.isLoading=false
               state.isError=true
               state.message = action.payload
           })
    }
})

//Exporting reset that is inside of a reducers in the authSlice
export const {reset} = projectSlice.actions 

export default projectSlice.reducer