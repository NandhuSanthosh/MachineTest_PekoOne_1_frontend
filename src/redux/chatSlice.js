const { createSlice } = require('@reduxjs/toolkit');


const initialState = {
    selectedChatId:  null,
    isGroup: null
}

const chatSlice = createSlice({
    name: "chat", 
    initialState, 
    reducers: {
        chatSelected(state, action){
            state.selectedChatId = action.payload.id
            state.isGroup = action.payload.isGroup
        }, 
        chatRemoved(state, action){
            state.selectedChatId = null
            state.isGroup = null
        }
    }
})


export const { chatSelected, chatRemoved } = chatSlice.actions
export default chatSlice.reducer;