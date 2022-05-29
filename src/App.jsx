import {useState} from "react"
import ModalBox from './components/modal-box.jsx'
import UserDetailsForm from './components/userDetailsForm.jsx'
import FeedbackForm from "./components/feedbackForm.jsx";


const App = () => {
    const [feedback, setFeedback] = useState({
        fullName: '',
        designation: 'test',
        nameOfTheInstitution: '',
        email: 'test@google.com',
        isAnonymous: false,
        feedback: 'test successful',
        // screenshot    
    });
    const [isUserDetailsSubmitted, setIsUserDetailsSubmitted] = useState(false);
    const [showModalBox, setShowModalBox]= useState(false);
    
    
    const  updateUserDetails = (data) => {
        console.log("UserDetails submitted state 1 ", isUserDetailsSubmitted)
        setFeedback(prevState => ({
            ...prevState, ...data
        }));
        setIsUserDetailsSubmitted(true);

    }

    const submitFeedback = (data)=> {
        setFeedback(prevState => ({
            ...prevState, ...data
        }))

        console.log("Feedback submitted state 2")
        console.log(feedback)

        setShowModalBox(false);
    }

    const ModalBoxContent = !isUserDetailsSubmitted ? 
                            <UserDetailsForm onUserDetailsSubmit={(data)=>updateUserDetails(data)}/>
                            :
                            <FeedbackForm onFeedbackSubmit={(data)=>submitFeedback(data)} />




  return (
      <div>
        <button id="btnRequestFeedback" className="btn" onClick={()=>setShowModalBox(true)}>Request Feedback Form</button>
        {
            showModalBox ? 
                <ModalBox body={ModalBoxContent} onCancel={()=>setShowModalBox(false)}/> 
                :<></>
        }
        
      </div> 
  )
}

export default App