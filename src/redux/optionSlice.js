const { createSlice } = require('@reduxjs/toolkit');


const initialState = {
    option: "ALL"
}

const optionSlice = createSlice({
    name: "option", 
    initialState, 
    reducers: {
        setAll(state) {
            state.option = "ALL"
        },
        setGroup(state) {
            state.option = "GROUP"
        },
        setIndividual(state) {
            state.option = "INDIVIDUAL"
        },
        setSearch(state) {
            state.option = "SEARCH"
        }
    }
})



export const { setAll, setGroup, setIndividual, setSearch } = optionSlice.actions
export default optionSlice.reducer;