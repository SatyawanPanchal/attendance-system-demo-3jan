import { useEffect, useState } from "react";
import axios from "axios";
// import { generateSpecifiedId } from "../../utilities/createdMethods/generateId";

import "./AddStudents.css";
import Navbar from "../../components/Navbar/Navbar";

const server_url = import.meta.env.VITE_SERVER_URL;
const AddStudents = () => {
  const [departmentNames, setDepartmentNames] = useState();
  const [courseNames, setCourseNames] = useState([]);
  const [sectionNames, setSectionNames] = useState([]);
  const [studentsData, setStudentsData] = useState({
    departmentName: "",
    courseName: "",
    semesterName: "",
    sectionName: "",
    studentName: "",
    fatherName: "",
    rollNumber: "",
    whatsAppNumber: "",
  });

  const semValues = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"];

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitData = async () => {
      try {
        const response = await axios.post(
          `${server_url}/api/principal/addStudents`,
          studentsData
        );
        if (response.data.success) {
          alert(response.data.message);
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        alert(`error is ${error.message}`);
      }
    };

    submitData();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentsData({
      ...studentsData,
      [name]: value,
    });
  };

  // fetching the sections on basis of semesters selected

  useEffect(() => {
    const fetchSectionNames = async () => {
      const response = await axios.post(
        `${server_url}/api/admin/getSections`,
        studentsData
      );
      console.log("we get sections here --->", response.data.data);
      setSectionNames(response.data.data);
    };
    fetchSectionNames();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studentsData.semesterName]);

  // fetching department Names when page is rendered on first load

  useEffect(() => {
    const fetchDepartmentNames = async () => {
      try {
        console.log("server url", server_url);

        const res = await axios.get(`${server_url}/api/admin/getDepartments`);
        console.log("departments", res.data.departments.name);
        setDepartmentNames(res.data.departments.name);
      } catch (error) {
        alert(error.message + "---> is the response from server");
      }
    };
    fetchDepartmentNames();
  }, []);
  //

  // fetching course Name based on department name selected

  useEffect(() => {
    const getCourseNames = async () => {
      const departmentName = studentsData.departmentName;
      try {
        const response = await axios.post(
          `${server_url}/api/admin/getCourses`,
          { departmentName }
        );
        setCourseNames(response.data.data);
        console.log("response for courses =", response.data.data);
      } catch (error) {
        console.log("error -->", error.message);
      }
    };

    const courses = getCourseNames();
    console.log("course are ", courses);
  }, [studentsData.departmentName]);

  useEffect(() => {
    console.log("subject data ------>", studentsData);
  }, [studentsData]);

  return (
    <>
      <Navbar />
      <div className="main_container">
        <form onSubmit={handleSubmit}>
          {/* choose department */}
          <div className="elements">
            <label htmlFor="">
              Choose <b>Department</b>
            </label>
            <select
              name="departmentName"
              value={studentsData.departmentName}
              onChange={handleChange}
            >
              <option value="">Select Department Below</option>
              {departmentNames &&
                departmentNames.map((department, index) => {
                  return (
                    <option key={index} value={department}>
                      {department}
                    </option>
                  );
                })}
            </select>
          </div>

          {/* choose course */}

          <div className="elements">
            <label htmlFor="">
              Choose <b>Course</b>
            </label>
            <select
              name="courseName"
              value={studentsData.courseName}
              onChange={handleChange}
            >
              <option value="">Select Course Below</option>
              {courseNames &&
                courseNames.map((course, index) => {
                  return (
                    <option key={index} value={course.courseName}>
                      {course.courseName}
                    </option>
                  );
                })}
            </select>
          </div>

          {/* choose sem */}

          <div className="elements">
            <label htmlFor="">
              Choose <b>Semester</b>
            </label>
            <select
              name="semesterName"
              value={studentsData.semesterName}
              onChange={handleChange}
            >
              <option value="">Select Semester Below</option>
              {semValues.map((sem, index) => {
                return (
                  <option key={index} value={sem.toUpperCase()}>
                    {sem.toUpperCase()}
                  </option>
                );
              })}
            </select>
          </div>

          {/* adding the sections below */}

          <div className="elements">
            <label htmlFor="">
              Choose <b>Sections</b>
            </label>
            <select
              name="sectionName"
              value={studentsData.sectionName}
              onChange={handleChange}
            >
              <option value="">Select Section Below</option>

              {sectionNames &&
                sectionNames.map((section, index) => {
                  return (
                    <option key={index} value={section.sectionName}>
                      {section.sectionName}
                    </option>
                  );
                })}
            </select>
          </div>

          {/* Enter the subject */}

          <div className="elements">
            <label htmlFor="">
              Student <b>Name</b>
            </label>
            <input
              type="text"
              placeholder="Enter student name"
              name="studentName"
              value={studentsData.studentName}
              onChange={handleChange}
            />
          </div>

          <div className="elements">
            <label htmlFor="">
              Father <b>Name</b>
            </label>
            <input
              type="text"
              placeholder="Enter Father Name"
              name="fatherName"
              value={studentsData.fatherName}
              onChange={handleChange}
            />
          </div>

          <div className="elements">
            <label htmlFor="">
              <b>Roll Number</b>
            </label>
            <input
              type="text"
              placeholder="Enter Roll Number"
              name="rollNumber"
              value={studentsData.rollNumber}
              onChange={handleChange}
            />
          </div>

          {/* whats App Number  */}

          <div className="elements">
            <label htmlFor="">
              <b>WhatsApp </b> Number
            </label>
            <input
              type="Number"
              placeholder="Enter WhatsApp No only"
              name="whatsAppNumber"
              value={studentsData.whatsAppNumber}
              onChange={handleChange}
            />
          </div>

          {/* Display the error message if it exists */}

          <button className="submitButton">Add</button>
        </form>
        {/* Subject Id- */}
      </div>
    </>
  );
};

export default AddStudents;
