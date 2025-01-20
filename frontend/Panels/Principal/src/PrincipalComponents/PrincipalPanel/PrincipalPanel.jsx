import { Route, Routes } from "react-router-dom"
import Navbar from "../../../../Teachers/src/components/Navbar/Navbar"
import MarkAttendance from "../../../../Teachers/src/pages/MarkAttendance/MarkAttendance"
import ClasswiseAnalysis from "../../../../Teachers/src/components/ClasswiseAnalysis/ClasswiseAnalysis"
import StudentWiseAnalysis from "../../../../Teachers/src/pages/StudentAnalysis/StudentWiseAnalysis"
import AttendanceBook from "../../../../Teachers/src/pages/TeachersAttendanceBook/AttendanceBook"
import Home from "../../../../Teachers/src/pages/Home/Home"

 

const PrincipalPanel = () => {
  return (
    <div>
      <Navbar/>
<Routes>
<Route path='/' element={<Home/>}></Route>
  <Route path='/markAttendance' element={<MarkAttendance/>}></Route>
  <Route path='/classwise' element={<ClasswiseAnalysis/>}></Route>
  <Route path='/studentWise' element={<StudentWiseAnalysis/>} ></Route>
  <Route path='/teachersRegister' element={<AttendanceBook/>} ></Route>
</Routes>

    </div>
  )
}

export default PrincipalPanel
