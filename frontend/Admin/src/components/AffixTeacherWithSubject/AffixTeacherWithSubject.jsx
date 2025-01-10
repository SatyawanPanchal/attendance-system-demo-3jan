import axios from "axios";
import { useEffect, useState } from "react";

const AffixTeacherWithSubject = () => {
  const server_url = import.meta.env.VITE_SERVER_URL;
  const [teacherSubjectData, setTeacherSubjectData] = useState({
    departmentName: "",
    courseName: "",
    semesterName: "",
    sectionName:"",
    teacherName: "",
    subjectName: "",
  });
  const [departmentNames, setDepartmentNames] = useState();
  const [sectionNames,setSectionNames]=useState([]);
  const [courseNames, setCourseNames] = useState([]);
  const [teacherNames,setTeacherNames]=useState([]);
  const [subjectNames,setSubjectNames]=useState([]);
  

  const semValues = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"];

  const handleSubmit =async (e) => {
    e.preventDefault();

    try {
      const response=await axios.post(`${server_url}/api/admin/addTeacherAndSubject`,teacherSubjectData);
      console.log('data saved =',response.data);
      
    } catch (error) 
    {
      
          console.log('error --',error.message);
            
    }




  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeacherSubjectData({
      ...teacherSubjectData,
      [name]: value,
    });
  };
  useEffect(() => {
    console.log("", teacherSubjectData);
  }, [teacherSubjectData]);

// fetching the sections on basis of semesters selected

useEffect(()=>{
 

  const fetchSectionNames=async()=>
  {
      const response= await axios.post(`${server_url}/api/admin/getSections`  , teacherSubjectData );
        console.log('we get sections here --->',response.data.data);
        setSectionNames(response.data.data);
  }
  fetchSectionNames();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[teacherSubjectData.semesterName]);





  // fetch and set department name in starting
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // fetching course Name based on department name selected

  useEffect(() => {
    const getCourseNames = async () => {
      const departmentName = teacherSubjectData.departmentName;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teacherSubjectData.departmentName]);

  // fetching the teacher and subjects on selection of section name
  // if department and course is null give a message to select them both

  useEffect(() => {
    const fetchSubjectsAndTeachers = async () => {
   
   
      try {
       
        const response = await axios.post(
          `${server_url}/api/admin/getTeacherAndSubjectForSection`,
          teacherSubjectData
        );
        setTeacherNames(response.data.data.teacherNames);
        setSubjectNames(response.data.data.subjectNames); 

      
      
      } catch (error) {
        console.log(
          "data not fetched for teacher and subject " + error.message
        );
      }
    };
   fetchSubjectsAndTeachers()
     
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teacherSubjectData.sectionName]);

 




  return (
    // adding the department
    <div className="main_container">
      <form onSubmit={handleSubmit}>
        <div className="elements">
          <label htmlFor="">
            Choose<b> Department</b>
          </label>
          <select
            name="departmentName"
            value={teacherSubjectData.departmentName}
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
        {/* course */}

        <div className="elements">
          <label htmlFor="">
            Choose <b>Course</b>
          </label>
          <select
            name="courseName"
            value={teacherSubjectData.courseName}
            onChange={handleChange}
          >
            <option value="">Select Course Below</option>
            {courseNames &&
              courseNames.map((course, index) => {
                console.log("course Name ---->", course.courseName);
                return (
                  <option key={index} value={course.courseName}>
                    {course.courseName}
                  </option>
                );
              })}
          </select>
        </div>
        {/* choose semester */}
        <div className="elements">
          <label htmlFor="">
            Choose <b>Semester</b>
          </label>
          <select
            name="semesterName"
            value={teacherSubjectData.semesterName}
            onChange={handleChange}
          >
            <option value="">Select semester Below</option>
            {semValues.map((sem, index) => {
              return (
                <option key={index} value={sem}>
                  {sem}
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
            value={ teacherSubjectData.sectionName}
            onChange={handleChange}
          >
            <option value="">Select Section Below</option>

            {sectionNames&& sectionNames.map((section,index)=>{
              return(
                <option key={index} value={section.secitonName}>{section.sectionName}</option>
              )
            })}
           
          </select>
        </div>

        {/* choose teacher */}
        <div className="elements">
          <label htmlFor="">
            Choose <b>Teacher</b>
          </label>
          <select
            name="teacherName"
            value={teacherSubjectData.teacherName}
            onChange={handleChange}
          >
            <option value="">Select teacher Below</option>
             {teacherNames&&teacherNames.map((teacher,index)=>{
              return(
                <option key={index} value={teacher.teacherName}>{teacher.teacherName}</option>
              )
             })

             }
          </select>
        </div>

        {/* choose subject */}
        <div className="elements">
          <label htmlFor="">
            Choose <b>Subject</b>
          </label>
          <select
            name="subjectName"
            value={teacherSubjectData.subjectName}
            onChange={handleChange}
          >
            <option value="">Select Subject Below</option>
             {subjectNames&& subjectNames.map((subject,index)=>{
              return( 
                <option key={index} value={subject.subjectName}>{subject.subjectName}</option>
              )
             })}
          </select>
        </div>
        {/* adding button */}

        <button className="submitButton">Add</button>
      </form>
    </div>
  );
};

export default AffixTeacherWithSubject;
