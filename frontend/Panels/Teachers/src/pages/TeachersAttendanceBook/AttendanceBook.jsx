import { useEffect, useState } from "react";
import "./AttendanceBook.css";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
const serverUrl = import.meta.env.VITE_SERVER_URL;
const AttendanceBook = () => {
  const [classSelected, setClassSelected] = useState("");
  const [studentsData, setStudentsData] = useState([]);

  const handleClassChage = async (e) => {
    const { value } = e.target;
    setClassSelected(value);
  };

  //fetch the data on the basis of class Selected at frontend
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
        // const sortedData=res.data.students.students;
        // sortedData=uni

        setStudentsData(res.data.students.students);
        console.log("students data", studentsData);
      } catch (err) {
        console.log(
          "got some error in  fetching data from server classwise--->",
          err.message
        );
      }
    };
    getPresentAbsentDataOfClassSelected(classSelected);
  }, [classSelected]);

  const attendanceDates =
  studentsData.length > 0
    ? Object.keys(studentsData[0].attendance)
    : [];

  return (
    <>
<Navbar/>
    <div className="attendance-book-container-main">
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

      <div className="table-div">
        <table>
          <thead>
            <tr>
              <td>Sr.No</td>
              <td>Roll No</td>
              <td>Name</td>
              {attendanceDates.map((date) => (
                <td key={date}>{date}</td>
              ))}
                   

                   
                  </tr>
          </thead>
          <tbody>
            {studentsData &&
              studentsData.map((student, index) => {
                return (
                  <tr key={index}>
                    <td>{index++}</td>
                    <td>{student.roll}</td>
                    <td>{student.name}</td>
                    {Object.entries(student.attendance).map(
                      ([date, status]) => {
                        return <td className={status==="P"?"present":"absent"} key={date}>{status}</td>;
                      }
                    )}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default AttendanceBook;

// students data
// Array(11) [ {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, … ]
// 0: Object { roll: "230501", name: "Khwaish", _id: "673fda8f6ff84c7c468ed19a",attendance: Object { "2024-11-06": "A", "2024-11-21": "P", "2024-11-19": "P", … } }
// 1: Object { roll: "230502", name: "Lavik", _id: "673fda8f6ff84c7c468ed19b", … }
// 2: Object { roll: "230503", name: "Lavish", _id: "673fda8f6ff84c7c468ed19c", … }
// 3: Object { roll: "230504", name: "Lawanya", _id: "673fda8f6ff84c7c468ed19d", … }
// 4: Object { roll: "230505", name: "Mayra", _id: "673fda8f6ff84c7c468ed19e", … }
// 5: Object { roll: "230506", name: "Mitesh", _id: "673fda8f6ff84c7c468ed19f", … }
// 6: Object { roll: "230507", name: "Ritika", _id: "673fda8f6ff84c7c468ed1a0", … }
// 7: Object { roll: "230508", name: "Tanishq", _id: "673fda8f6ff84c7c468ed1a1", … }
// 8: Object { roll: "230509", name: "Vishav", _id: "673fda8f6ff84c7c468ed1a2", … }
// 9: Object { roll: "230510", name: "Yash", _id: "673fda8f6ff84c7c468ed1a3", … }
// 10: Object { roll: "230511", name: "Yuvraj", _id: "673fda8f6ff84c7c468ed1a4", … }
// length: 11
// <prototype>: Array []
// AttendanceBook.jsx:27:16
