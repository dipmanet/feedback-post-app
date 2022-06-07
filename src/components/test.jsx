import React from 'react'
import { useSelector, useDispatch } from "react-redux"

const testApp = ()=>{
    const dispatch = useDispatch()
    const test =useSelector(state => state.userDetails )
    console.log('getting state from redux libray:')


}
export default testApp