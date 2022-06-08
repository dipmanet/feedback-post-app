import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import Homepage from './components/homepage.jsx'
import Feedback from './components/feedback.jsx'
import './App.css'


const App = () => {
  return (
    <Router>
        <div>
            <Routes>
                <Route path='/' element={<Homepage />} />
                <Route path='/feedback' element={<Feedback />} />
            </Routes>
        </div>
    </Router>
  )
}

export default App