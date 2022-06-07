import {useState, useEffect} from "react"
import ModalBox from './components/modal-box.jsx'
import UserDetailsForm from './components/userDetailsForm.jsx'
import FeedbackForm from "./components/feedbackForm.jsx";


// import axios from "axios";

const App = () => {
    const [feedback, setFeedback] = useState({
        full_name: 'test',
        designation: 'test',
        name_of_the_institution: 'test',
        email: 'test@test.com',
        is_anonymous: false,
        feedback: 'test',
        screenshot: null 
    });

    const [isUserDetailsSubmitted, setIsUserDetailsSubmitted] = useState(false);
    const [isUpdateReady, setIsUpdateReady] = useState(false);
    const [showModalBox, setShowModalBox]= useState(false);

    useEffect(()=>{
        if(isUpdateReady){
            console.log('feedback (in useEffect)', feedback);
            postFeedback();
            setIsUpdateReady(false);
        }
    },[feedback, isUpdateReady]);

    
    //-----called by UserDetailsForm Component.-----------------
    const  submitUserDetails = (data) => {
        setFeedback(prevState => ({
            ...prevState, ...data
        }));
        setIsUserDetailsSubmitted(true);

    }
    
    //-----------------called from FeedbackForm Component------------------------
    const submitFeedback = (data)=> {
        setIsUpdateReady(true);
        setFeedback(prevState => ({
            ...prevState, ...data
        }));

        console.log('feedback (after setState async)',feedback);

        setShowModalBox(false);
        setIsUserDetailsSubmitted(false);


    }

    //--------------send post request to BIPAD API-----------------------------
    const postToAPI = async (data)=> {
        const url = "https://bipaddev.yilab.org.np/api/v1/feedback/";
        await fetch( url, 
            {
            method: 'POST', 
            body: data
          }).then(res => {
              console.log('Feedback Submitted Successfully', res.data)
              window.alert('Feedback Submitted Successfully \n', res.data)
          }).catch(err=>{
              console.log('error occurred', err)
              window.alert('error occured \n', err)
          })
    }
    //---------------post the feedback object -----------------------------------
    const postFeedback = async ()=> {
        const fd = new FormData();
            fd.append('full_name', feedback.full_name);
            fd.append('designation', feedback.designation);
            fd.append('name_of_the_institution', feedback.name_of_the_institution);
            fd.append('email', feedback.email);
            fd.append('is_anonymous', feedback.is_anonymous);
            fd.append('feedback', feedback.feedback);
            fd.append('screenshot', feedback.screenshot, feedback.screenshot.name);

            postToAPI(fd);
    }

    //-----------------exit all forms and close the modal box---------------
    const handleCancelForm = () =>{
        setIsUserDetailsSubmitted(false);
        setShowModalBox(false);
    }

    //-------content for the modalbox, based on isUserDetailsSubmitted.-----------
    const ModalBoxContent = !isUserDetailsSubmitted ? 
                            <UserDetailsForm onUserDetailsSubmit={(data)=>submitUserDetails(data)} />
                            :
                            <FeedbackForm onFeedbackSubmit={(data)=>submitFeedback(data)} 
                                        onBackButton={()=> setIsUserDetailsSubmitted(false)}/>




  return (
      <div>
        <button id="btnRequestFeedback" className="btn" 
                onClick={()=>showModalBox ? setShowModalBox(false): setShowModalBox(true)}>
            Request Feedback Form
        </button>
        {
            showModalBox ? 
                <ModalBox body={ModalBoxContent} onCancel={handleCancelForm}/> 
                :<></>
        }
      </div> 
  )
}

export default App