import { useEffect, useState } from "react";
import "./addSemAndSection.css";
import axios from "axios";
import { generateSpecifiedId } from "../../utilities/createdMethods/generateId.js";
import { rejectDuplicateSection } from "../../utilities/createdMethods/duplicateStringReject.js";

const server_url = import.meta.env.VITE_SERVER_URL;
const AddSemAndSections = () => {
  const [departmentNames, setDepartmentNames] = useState();
  const [courseNames, setCourseNames] = useState([]);
  const [sectionData, setSectionData] = useState({
    departmentName: "",
    courseName: "",
    semesterName: "",
    sectionName: "",
    sectionId: "",
  });
  const semValues = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"];
  const [duplicacyError, setDuplicacyError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSectionData({
      ...sectionData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const submitSubjectDataToBackEnd = async () => {
      try {
               // for Duplicacy
       const sectionDuplicates = await rejectDuplicateSection(sectionData.sectionName,sectionData.departmentName, sectionData.courseName, sectionData.semesterName);

       if(sectionDuplicates && sectionDuplicates.length > 0){
         setDuplicacyError(
          `The department with name ${sectionDuplicates.map(element => element.sectionName).join(", ")} already exists.`
        );
         return;
       }

       setDuplicacyError(""); // if no duplicates, clear any existing error
        const res = await axios.post(
          `${server_url}/api/admin/addSemAndSection`,
          sectionData
        );
        if (res.data.success) {
          alert(res.data.message);
        }
        else{
          alert("not saved")
        }
      } catch (error) {
        console.log("error data is not submitted", error.message);
      }
    };

    submitSubjectDataToBackEnd();
  };

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

  // fetching course Name based on department name selected

  useEffect(() => {
    const getCourseNames = async () => {
      const departmentName = sectionData.departmentName;
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
  }, [sectionData.departmentName]);

  useEffect(() => {
    console.log("subject data ------>", sectionData);
  }, [sectionData]);

  useEffect(() => {
    const sectionId = generateSpecifiedId("Section", sectionData.sectionName);
    setSectionData((prevdata) => ({
      ...prevdata,
      sectionId: sectionId,
    }));
  }, [sectionData.sectionName]);

  return (
    <div className="main_container">
      <form onSubmit={handleSubmit}>
        {/* choose department */}
        <div className="elements">
          <label htmlFor="">
            Choose <b>Department</b>
          </label>
          <select
            name="departmentName"
            value={sectionData.departmentName}
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
            value={sectionData.courseName}
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
            value={sectionData.semesterName}
            onChange={handleChange}
          >
            <option value="">Select Semester Below</option>
            {semValues.map((sem, index) => {
              return (
                <option key={index} value={sem}>
                  {sem}
                </option>
              );
            })}
          </select>
        </div>

        {/* Enter the subject */}

        <div className="elements">
          <label htmlFor="">
            Enter <b>Section</b>
          </label>
          <input
            type="text"
            placeholder="Enter Section here"
            name="sectionName"
            value={sectionData.sectionName}
            onChange={handleChange}
          />
        </div>

        <div className="elements">
          <label htmlFor="">
            Section <b>Id</b>
          </label>
          <textarea
            type="text"
            placeholder="Section Id here"
            name="sectionId"
            value={sectionData.sectionId}
            onChange={handleChange}
          />
        </div>

        {/* Display the error message if it exists */}
        <div className="error_message">
          {duplicacyError}
        </div>

        <button className="submitButton">Add</button>
      </form>
      {/* Subject Id- */}
    </div>
  );
};

export default AddSemAndSections;
