import { useEffect, useState } from "react";
import "./AddCourses.css";
import axios from "axios";
import { generateSpecifiedId } from "../../utilities/createdMethods/generateId.js";
import { rejectDuplicateCourses } from "../../utilities/createdMethods/duplicateStringReject.js";

const server_url = import.meta.env.VITE_SERVER_URL;

const AddCourses = () => {
  const [departmentNames, setDepartmentNames] = useState();
  const [courseData, setCourseData] = useState({
    departmentName: "",
    courseName: "",
    courseId: "",
  });

  const [duplicacyError, setDuplicacyError] = useState("");

  const handleSubmitButtonClick = async () => {
    let res;
    try {
        // for Duplicacy
      const courseDuplicates = await rejectDuplicateCourses(courseData.courseName, courseData.departmentName);
    
      if(courseDuplicates && courseDuplicates.length > 0){
         setDuplicacyError(
            `The department with name ${courseDuplicates.map(element => element.courseName).join(", ")} already exists.`
          );
         return;
       }

       setDuplicacyError("");
      res = await axios.post(`${server_url}/api/admin/addCourse`, courseData);
      alert(`  ${res.data.message} `);
    } catch (error) {
      alert(res.data.message);
      console.log("eror ==>", error.message);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({
      ...courseData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // generate id when course name is changed
  useEffect(() => {
    console.log("courseData -->", courseData);

    const id = generateSpecifiedId("Course", courseData.courseName);

    setCourseData((prev) => ({
      ...prev,
      courseId: id,
    }));
  }, [courseData.courseName]);

  //fetching the department details on first render

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

  //fetching the department id on selection of department

  useEffect(() =>{
    console.log('courseData--->',courseData);
    
  }, [courseData]);

  return (
    <div className="main_container">
      <form onSubmit={handleSubmit}>
        <div className="elements">
          <label htmlFor="">Choose Department</label>
          <select
            name="departmentName"
            value={courseData.departmentName}
            onChange={handleChange}
          >
            <option value="">Select Department Below</option>
            {/* displaying the fetched data of department in list */}
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
        <div className="elements">
          <label htmlFor="">Enter the course Name</label>
          <input
            type="text"
            placeholder="enter the course name"
            name="courseName"
            value={courseData.courseName}
            onChange={handleChange}
          />
        </div>
        <div className="elements">
          <label htmlFor="">CourseId</label>
          <textarea
            type="text"
            placeholder="CourseId"
            name="courseId"
            value={courseData.courseId}
            onChange={handleChange}
          />
        </div>
          {/* Display the error message if it exists */}
          <div className="error_message">
          {duplicacyError}
        </div>
        <button
          className="submitButton"
          type="submit"
          onClick={() => handleSubmitButtonClick()}
        >
          Add course
        </button>
      </form>
    </div>
  );
};
export default AddCourses;
