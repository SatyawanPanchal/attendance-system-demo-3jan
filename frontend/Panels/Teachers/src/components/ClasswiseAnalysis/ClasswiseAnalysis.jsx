/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "./ClasswiseAnalysis.css";
import StudentAttendanceGraph from "../StudentGraphCompo/StudentAttendanceGraph";
import axios from "axios";
import Navbar from "../Navbar/Navbar";

const serverUrl = import.meta.env.VITE_SERVER_URL;
const ClasswiseAnalysis = () => {
  const [classSelected, setClassSelected] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [studentsData, setStudentsData] = useState([]);

  const handleClassChage = async (e) => {
    const { value } = e.target;
    setClassSelected(value);
  };
  const handleFromDate = (e) => {
    setFromDate(e.target.value);
    console.log("from date -->", e.target.value);
  };
  const handleToDate = (e) => {
    setToDate(e.target.value);
    console.log("To date -->", e.target.value);
  };

  useEffect(() => {
    const getPresentAbsentDataOfClassSelected = async (classSelected) => {
      try {
        console.log("we are in useEffect and classselected =", classSelected);
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

  return (
    <>
    <Navbar/>
    <div className="classwise-main-container">
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

        <div className="date-div">
          <label htmlFor="">From</label>
          <input
            type="date"
            name="from"
            value={fromDate}
            onChange={handleFromDate}
          />
        </div>
        <div className="date-div">
          <label htmlFor="">To</label>
          <input type="date" name="to" value={toDate} onChange={handleToDate} />
        </div>
      </div>

      <div className="graphs-container-div">
        {studentsData.map((student, index) => {
          console.log("student =", student.attendance);

          const attendaceFromServer = student.attendance;
          let present = 0;
          let absent = 0;

          for (const [date, status] of Object.entries(attendaceFromServer)) {
            if (status === "P") {
              present++;
            } else if (status === "A") {
              absent++;
            }
          }

          const studentInfo = {
            nameOfStudent: student.name,
            className: classSelected,
            classesConducted: present + absent,
            present: present,
            absent: absent,
          };
          return (
            <>
              <StudentAttendanceGraph key={index} studentInfo={studentInfo} />;
            </>
          );
        })}
      </div>
    </div>
    </>
  );
};

export default ClasswiseAnalysis;
