import './feedbackForm.css'
import {useState} from 'react'
import {FaInfoCircle} from 'react-icons/fa'

const FeedbackForm = (props) => {

  // const [errors, setErrors] = useState({feedback:''});

  const handleSubmit =(e)=> {
    e.preventDefault();

    const feedback = document.forms['formFeedback']['feedback'].value;

    props.onFeedbackSubmit(feedback);
  }

    
  return (
    <form action="" id="formFeedback" className="feedback-form" onSubmit={handleSubmit}>
        <h1>Leave a feedback</h1>
        <h2>Kindly specify your feedback:</h2>
        <textarea  id="feedback" cols="30" rows="10" className="feedback" placeholder='Please Specify..'></textarea>
        <h3>Attach the screenshot:</h3>
        <div className="screenshot">
          <button id="btnScreenshot" className="btn screenshot-btn"><p>Choose File</p></button>
          <label htmlFor="btnScreenshot" className="screenshot-filename"><p>No file chosen</p></label>
        </div>
        <p className='error-status'><FaInfoCircle />Please choose a file less than 2MB </p>
        <div className='consent'>
          <input type="checkbox" id="chkboxIsConsent" /> 
          <label htmlFor="chkboxIsConsent">I hereby give my consent to store my personal details in BIPAD portal.</label>
        </div>
        <div className="btn-container">
          <button type="button" className="btn btn-primary">Cancel</button>
          <button type="submit" className="btn">Submit</button>
        </div>
    </form>
  )
}

export default FeedbackForm