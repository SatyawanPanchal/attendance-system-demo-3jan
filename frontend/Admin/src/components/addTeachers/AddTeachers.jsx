import { useEffect, useState } from "react";
import "./AddTeachers.css";
import axios from "axios";
import { generateSpecifiedId } from "../../utilities/createdMethods/generateId";
 

const server_url = import.meta.env.VITE_SERVER_URL;

const AddTeachers = () => {
  const initialTeachersData = {
    departmentName: "",
    courseName: "",

    teacherName: "",
    teachersLocalId: "",
    teacherId: "",
  };

  const [departmentNames, setDepartmentNames] = useState();
  const [courseNames, setCourseNames] = useState([]);

  const [localId, setLocalId] = useState("");
  const [teachersData, setTeachersData] = useState(initialTeachersData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeachersData({
      ...teachersData,
      [name]: value,
    });
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // // for Duplicacy
      // const teacherNameDuplicates = await rejectDuplicateTeacher(
      //   teachersData.teacherName,
      //   teachersData.departmentName,
      //   teachersData.courseName
      // );

      // if (teacherNameDuplicates && teacherNameDuplicates.length > 0) {
      //   setDuplicacyError(
      //     `The teacher with name ${teacherNameDuplicates
      //       .map((element) => element.teacherName)
      //       .join(", ")} already exists.`
      //   );
      // }

      // setDuplicacyError("");
      const response = await axios.post(
        `${server_url}/api/admin/addTeacher`,
        teachersData
      );
      alert(`${response.data.data.teacherName} saved succesfully`);

      setTeachersData(initialTeachersData);
    } catch (error) {
      alert("teacher not saved succesfully", error.message);
    }
  };

  // fetching the teacher local id from server
  useEffect(() => {
    const fetchLocalId = async () => {
      try {
        const response = await axios.post(
          `${server_url}/api/principal/getLocalId`,
          teachersData
        );
        console.log("response for local id", response.data.data);
        const newLocalId = response.data.data;
        setLocalId(response.data.data);

        setTeachersData((prevdata) => ({
          ...prevdata,
          teachersLocalId: newLocalId,
        }));
      } catch (error) {
        console.log("error during the local id generation", error.message);
      }
    };

    fetchLocalId();
  }, [teachersData.courseName]);

  useEffect(() => {
    console.log("teachers data --->", teachersData);
  }, [teachersData]);

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
      const departmentName = teachersData.departmentName;
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
  }, [teachersData.departmentName]);

  // generate the teacher Id on entering of Teacher Name

  useEffect(() => {
    const teacherId = generateSpecifiedId("Teacher", teachersData.teacherName);
    setTeachersData((prevdata) => ({
      ...prevdata,
      teacherId: teacherId,
    }));
  }, [teachersData.teacherName]);

  //======================================================
  return (
    // adding the department
    <div className="main_container">
      <form onSubmit={handleSubmit}>
        <div className="elements">
          <label htmlFor="">
            Choose <b>Department</b>
          </label>
          <select
            name="departmentName"
            value={teachersData.departmentName}
            onChange={handleChange}
            required
          >
            <option value="">Select elements Below</option>
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
        {/* course */}
        <div className="elements">
          <label htmlFor="">
            Choose <b>Course</b>
          </label>
          <select
            name="courseName"
            value={teachersData.courseName}
            onChange={handleChange}
            required
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

        {/* add teacher */}
        <div className="elements">
          <label htmlFor="">
            Add <b>Teacher</b>
          </label>
          <input
            type="text"
            placeholder="add teacher here"
            name="teacherName"
            value={teachersData.teacherName}
            onChange={handleChange}
            required
          />
        </div>
        {/* add teacher local Id */}

        <div className="elements">
          <label htmlFor="">
            Add Teacher <b>Local Id</b>
          </label>
          <input
            type="text"
            placeholder="add teacher LocalId"
            name="teachersLocalId"
            value={localId}
            onChange={handleChange}
          />
        </div>

        {/* teacher Id */}
        <div className="elements">
          <label htmlFor="">
            Teacher <b>Id</b>
          </label>
          <textarea
            type="text"
            placeholder="to be created automatically"
            name="teacherId"
            value={teachersData.teacherId}
            onChange={handleChange}
          />
        </div>
        {/* Display the error message if it exists */}
        
        <button className="submitButton">Add</button>
      </form>
    </div>
  );
};

export default AddTeachers;
