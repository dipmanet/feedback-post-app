import {createSlice} from '@reduxjs/toolkit'

const initialState =     {
    userDetails: {
        full_name:"",
        designation:"", 
        name_of_the_institution: "", 
        email:""
      },
    errors: {full_name:"",designation:"", name_of_the_institution: "", email:""}
}



///////////////////////////////////////
const userDetailsSlice = createSlice({
    name: 'userDetails',
    initialState,
    reducers: {
        updateUserDetails (state, action) {
            state.userDetails = action.payload
            console.log('userDetails slice updated')
        },
        updateError (state, action){
            state.errors = action.payload
            console.log('errors slice updated')
        }
    }

})

export const { updateUserDetails, updateError } = userDetailsSlice.actions
export default userDetailsSlice.reducer