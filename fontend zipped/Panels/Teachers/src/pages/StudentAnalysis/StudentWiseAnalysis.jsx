import { useEffect, useState } from "react";
import "./StudentWiseAnalysis.css";
import axios from "axios";
import StudentAttendanceGraph from "../../components/StudentGraphCompo/StudentAttendanceGraph";
import Navbar from "../../components/Navbar/Navbar";

const serverUrl = import.meta.env.VITE_SERVER_URL;

const StudentWiseAnalysis = () => {
  const [classSelected, setClassSelected] = useState("");
  const [studentsData, setStudentsData] = useState([]);
  const [studentSelected, setStudentSelected] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [studentInfo, setSetudentInfo] = useState({
    nameOfStudent: "",
    className: classSelected, 
    present: 0,
    absent: 0,
    classesConducted: 0,
  });
  const [showGraph, setShowGraph] = useState(false);

  const handleClassChage = async (e) => {
    const { value } = e.target;
    setClassSelected(value);
  };

  const handleStudentChange = (e) => {
    const { value } = e.target;

    setStudentSelected(value);
    setShowGraph(false);
  };
  const handleShowGraphButtonClick = () => {
    setShowGraph(true);
    setStudentSelected("");
  };
  useEffect(() => {
    const getPresentAbsentDataOfClassSelected = async (classSelected) => {
      try {
        const res = await axios.post(
          `${serverUrl}/api/attendance/recordOfClass`,
          { classSelected }
        );

        if (res.data.success) {
          console.log("we are successful in fetching the data");
        }
        setStudentsData(res.data.students.students);
      } catch (err) {
        console.log(
          "got some error in  fetching data from server classwise--->",
          err.message
        );
      }
    };
    getPresentAbsentDataOfClassSelected(classSelected);
  }, [classSelected]);

  useEffect(() => {
    console.log("i am in useEffect and student selected =", studentSelected);

    studentsData.map((student) => {
      let present = 0;
      let absent = 0;

      for (const [, status] of Object.entries(student.attendance)) {
        if (status === "P") {
          present++;
        } else if (status === "A") {
          absent++;
        }
      }

      if (studentSelected === student.name) {
        studentInfo.nameOfStudent = studentSelected;
        studentInfo.className = classSelected;
        studentInfo.present = present;
        studentInfo.absent = absent;
        studentInfo.classesConducted = studentInfo.present + studentInfo.absent;
      }
    });
  }, [studentSelected]);

  return (
    <>
<Navbar/>
    <div className="student-wise-main-container">
      <div className="selections-div">
        <select onChange={handleClassChage} name="class" id="">
          <option value="">Select class</option>
          <option value="PreK">PRE-K</option>
          <option value="KS1">KS-1</option>
          <option value="KS2">KS-2</option>
          <option value="Class1">CLASS 1</option>
          <option value="Class2">CLASS 2</option>
          <option value="Class3">CLASS 3</option>
          <option value="">CLASS 4</option>
        </select>
      </div>
      <div className="student-Choosen-div">
        <select onChange={handleStudentChange} name="class" id="">
          <option>Select Student </option>
          {studentsData.map((student) => {
            return (
              <>
                <option value={student.name}>{student.name}</option>
              </>
            );
          })}
        </select>
      </div>

      <div className="find-student-div">
        <button onClick={() => handleShowGraphButtonClick()}>
          Find Attendance Details
        </button>
      </div>

      <div className="student-graph">
        {studentsData.map((student, index) => {
          return <div key={index}></div>;
        })}
      </div>
    </div>
    <div className="show-graph">
        {showGraph && <StudentAttendanceGraph studentInfo={studentInfo} />}

    </div>
    </>
  );
};

export default StudentWiseAnalysis;
