import { Route, Routes } from "react-router-dom";
import Home from "../Panels/Admin/src/components/pages/Home/Home.jsx";

import "./App.css";
import Departments from "../Panels/Admin/src/components/pages/Departments/Departments.jsx";
import Courses from "../Panels/Admin/src/components/pages/Courses/Courses.jsx";
import Teachers from "../Panels/Admin/src/components/pages/Teachers/Teachers.jsx";
import SemAndSections from "../Panels/Admin/src/components/pages/SemAndSections/SemAndSections.jsx";

// import LoginRegister from "./AppComponents/Login-Register/LoginRegister.jsx";
import { useContext , useState } from "react";
import { AuthContext } from "./AppComponents/Context/AuthContext/AuthContext.jsx";
import MarkAttendance from "../Panels/Teachers/src/pages/MarkAttendance/MarkAttendance.jsx";
import ClasswiseAnalysis from "../Panels/Teachers/src/components/ClasswiseAnalysis/ClasswiseAnalysis.jsx";
import StudentWiseAnalysis from "../Panels/Teachers/src/pages/StudentAnalysis/StudentWiseAnalysis.jsx";
import AttendanceBook from "../Panels/Teachers/src/pages/TeachersAttendanceBook/AttendanceBook.jsx";
import TeachersHome from "../Panels/Teachers/src/pages/Home/TeachersHome.jsx";
import Logout from "../Panels/Admin/src/components/pages/Logout/Logout.jsx";
import AcademicCoordinatorHome from "../Panels/AcademicCoordinator/src/pages/Home/AcademicCoordinatorHome.jsx";
import AddRollNumberRanges from "../Panels/AcademicCoordinator/src/pages/AddRollNumberRanges/AddRollNumberRanges.jsx";
import AddTimeSlots from "../Panels/AcademicCoordinator/src/pages/AddTimesSlots/AddTimeSlots.jsx";
import AddTimeTable from "../Panels/AcademicCoordinator/src/pages/AddTimeTable/AddTimeTable.jsx";
import AddStudents from "../Panels/AcademicCoordinator/src/pages/AddStudents/AddStudents.jsx";
import AddSubjects from "../Panels/AcademicCoordinator/src/components/addSubjects/AddSubjects.jsx";
import AffixTeacherWithSubject from "../Panels/AcademicCoordinator/src/components/AffixTeacherWithSubject/AffixTeacherWithSubject.jsx";

const App = () => {
  const { userDetails } = useContext(AuthContext);
  // eslint-disable-next-line no-unused-vars
  const [loginStatus, setLoginStatus] = useState(true);
 // const user = userDetails.userName; // get from context
 // const userRole = userDetails.userRole;
 

const [nameAndRole,setNameAndRole]=useState({
  name:"",
  role:"",
})
const handleChange=(e)=>{
  const {name,value}=e.target;
  setNameAndRole((prevData)=>({
    ...prevData,
    [name]:value,
  }))

}



  return (
    <>
    <div className="elements">

    <label htmlFor="">Enter name</label>
    <input type="text" name="name" value={nameAndRole.name} onChange={handleChange} />
    </div>
    <div className="elements">

    <label htmlFor="">Enter role</label>
    <input type="text" name="role" value={nameAndRole.role} onChange={handleChange} />
    </div>
    
      {nameAndRole.name} is logged in as {nameAndRole.role}
      {/* {!user && <LoginRegister setLoginStatus={setLoginStatus} />} */}
      {(nameAndRole.role === "Admin" || nameAndRole.role === "SuperUser") && (
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/department" element={<Departments />}></Route>
          <Route path="/courses" element={<Courses />}></Route>
          <Route path="/semAndSection" element={<SemAndSections />}></Route>
          <Route path="/teachers" element={<Teachers />}></Route>
          <Route path="/logout" element={<Logout />}></Route>
        </Routes>
      )}
      {nameAndRole.role === "Teacher" && (
        <Routes>
          <Route path="/" element={<TeachersHome />}></Route>
          <Route path="/markAttendance" element={<MarkAttendance />}></Route>
          <Route path="/classwise" element={<ClasswiseAnalysis />}></Route>
          <Route path="/studentWise" element={<StudentWiseAnalysis />}></Route>
          <Route path="/teachersRegister" element={<AttendanceBook />}></Route>
          <Route path="/logout" element={<Logout />}></Route>
        </Routes>
      )}
      {nameAndRole.role === "AcademicCoordinator" && (
        <Routes>
          <Route path="/" element={<AcademicCoordinatorHome />}></Route>
          <Route path="/subjects" element={<AddSubjects />}></Route>
          <Route path="/teacherAndSubject" element={<AffixTeacherWithSubject/>}></Route>
          <Route
            path="/addRollNumberRanges"
            element={<AddRollNumberRanges />}
          ></Route>
          <Route path="/addTimeSlots" element={<AddTimeSlots />}></Route>
          <Route path="/addTimeTable" element={<AddTimeTable />}></Route>
          <Route path="/addStudents" element={<AddStudents />}></Route>

          <Route path="/logout" element={<Logout />}></Route>
        </Routes>
      )}
    </>
  );
};
export default App;
