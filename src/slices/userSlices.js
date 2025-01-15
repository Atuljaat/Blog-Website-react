import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status : false,
    userData : "",
}

let userSlice = createSlice({
    name : "user",
    initialState,
    reducers:{
        userLogIn : (state,action) => {
            state.status = true;
            state.userData = action.payload
        },
        userLogOut : (state,action) => {
            console.log('successfully logout')
            state.status = false;
            state.userData = "";
        }
    }
})


export const {userLogIn,userLogOut} = userSlice.actions
export default userSlice.reducer