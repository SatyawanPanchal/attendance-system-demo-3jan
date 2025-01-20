 
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home.jsx'
import "react-toastify/ReactToastify.css"
import {ToastContainer} from 'react-toastify';
import {Routes,Route} from 'react-router-dom'
import ClasswiseAnalysis from './components/ClasswiseAnalysis/ClasswiseAnalysis';
import StudentWiseAnalysis from './pages/StudentAnalysis/StudentWiseAnalysis';
import AttendanceBook from './pages/TeachersAttendanceBook/AttendanceBook';
import MarkAttendance from './pages/MarkAttendance/MarkAttendance';

function App() {
 

  return (
   <>
   <div className="app-container">
   <ToastContainer/>
   <Navbar/>
<Routes>
<Route path='/' element={<Home/>}></Route>
  <Route path='/markAttendance' element={<MarkAttendance/>}></Route>
  <Route path='/classwise' element={<ClasswiseAnalysis/>}></Route>
  <Route path='/studentWise' element={<StudentWiseAnalysis/>} ></Route>
  <Route path='/teachersRegister' element={<AttendanceBook/>} ></Route>
</Routes>

   

   </div>

   </>
  )
}

export default App
