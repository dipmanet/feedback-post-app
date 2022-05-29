import {useState} from 'react'
import './userDetailsForm.css'

const UserDetailsForm = (props) => {
  const [errors, setErrors] = useState({fullName:"",designation:"", nameOfTheInstitution: "", email:""});

  const handleSubmit = (e) => {
    e.preventDefault();

    const fullName = document.forms['formUserDetails']['fullName'].value;
    const designation = document.forms['formUserDetails']['designation'].value;
    const nameOfTheInstitution = document.forms['formUserDetails']['nameOfTheInstitution'].value;
    const email = document.forms['formUserDetails']['email'].value;

    const userDetails ={
      fullName: fullName, 
      designation: designation, 
      nameOfTheInstitution: nameOfTheInstitution, 
      email: email
    };

    // if(!validated){
    //   return;
    // }
    // console.log(!fullName)
    // console.log(errors)
    props.onUserDetailsSubmit(userDetails);
  } 

  const validated = (userDetails)=>{
    // const pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    if(userDetails.fullName.length===0){
      setErrors({fullName:"* Your Name is Required",...errors});
    }
    else if(userDetails.fullName.length>20){setErrors({fullName:"Your Name cannot be longer than 20 letters."})}
    if(!userDetails.email){setErrors({email:"*Your Email is Required"})}
    else if(userDetails.email.length>30){setErrors({email:"Your email address cannot be longer than 30 letters."})}
    // else if(!pattern.test(email)) {setErrors({email:"Please enter a valid email address"})}

    return (!errors.fullName && !errors.designation && !errors.nameOfTheInstitution && !errors.email);
  }


  return (
    // <div className="feedback__form-container">
    //   <div className="side">
    //     <h1>Technical Support Request</h1>
    //     <p>To request for technical support regarding BIPAD portal</p>
    //     <button className="btn btn-primary">
    //       Technical Support Request Form
    //     </button>
    //   </div>
    // </div>
      <form  action="" id="formUserDetails" className="user-details-form" onSubmit={handleSubmit}>
        <h1>Please provide the following details:</h1>
        <input type="text" id="fullName" 
              placeholder='Full Name' />
        <p className="error-status"></p>
        <label htmlFor="fullName"></label>
        <input type="text" id="designation" 
              placeholder='Designation(eg.IT Officer)' />
        <label htmlFor="designation">{errors.designation}</label>
        <input type="text" id="nameOfTheInstitution" 
              placeholder='Name of the Institution'  />
        <label htmlFor="nameOfTheInstitution">{errors.nameOfTheInstitution}</label>
        <input type="email" id="email" placeholder='Official Email' />
        <label htmlFor="email">{errors.email}</label>
        <h3>Select ANONYMOUS if you do not want to provide your personal details.</h3>
        <div className='anonymous'>
          <input type="checkbox" id="isAnonymous" /> <label htmlFor="isAnonymous">Anonymous</label>
        </div>
        <div className="btn-container">
          <button type="submit" className="btn">Next</button>
        </div>

      </form>
  )
}

export default UserDetailsForm