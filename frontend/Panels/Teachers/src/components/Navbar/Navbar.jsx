import './Navbar.css'
import {Link} from 'react-router-dom'
const Navbar = () => {
  
  
  
  return (
    <div className="navbar-div">
    <ul className="navbar-ul">

        <Link to={'/'}>
        teachers Home</Link>
        <Link to={'/markAttendance'}>Mark Attendance</Link>
        <Link to={'/classwise'}  >Classwise Analysis</Link>
        <Link to={'/studentWise'}>Student Anaysis </Link>
        <Link to={'/teachersRegister'} >Teachers Register</Link>
        <Link to={'/logout'}>Log-Out</Link>
        
        <li>Contact Us</li>
    </ul>
      
    </div>
  )
}

export default Navbar;



