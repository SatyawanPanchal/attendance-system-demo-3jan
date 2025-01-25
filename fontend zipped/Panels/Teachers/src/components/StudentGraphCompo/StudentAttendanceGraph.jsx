/* eslint-disable react/prop-types */
 
import PieChart from '../PieChart/PieChart'
import './StudentAttendanceGraph.css'
const StudentAttendanceGraph =({studentInfo})  => {
  const{nameOfStudent,className,classesConducted,present,absent}=studentInfo
  const attendanceData={present:present,absent:absent}
    return (
    <div className='chart-with-info-div'>
    <div className="chart-display-div">

      <PieChart attendanceData={attendanceData}/>
    </div>
    <div className="student-info-div">

      <p>Name : {nameOfStudent}</p>
      <p>Class :{className}</p>
      <p>Classes Conducted :{classesConducted}</p>
      <p>Present:{present}</p>
      <p>Absent:{absent}</p>
    </div>
     
    </div>
  )
}
 
export default StudentAttendanceGraph;
