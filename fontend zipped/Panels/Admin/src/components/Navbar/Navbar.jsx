import { Link, useLocation } from "react-router-dom";
import './Navbar.css'
const Navbar = () => {
  const location = useLocation();
  console.log("Current Route:", location.pathname);
  return (
    <div className="submenu adminNavbar">

      <ul className="navbar-ul" >
        <li className={location.pathname === "/" ? "active" : ""}>
          <Link to={"/"}>Home</Link>
        </li>
        <li className={location.pathname === "/department" ? "active" : ""}>
          <Link to={"/department"}>Department</Link>
        </li>
        <li className={location.pathname === "/courses" ? "active" : ""}>
          <Link to={"/courses"}>Course</Link>
        </li>

        <li className={location.pathname === "/semAndSection" ? "active" : ""}>
          <Link to={"/semAndSection"}>Semester and Sections</Link>
        </li>


      
        <li className={location.pathname === "/teachers" ? "active" : ""}>
          <Link to={"/teachers"}>Teachers</Link>
        </li>

        <li className={location.pathname === "/logout" ? "active" : ""}>
          <Link to={"/logout"}>Log-Out</Link>
        </li>


        {/* <-------------------- Teacher and subject is commented intentially it may be used later on------------------> */}
        {/* <li className={location.pathname === "/teacherAndSubject" ? "active" : ""}>
          <Link to={"/teacherAndSubject"}>Teachers & Subject</Link>
        </li> */}
        {/* <Link to={"/"}>
          <li>Home</li>
        </Link> 
        <Link to={"/department"}>Department</Link>
        <Link to={"/courses"}>
          <li>Course</li>
        </Link>
        <Link to={"/subjects"}>
          <li>Subjects</li>
        </Link>
        <Link to={"/teachers"}>
          <li>Teachers</li>
        </Link>
        <Link to={"/teacherAndSubject"}>
          <li>Teachers & Subject</li>
        </Link> */}

      </ul>
    </div >
  );
};

export default Navbar;
