import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import optionReducer from './optionSlice'
import chatReducer from './chatSlice'


export const store = configureStore({
    reducer: {
        user: userReducer, 
        option: optionReducer, 
        chat: chatReducer
    }
})