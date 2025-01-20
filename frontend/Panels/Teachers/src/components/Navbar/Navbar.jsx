import './Navbar.css'
import { Link, useLocation } from "react-router-dom";
const Navbar = () => {
  const location = useLocation();


  return (
    <div className="submenu">
      <ul className="navbar-ul">

        <li className={location.pathname === "/" ? "active" : ""}> <Link to={'/'}>Teachers Home</Link></li>
        <li className={location.pathname === "/markAttendance" ? "active" : ""}> <Link to={'/markAttendance'}>Mark Attendance</Link></li>
        <li className={location.pathname === "/classwise" ? "active" : ""}> <Link to={'/classwise'}  >Classwise Analysis</Link></li>
        <li className={location.pathname === "/studentWise" ? "active" : ""}> <Link to={'/studentWise'}>Student Anaysis </Link></li>
        <li className={location.pathname === "/teachersRegister" ? "active" : ""}> <Link to={'/teachersRegister'} >Teachers Register</Link></li>
        <li className={location.pathname === "/logout" ? "active" : ""}> <Link to={'/logout'}>Log-Out</Link></li>
      </ul>

    </div>
  )
}

export default Navbar;