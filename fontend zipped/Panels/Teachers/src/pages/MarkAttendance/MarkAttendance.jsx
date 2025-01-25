import { useContext, useEffect, useState } from "react";
import axios from "axios";

import { toast } from "react-toastify";
import "./MarkAttendance.css";
import {
  classPreK,
  classKS1,
  classKS2,
  classClass1,
  classClass2,
  classClass3,
} from "../../assets/studentsListClasswise.js";
import PieChart from "../../components/PieChart/PieChart.jsx";
import Test from "../../components/Test/Test.jsx";
import Navbar from "../../components/Navbar/Navbar.jsx";
import { AuthContext } from "../../../../../src/AppComponents/Context/AuthContext/AuthContext.jsx";

const serverUrl = import.meta.env.VITE_SERVER_URL;

const MarkAttendance = () => {
  const { userDetails } = useContext(AuthContext);

  const [classSelected, setClassSelected] = useState("");
  const [studentsList, setStudentsList] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [attendance, setAttendance] = useState({});
  const [presentStatus, setPresentStatus] = useState({ present: 0, absent: 0 });
  const [dayOfWeek, setDayOfWeek] = useState("");

  // finding the day from day
  const getDayOfWeek = (dateString) => {
    const date = new Date(dateString); // Create a Date object
    const days = [
      "SUNDAY",
      "MONDAY",
      "TUESDAY",
      "WEDNESDAY",
      "THURSDAY",
      "FRIDAY",
      "SATURDAY",
    ];
    return days[date.getDay()]; // Get the day of the week
  };

  // handling the change in any day ...
  const handleChage = async (e) => {
    const { value } = e.target;
    console.log("class selected =====>", value);
    setClassSelected(value);
    setSelectedDate("");

    if (value === "PreK") {
      setStudentsList(classPreK.students);
    } else if (value === "KS1") {
      setStudentsList(classKS1.students);
    } else if (value === "KS2") {
      setStudentsList(classKS2.students);
    } else if (value === "Class1") {
      setStudentsList(classClass1.students);
    } else if (value === "Class2") {
      setStudentsList(classClass2.students);
    } else if (value === "Class3") {
      setStudentsList(classClass3.students);
    }
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setSelectedDate(value);
    setAttendance({});

    console.log("date--->", name, value);
    if (studentsList && studentsList.length > 0) {
      setAttendance((prevAttendance) => {
        const newAttendance = { ...prevAttendance };

        studentsList.forEach((student) => {
          if (!newAttendance[student.roll]) {
            newAttendance[student.roll] = {};
          }
          newAttendance[student.roll][value] = "P";
        });

        return newAttendance;
      });
    }
  };

  const handleAttendanceClick = (roll) => {
    if (!selectedDate) {
      alert("Please select the date first");
      return;
    }

    setAttendance((prevAttendance) => ({
      ...prevAttendance,
      [roll]: {
        ...prevAttendance[roll],
        [selectedDate]:
          prevAttendance[roll]?.[selectedDate] === "P" ? "A" : "P",
      },
    }));
  };

  //fetching the teachers classes on loading first time

  useEffect(() => {
    //console.log("email id of ", userDetails.emailId);
  }, []);

  useEffect(() => {
    function attendanceFinder(attendanceRecord, date) {
      let presentCount = 0;
      let absentCount = 0;

      // Iterate through each student's attendance record
      // eslint-disable-next-line no-unused-vars
      for (const [roll, records] of Object.entries(attendanceRecord)) {
        if (records[date] === "P") {
          presentCount++;
        } else if (records[date] === "A") {
          absentCount++;
        }
      }

      setPresentStatus({ present: presentCount, absent: absentCount });

      return { presentCount, absentCount };
    }

    attendanceFinder(attendance, selectedDate);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attendance]);

  useEffect(() => {
    console.log('selected date is changed❤️');
    
    const day=getDayOfWeek(selectedDate);
    setDayOfWeek(day)
    console.log(`day on selected date ${day}`);
    

    //  function to send a req to server that if there is any class on this day then send the class names
    const fetchClasseNamesForTheDay = async () => {
      try {
        const response = await axios.post(
          `${serverUrl}/api/teachers/getClasseNamesForTheDay`,
          { day: day , emailId: userDetails.emailId }
        );
if(response.data.success)
{

}else{
  alert(response.data.message);
}

        console.log("response of ... fetchClassnames-->", response.data);
      } catch (error) {
        console.log("error we got in fetching classes   ", error.message);
      }
    };

    fetchClasseNamesForTheDay()
  }, [selectedDate]);

  // fetching the class Names of students of the class on first load of the marks

  const submitAttendance = async () => {
    const res = await axios.post(
      `${serverUrl}/api/attendance/save-attendance`,
      { studentsList, selectedDate, classSelected, attendance }
    );

    toast.success(res.data.message);
    console.log("message from backend :", res.data.message);
    //   setAttendance({});
    setSelectedDate("");
  };
  return (
    <>
      <Navbar />
      <div className="home-div main_container">
        {/* containing the lecture selection */}
        <form className="attendance-form" action="">
          {/* select date ... */}

          <div className="elements">
            <label htmlFor="">Select the date</label>
            <Test
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          </div>

          <div className="elements">
            <label htmlFor="">Select the class</label>

            <select onChange={handleChage} name="class" id="">
              <option value="">Select Your class</option>
            </select>
          </div>
          {classSelected && (
            <input
              type="date"
              name="datePicker"
              value={selectedDate}
              onChange={handleDateChange}
            />
          )}
        </form>

        {/* displaying the table of class students on the basis of class slected */}
        <div className="student-table-container">
          <h1>Student List-{classSelected}</h1>

          <table className="student-table">
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Name</th>
                <th>Roll Number</th>
                <th>Attendance</th>
              </tr>
            </thead>
            <tbody>
              {classSelected && selectedDate ? (
                studentsList.map((student, index) => (
                  <tr key={index}>
                    <td>{student.s_no}</td>
                    <td>{student.name}</td>
                    <td>{student.roll}</td>
                    <td>
                      <button
                        name="attbtn"
                        value={attendance[student.roll]?.[selectedDate] || "P"}
                        className={
                          attendance[student.roll]?.[selectedDate] === "P"
                            ? "present-button"
                            : "absent-button "
                        }
                        onClick={() => handleAttendanceClick(student.roll)}
                      >
                        {" "}
                        {attendance[student.roll]?.[selectedDate] || "P"}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">
                    <h1>Please select a proper class and date</h1>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Attendance submission button */}
        <div className="submit-div">
          <button
            className="absent-button submit-button"
            onClick={() => submitAttendance()}
          >
            Submit Attendance
          </button>
        </div>
        {/* pie chart of the attendance  */}
        <div className="summary-and-graph-div">
          <div className="attendace-status-div">
            <h2>
              Total Students in class ={" "}
              {presentStatus.present + presentStatus.absent}
            </h2>
            <h3>Total Present = {presentStatus.present}</h3>
            <h3>Total Absent = {presentStatus.absent}</h3>
          </div>
          <div className="graph-div">
            <PieChart className="pie-chart" attendanceData={presentStatus} />
          </div>

          {/* for limited date calender */}
        </div>
      </div>
    </>
  );
};

export default MarkAttendance;
