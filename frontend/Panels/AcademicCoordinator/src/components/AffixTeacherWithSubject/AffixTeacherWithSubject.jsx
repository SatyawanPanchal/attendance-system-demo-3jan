import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";

const AffixTeacherWithSubject = () => {
  const server_url = import.meta.env.VITE_SERVER_URL;
  const [teacherSubjectData, setTeacherSubjectData] = useState({
    
    departmentNameOfTeacher: "",
    courseNameOfTeacher: "",
    teacherName: "",
    teacherLocalId: "",
    
    departmentNameOfSubject: "",
    courseNameOfSubject: "",
    semesterName: "",
    sectionName: "",
    subjectName: "",
  });
  const [departmentNames, setDepartmentNames] = useState();
  const [sectionNames, setSectionNames] = useState([]);
  const [courseNames, setCourseNames] = useState([]);
  const [teacherNames, setTeacherNames] = useState([]);
  const [teacherIds, setTeacherIds] = useState([]);
  const [subjectNames, setSubjectNames] = useState([]);

  const semValues = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"];

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${server_url}/api/admin/affixTeacherAndSubject`,
        teacherSubjectData
      );
      console.log("data saved =", response.data);
      if (response.data.success) {
        alert(response.data.message);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log("error --", error.message);
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

  // fetching the id of teachers registered with same name , on the selection of teacher name

  // useEffect(() => {
  //   const fetchTeachersIdWithSameName = async () => {
  //     try {
  //       const response = await axios.post(
  //         `${server_url}/api/admin/getIdOfTeacher`,
  //         teacherSubjectData
  //       );
  //       if (response.data.success) {
  //         setTeacherIds(response.data.data);
  //       } else {
  //         alert(response.data.message);
  //       }
  //     } catch (error) {
  //       console.log("error is ", error.message);
  //       alert(`error ${error.message}`);
  //     }
  //   };
  //   fetchTeachersIdWithSameName();
  // }, [teacherSubjectData.teacherName]);

  // fetching the sections on basis of semesters selected

  useEffect(() => {
    const fetchSectionNames = async () => {
      const response = await axios.post(
        `${server_url}/api/admin/getSections`,
        teacherSubjectData
      );
      console.log("we get sections here --->", response.data.data);
      setSectionNames(response.data.data);
    };
    fetchSectionNames();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teacherSubjectData.semesterName]);

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

  // fetching course Names of Subject based on department name selected

  useEffect(() => {
    const getCourseNames = async () => {
      const departmentName = teacherSubjectData.departmentNameOfSubject;
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
  }, [teacherSubjectData.departmentNameOfSubject]);

  // fetching course Names of Teacher based on department name selected

  useEffect(() => {
    const getCourseNames = async () => {
      const departmentName = teacherSubjectData.departmentNameOfTeacher;
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
  }, [teacherSubjectData.departmentNameOfTeacher]);

  // fetching the subjects on selection of section name
  // if department and course is null give a message to select them both

  useEffect(() => {
    const fetchSubjectsAndTeachers = async () => {
      try {
        const response = await axios.post(
          `${server_url}/api/admin/getSubjectForSection`,
          teacherSubjectData
        );
        console.log(
          "data fetched on section selction --🤫",
          response.data.data
        );

        // setTeacherNames(response.data.data.uniqueTeachers);

        setSubjectNames(response.data.data.subjectNames);
      } catch (error) {
        console.log(
          "data not fetched for teacher and subject " + error.message
        );
      }
    };
    fetchSubjectsAndTeachers();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teacherSubjectData.sectionName]);
  //  lets fetch the unique teacherNames on the basis of  course name of Teacher

  useEffect(() => {
    console.log(
      "i am fetching the teacherNames on selection of course Name of the teacher"
    );

    const fetchTeacherNamesFromCourse = async () => {
      try {
        const response = await axios.post(
          `${server_url}/api/admin/getTeachersFromCourse`,
          teacherSubjectData
        );
        console.log(
          "teachers and teacherIds fetched on course selction --🤫",
          response.data.teacherNames,
          response.data.teacherIds
        );

        setTeacherNames(response.data.teacherNames);
        setTeacherIds(response.data.teacherIds);
      } catch (error) {
        console.log(`error occured ${error.message}`);
      }
    };
    fetchTeacherNamesFromCourse();
  }, [teacherSubjectData.courseNameOfTeacher]);

  return (
    // adding the department

    <>
      <Navbar />
      <div className="main_container">
        <form onSubmit={handleSubmit}>
         
          {/* inputting the details of teacher */}
          <fieldset>
            <legend>---Select details of teacher you want to assign</legend>
            <div className="elements">
              <label htmlFor="">
                Choose<b> Department</b>
              </label>
              <select
                name="departmentNameOfTeacher"
                value={teacherSubjectData.departmentNameOfTeacher}
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
                name="courseNameOfTeacher"
                value={teacherSubjectData.courseNameOfTeacher}
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
                {teacherNames &&
                  teacherNames.map((teacher, index) => {
                    return (
                      <option key={index} value={teacher.teacherName}>
                        {teacher.teacherName}
                      </option>
                    );
                  })}
              </select>
            </div>

            {/* choose teacher Id*/}
            <div className="elements">
              <label htmlFor="">
                Choose <b>Teacher Id</b>
              </label>
              <select
                name="teacherLocalId"
                value={teacherSubjectData.teacherLocalId}
                onChange={handleChange}
              >
                <option value="">Select teacher Id Below</option>
                {teacherIds &&
                  teacherIds.map((teacherId, index) => {
                    return (
                      <option key={index} value={teacherId.teachersLocalId}>
                        {teacherId.teachersLocalId}
                      </option>
                    );
                  })}
              </select>
            </div>
          </fieldset>
         
         
         
         
          {/* Department  */}

          <fieldset>
            <legend>select details of subject</legend>

            <div className="elements">
              <label htmlFor="">
                Choose<b> Department</b>
              </label>
              <select
                name="departmentNameOfSubject"
                value={teacherSubjectData.departmentNameOfSubject}
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
                name="courseNameOfSubject"
                value={teacherSubjectData.courseNameOfSubject}
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
                value={teacherSubjectData.sectionName}
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
                {subjectNames &&
                  subjectNames.map((subject, index) => {
                    return (
                      <option key={index} value={subject.subjectName}>
                        {subject.subjectName}
                      </option>
                    );
                  })}
              </select>
            </div>
          </fieldset>

         
          {/* adding button */}

          <button className="submitButton">Add</button>
        </form>
      </div>
    </>
  );
};

export default AffixTeacherWithSubject;
