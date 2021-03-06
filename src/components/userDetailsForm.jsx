import {useEffect, useState} from 'react'
import './userDetailsForm.css'

const UserDetailsForm = (props) => {
  const userInitialState = {
    full_name:"",
    designation:"", 
    name_of_the_institution: "", 
    email:""
  };
  const [userDetails, setUserDetails] = useState(userInitialState);
  const [errors, setErrors] = useState({full_name:"",designation:"", name_of_the_institution: "", email:""});
  const [Anonymous, setAnonymous] = useState(false);

  useEffect(()=>{
    if(Anonymous){
      setUserDetails({full_name:"",designation:"", name_of_the_institution: "", email:"", is_anonymous:true})
      setErrors({full_name:"",designation:"", name_of_the_institution: "", email:""})
    }
  }, [Anonymous])


  //----------------called on submission-----------------
  const handleSubmit =  async (e) => {
    e.preventDefault();

    if(validateForm()|| Anonymous){
      console.log('data referennced to App.jsx :', userDetails)
      props.onUserDetailsSubmit(userDetails)
    }
  }


  //------------------code for Validation---------------------
  const validateForm = ()=> {
    
    let U = userDetails;
    let E = errors;
    let isValid = true;
    const pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);


    //-------------------------------------------------------------------------//
    if(U.full_name==='')
      { E.full_name= '* Name is required'}
    else if(U.full_name.length > 30)
      { E.full_name="Name cannot be longer than 30 letters."}
    else 
      {E.full_name=""}
    //----------------------------------------
    if(U.designation.length > 30)
      { E.designation= 'Designation cannot be longer than 30 letters.'}
    else
      { E.designation =''}
    //----------------------------------------
    if(U.name_of_the_institution.length > 30)
      { E.name_of_the_institution = 'Name of institution cannot be longer than 30 letters'}
    else
      { E.name_of_the_institution = ''}
    //----------------------------------------
    if(U.email==='')
      {E.email="* Your Email is required"}
    else if(U.email.length > 30)
      {E.email="Your email address cannot be longer than 30 letters."}
    else if(!pattern.test(U.email)) 
      {E.email= "Please enter a valid email address"}
    else {E.email=""}
    //------------------------------------------------------------------------//


    if(E.full_name !== "" ||  E.designation !== "" || E.name_of_the_institution !== "" ||  E.email !== ""){
      isValid = false;
    }
    console.log('form validation:', isValid)
    console.log('during validation', E)

    setErrors(p=>({...E}));
    return isValid;
  }


  return (
    <form  action="" method="post" id="formUserDetails" className="user-details-form" onSubmit={handleSubmit}>
      <h1>Please provide the following details:</h1>

      <input type="text" id="full_name" disabled={Anonymous} 
            placeholder='Full Name' 
            value={userDetails.full_name}
            onChange={(e)=>setUserDetails(p=>({...p, full_name: e.target.value}))} />
      <p className="error-status">{errors.full_name}</p>

      <input type="text" id="designation" disabled={Anonymous} 
            placeholder='Designation(eg.IT Officer)' 
            value={userDetails.designation}
            onChange={(e)=>setUserDetails(p=>({...p, designation: e.target.value}))} />
      <p htmlFor="designation" className="error-status">{errors.designation}</p>

      <input type="text" id="name_of_the_institution" disabled={Anonymous} 
            placeholder='Name of the Institution'  
            value={userDetails.name_of_the_institution}
            onChange={(e)=>setUserDetails(p=>({...p, name_of_the_institution: e.target.value}))} />
      <p className="error-status">{errors.name_of_the_institution}</p>
      
      <input type="email" id="email" disabled={Anonymous} 
            placeholder='Official Email' 
            value={userDetails.email}
            onChange={(e)=>setUserDetails(p=>({...p, email: e.target.value}))} />
      <p  className="error-status">{errors.email}</p>

      <h3>Select ANONYMOUS if you do not want to provide your personal details.</h3>
      <div className='anonymous'>
        <input type="checkbox" id="is_anonymous" checked={Anonymous}
           onChange={()=> Anonymous ? setAnonymous(false): setAnonymous(true)}/>
        <label htmlFor="is_anonymous">Anonymous</label>
      </div>

      <div className="btn-container">
        <button type="submit" className="btn">Next</button>
      </div>

    </form>
  )
}

export default UserDetailsForm