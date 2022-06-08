import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import Homepage from './routes/homepage.jsx'
import Feedback from './routes/feedback.jsx'
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