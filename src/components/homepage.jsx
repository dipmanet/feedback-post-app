import React from 'react'
import {Link} from 'react-router-dom'

const Homepage = () => {
  return (
    <div>
      <nav className='app-navbar'>
        <li>
            <Link to='/'>Homepage</Link>
        </li>
        <li>
            <Link to='/feedback'>Feedback</Link>
        </li>
      </nav>
      <h1>Welcome to BIPAD Portal</h1>
    </div>

  )
}

export default Homepage