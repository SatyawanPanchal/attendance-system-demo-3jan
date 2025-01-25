import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";

const server_url = import.meta.env.VITE_SERVER_URL;
const AddRollNumberRanges = () => {
  const [departmentNames, setDepartmentNames] = useState();

  const [courseNames, setCourseNames] = useState([]);
  const [sectionNames, setSectionNames] = useState([]);
  const [allData, setAllData] = useState({
    departmentName: "",
    courseName: "",
    semesterName: "",
    sectionName: "",
    rollStartsFrom: "",
    rollEndsWith: "",
    extraRolls: "",
  });
const [serverError,setServerError]=useState("");
  const semValues = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"];

  const handleSubmit = (e) => {
    e.preventDefault();

    const submitData = async () => {
      try {
        const response = await axios.post(
          `${server_url}/api/academics/addRollNumberRanges`,
          allData
        );
        console.log('success',response.data.success);
        
        console.log(
          "response from server on submitting roll no ranges ",
          response.data
        );

        if(response.data.success)
        {
          alert("data saved successfully...")
        }else{
          setServerError(response.data.message);
        }
      } catch (error) {
        console.log(`error occured as ${error.message}`);
      }
    };

    submitData();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAllData({
      ...allData,
      [name]: value,
    });
  };

  // fetching the sections on basis of semesters selected

  useEffect(() => {
    const fetchSectionNames = async () => {
      const response = await axios.post(
        `${server_url}/api/admin/getSections`,
        allData
      );
      console.log("we get sections here --->", response.data.data);
      setSectionNames(response.data.data);
    };
    fetchSectionNames();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allData.semesterName]);

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
      const departmentName = allData.departmentName;
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
  }, [allData.departmentName]);

  useEffect(() => {
    console.log("subject data ------>", allData);
  }, [allData]);

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
            value={allData.departmentName}
            onChange={handleChange}
            required
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
            value={allData.courseName}
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

        {/* choose sem */}

        <div className="elements">
          <label htmlFor="">
            Choose <b>Semester</b>
          </label>
          <select
            name="semesterName"
            value={allData.semesterName}
            onChange={handleChange}
            required
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
            value={allData.sectionName}
            onChange={handleChange}
            required
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

        {/* roll no starts from  */}

        <div className="elements">
          <label htmlFor="">
            Roll No. <b>StartsFrom</b>
          </label>
          <input
            type="number"
            placeholder="Roll number Starts with"
            name="rollStartsFrom"
            value={allData.rollStartsFrom}
            onChange={handleChange}
            required
          />
        </div>

        {/* roll no ends with  */}

        <div className="elements">
          <label htmlFor="">
            Roll No. <b>Ends with</b>
          </label>
          <input
            type="number"
            placeholder="Roll number Starts with"
            name="rollEndsWith"
            value={allData.rollEndsWith}
            onChange={handleChange}
            required
          />
        </div>

        {/* extra roll nos   */}

        <div className="elements">
          <label htmlFor="">
            Extra <b>Roll No. (if any)</b>
          </label>
          <input
            type="text"
            placeholder="give like (111,112,221,899)"
            name="extraRolls"
            value={allData.extraRolls}
            onChange={handleChange}
          />
        </div>

        {/* Display the error message if it exists */}
{serverError&&
        <div className="element">
          <p>{serverError}</p>
      
        </div>
}

        <button className="submitButton">Add</button>
      </form>
      {/* Subject Id- */}
    </div>
    </>
  );
};

export default AddRollNumberRanges;
