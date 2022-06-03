import './feedbackForm.css'
import {useState} from 'react'
// import {FaInfoCircle} from 'react-icons/fa'

const FeedbackForm = (props) => {
  const [errors, setErrors] = useState({feedback:'', screenshot:''});

  const handleSubmit = async (e)=> {
    e.preventDefault();

    //--------check if the chkboxIsConsent is checked------------
    const isConsent = document.forms['formFeedback']['chkboxIsConsent'].checked;
    if(!isConsent){
      window.alert('You need to provide consent first.');
      return;
    }

    const inputData = {
      feedback: document.forms['formFeedback']['feedback'].value,
      screenshot: document.forms['formFeedback']['imgScreenshot'].files[0]
    }

    if(validateForm(inputData)){
      props.onFeedbackSubmit(inputData);
      console.log('Feedback submitted successfully', inputData)
    }
  }
  //------------------------------------------------------

  //---------------go back to user details form----------
  const handleBackButton = e => {
    document.getElementById('formFeedback').reset();
    props.onBackButton(); 
  }
  //-----------------------------------------------------

  //----------------validation code---------------------
  const validateForm = data => {
    let isValid = true;
    let E = errors;
    //--
    if(data.feedback===''){ E.feedback = 'Please provide us your feedback.'}
    else if(data.feedback.length >150){E.feedback = 'Too long feedback'}
    else {E.feedback = ''}

    if(!data.screenshot){E.screenshot='Please provide a screenshot'}
    else {
      const fsize = Math.round(data.screenshot.size / 1024)
      const img = data.screenshot.name;
      const imgExt = img.substring(img.lastIndexOf('.')+1);

      console.log('image file size', fsize)
      console.log( 'imag extension',imgExt)

      if(imgExt !=='png' && imgExt !=='jpeg'){E.screenshot = 'Image extension '+ imgExt + 'is not supported. Only .png or .jpeg format are allowed.'}
      else if(fsize > 3072){ E.screenshot = 'Image file, too big. Please choose a file less than 3MB'}
      else {E.screenshot=''}
    }
  
    //--------------------------------------------------

    if(E.feedback !== "" ||  E.screenshot !== ""){
      isValid = false;
    }

    console.log('form validation:', isValid)
    console.log('error State during validation ', E)
    setErrors(p=>({...E}));
    return isValid;
  }
//-----------------------------------------------------------------

  return (
    <form action="" id="formFeedback" className="feedback-form" onSubmit={handleSubmit}>
        <h1>Leave a feedback</h1>
        <h2>Kindly specify your feedback:</h2>
        <textarea  id="feedback" cols="30" rows="10" className="feedback" placeholder='Please Specify..'></textarea>
        <p className='error-status'>{errors.feedback}</p>

        <h3>Attach the screenshot:</h3>
        <div className="screenshot">
          <input id="imgScreenshot" type="file" accept="image/*" />
        </div>
        <p className='error-status'>{errors.screenshot}</p>

        <div className='consent'>
          <input type="checkbox" id="chkboxIsConsent" /> 
          <label htmlFor="chkboxIsConsent">I hereby give my consent to store my personal details in BIPAD portal.</label>
        </div>
        <div className="btn-container">
          <button type="button" className="btn btn-back" onClick={handleBackButton}>Back</button>
          <button type="submit" className="btn" >Submit</button>
        </div>
    </form>
  )
}

export default FeedbackForm