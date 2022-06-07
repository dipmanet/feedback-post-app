import {createSlice} from '@reduxjs/toolkit'

const initialState =     {
    data: {
        feedback: '',
        screenshot: null
      },

    errors: {feedback: '', screenshot: ''}
}



///////////////////////////////////////
const feedbackSlice = createSlice({
    name: 'feedbackData',
    initialState,
    reducers: {
        updateData (state, action) {
            state.data = action.payload
            console.log('data slice updated')
        },
        updateError (state, action){
            state.errors = action.payload
            console.log('errors slice updated')
        }
    }

})

export const { updateData, updateError } = feedbackSlice.actions
export default feedbackSlice.reducer