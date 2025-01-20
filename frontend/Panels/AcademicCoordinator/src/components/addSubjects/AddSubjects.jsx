import { useEffect, useState } from "react";
import "./AddSubjects.css";
import axios from "axios";
import { generateSpecifiedId } from "../../../../Admin/src/utilities/createdMethods/generateId";
import { rejectDuplicateSubjects } from "../../../../Admin/src/utilities/createdMethods/duplicateStringReject";
import Navbar from "../Navbar/Navbar";

const server_url = import.meta.env.VITE_SERVER_URL;
const AddSubjects = () => {
  const [departmentNames, setDepartmentNames] = useState();
  const [courseNames, setCourseNames] = useState([]);
  const [sectionNames, setSectionNames] = useState([]);
  const [subjectsData, setSubjectsData] = useState({
    departmentName: "",
    courseName: "",
    semesterName: "",
    sectionName: "",
    subjectName: "",
    subjectId: "",
  });

  const semValues = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"];

  const [duplicacyError, setDuplicacyError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const submitSubjectDataToBackEnd = async () => {
      try {
        // for Duplicacy
        const subjectDuplicates = await rejectDuplicateSubjects(
          subjectsData.subjectName,
          subjectsData.departmentName,
          subjectsData.courseName,
          subjectsData.sectionName,
          subjectsData.semesterName
        );

        if (subjectDuplicates && subjectDuplicates.length > 0) {
          setDuplicacyError(
            `The department with name ${subjectDuplicates
              .map((element) => element.subjectName)
              .join(", ")} already exists.`
          );
          return;
        }

        setDuplicacyError("");

        const res = await axios.post(
          `${server_url}/api/admin/addSubject`,
          subjectsData
        );
        if (res.data.success) {
          alert(res.data.message);
        }
      } catch (error) {
        console.log("error data is not submitted", error.message);
      }
    };

    submitSubjectDataToBackEnd();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubjectsData({
      ...subjectsData,
      [name]: value,
    });
  };

  // fetching the sections on basis of semesters selected

  useEffect(() => {
    const fetchSectionNames = async () => {
      const response = await axios.post(
        `${server_url}/api/admin/getSections`,
        subjectsData
      );
      console.log("we get sections here --->", response.data.data);
      setSectionNames(response.data.data);
    };
    fetchSectionNames();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subjectsData.semesterName]);

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
      const departmentName = subjectsData.departmentName;
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
  }, [subjectsData.departmentName]);

  useEffect(() => {
    console.log("subject data ------>", subjectsData);
  }, [subjectsData]);

  useEffect(() => {
    const subjectId = generateSpecifiedId("Subject", subjectsData.subjectName);
    setSubjectsData((prevdata) => ({
      ...prevdata,
      subjectId: subjectId,
    }));
  }, [subjectsData.subjectName]);

  return (
<>
<Navbar/>
    <div className="main_container">
      <form onSubmit={handleSubmit}>
        {/* choose department */}
        <div className="elements">
          <label htmlFor="">
            Choose <b>Department</b>
          </label>
          <select
            name="departmentName"
            value={subjectsData.departmentName}
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
            value={subjectsData.courseName}
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
            value={subjectsData.semesterName}
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
            value={subjectsData.sectionName}
            onChange={handleChange}
          >
            <option value="">Select Section Below</option>

            {sectionNames &&
              sectionNames.map((section, index) => {
                return (
                  <option key={index} value={section.secitonName}>
                    {section.sectionName}
                  </option>
                );
              })}
            {/* {semValues.map((sem, index) => {
              return (
                <option key={index} value={sem}>
                  {sem}
                </option>
              );
            })} */}
          </select>
        </div>

        {/* Enter the subject */}

        <div className="elements">
          <label htmlFor="">
            Enter <b>Subject</b>
          </label>
          <input
            type="text"
            placeholder="Enter subject here"
            name="subjectName"
            value={subjectsData.subjectName}
            onChange={handleChange}
          />
        </div>

        <div className="elements">
          <label htmlFor="">
            Subject <b>Id</b>
          </label>
          <textarea
            type="text"
            placeholder="Subject Id here"
            name="subjectId"
            value={subjectsData.subjectId}
            onChange={handleChange}
          />
        </div>

        {/* Display the error message if it exists */}
        <div className="error_message">{duplicacyError}</div>

        <button className="submitButton">Add</button>
      </form>
      {/* Subject Id- */}
    </div>

    </>
  );
};

export default AddSubjects;
