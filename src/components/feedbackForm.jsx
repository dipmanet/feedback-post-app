import './feedbackForm.css'
import {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { updateData, updateError} from './feedbackSlice'

const FeedbackForm = (props) => {
  // const [data, setData] = useState({feedback:'', screenshot:''});
  // const [errors, setErrors] = useState({feedback:'', screenshot:''});

  const dispatch = useDispatch()
  const data = useSelector(state => state.feedbackData.data)
  const errors = useSelector(state => state.feedbackData.errors)
  const [isConsent, setIsConsent] = useState(false)


  console.log('data from slice', data)
  console.log('errors from slice', errors)


  const handleSubmit = async (e)=> {
    e.preventDefault();

    
    
    
    if(validateForm()){
      //--------check if the chkboxIsConsent is checked------------
      if(!isConsent){
        window.alert('You need to provide consent first.');
        return;
      }
      //-------------pass feedback data up--------------------
      props.onFeedbackSubmit(data);
      console.log('Feedback submitted successfully', data)
      window.alert('Thank you for your feedback.')
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
  const validateForm = () => {
    let isValid = true;
    let E = {...errors};
    //--
    if(data.feedback===''){ E.feedback = 'Please provide us your feedback.'}
    else if(data.feedback.length >150){E.feedback = 'Too long   feedback'}
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
    // setErrors(p=>({...E}));
    dispatch(updateError({...E}))
    return isValid;
  }
//-----------------------------------------------------------------

  return (
    <form action="" id="formFeedback" className="feedback-form" onSubmit={handleSubmit}>
        <h1>Leave a feedback</h1>
        <h2>Kindly specify your feedback:</h2>
        <textarea value={data.feedback}  id="feedback" cols="30" rows="10" className="feedback" placeholder='Please Specify..'
                onChange={(e)=>dispatch(updateData({...data, feedback: e.target.value}))}
        />
          
        
        <p className='error-status'>{errors.feedback}</p>

        <h3>Attach the screenshot:</h3>
        <div className="screenshot">
          <input id="imgScreenshot" type="file" accept="image/*" 
              onChange={(e)=>dispatch(updateData({...data, screenshot: e.target.files[0]}))}
          />
        </div>
        <p className='error-status'>{errors.screenshot}</p>



        <div className='consent'>
          <input type="checkbox" id="chkboxIsConsent" checked={isConsent} 
                onChange={()=> isConsent ? setIsConsent(false): setIsConsent(true)}/> 
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