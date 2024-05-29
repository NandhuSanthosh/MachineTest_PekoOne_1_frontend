const { createSlice } = require('@reduxjs/toolkit');


const initialState = {
    isLogged: false, 
    _id: "",
    email: "", 
    userName: "", 
    profilePicture: ""
}

const userSlice = createSlice({
    name: "user", 
    initialState, 
    reducers: {
        userLoggedIn(state, action){
            state.isLogged = true; 
            state._id = action.payload._id
            state.email = action.payload.email;
            state.userName = action.payload.userName
            state.profilePicture = action.payload.profilePicture
        }, 
        userLoggedOut(state, action){
            state.isLogged = false;
            state._id = "";
            state.email = "";
            state.userName = "";
            state.profilePicture = ""
        }
    }
})


export const { userLoggedIn, userLoggedOut } = userSlice.actions
export default userSlice.reducer;