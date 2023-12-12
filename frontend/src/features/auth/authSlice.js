import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import authService from './authService'

//Get user from local storage (Token and other data)
const user = JSON.parse(localStorage.getItem('user'))

//User part or authentication
//Initial State
const initialState = {
    user: user ? user : null, //If user in local storage then use that else NULL
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

//Register User
//user is getting passed on from register component/page
export const register = createAsyncThunk('auth/register', async (user, thunkAPI)=>{
    try {
        return await authService.register(user)
    } catch (error) {
        //Error can be in Multiple places, Checking for multiple and putting in message variable
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.message || error.toString()
        //Reject and send the error message as the Payload
        return thunkAPI.rejectWithValue(message)
    }
})

//Login User
//user is getting passed on from login component/page
export const login = createAsyncThunk('auth/login', async (user, thunkAPI)=>{
    try {
        return await authService.login(user)
    } catch (error) {
        //Error can be in Multiple places, Checking for multiple and putting in message variable
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.message || error.toString()
        //Reject and send the error message as the Payload
        return thunkAPI.rejectWithValue(message)
    }
})

export const logout = createAsyncThunk('auth/logout', async () => {
    await authService.logout()
})

//Creating a Slice
export const authSlice = createSlice({
    name: 'auth',
    //State (In variable above)
    initialState,
    //Reducers
    reducers: {
        //Reducer actions
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        }
    },
    //it is async thunk function so pending(fulfilled or rejected) state is handled in extrareducers
    extraReducers: (builder) => {
        builder
            //What to do when the register action is pending.
            .addCase(register.pending, (state)=>{
                state.isLoading = true
            })
            //When register action is fulfilled. action for getting data back(user, token)
            .addCase(register.fulfilled, (state,action)=>{
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(register.rejected, (state,action)=>{
                state.isLoading= false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(login.pending, (state)=>{
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state,action)=>{
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(login.rejected, (state,action)=>{
                state.isLoading= false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(logout.fulfilled, (state)=>{
                state.user = null
            })
    }
})

//Exporting reset that is inside of a reducers in the authSlice
export const {reset} = authSlice.actions 

export default authSlice.reducer