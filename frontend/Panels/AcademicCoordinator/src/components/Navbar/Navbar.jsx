import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
const Navbar = () => {
  const location = useLocation();
  console.log("Current Route:", location.pathname);
  return (
    <div className="submenu academicCoordinatorNavbar">
      <ul className="navbar-ul">
        <li className={location.pathname === "/" ? "active" : ""}>
          <Link to={"/"}>Home</Link>
        </li>
        <li className={location.pathname === "/addRollNumberRanges" ? "active" : ""}>
          <Link to={"/addRollNumberRanges"}>Add Roll Ranges</Link>
        </li>

        <li className={location.pathname === "/addTimeSlots" ? "active" : ""}>
          <Link to={"/addTimeSlots"}>Add Time Slots</Link>
        </li>

        <li className={location.pathname === "/addTimeTable" ? "active" : ""}>
          <Link to={"/addTimeTable"}>Add Time Table</Link>
        </li>
        <li className={location.pathname === "/addStudents" ? "active" : ""}>
          <Link to={"/addStudents"}>Add Students</Link>
        </li>

      

        <li className={location.pathname === "/Logout" ? "active" : ""}>
          <Link to={"/Logout"}>Log-Out</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;

 
 