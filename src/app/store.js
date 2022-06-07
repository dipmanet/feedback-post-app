import {configureStore} from '@reduxjs/toolkit'
import userDetailsReducer from '../components/userDetailsSlice'
import feedbackReducer from '../components/feedbackSlice'


export default configureStore({
    reducer: {
        userDetails: userDetailsReducer,
        feedbackData: feedbackReducer
    }
})