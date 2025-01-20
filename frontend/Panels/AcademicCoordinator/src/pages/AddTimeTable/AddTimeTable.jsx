import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";

const AddTimeTable = () => {
  const daysOfWeek = [
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
    "SUNDAY",
  ];
const initialValues={
  day: "",
  departmentName: "",
  courseName: "",
  semesterName: "",
  sectionName: "",
  classTimingSlot: "",
  subjectName: "",
  teacherName: "",
  teacherLocalId: "",
};
  const server_url = import.meta.env.VITE_SERVER_URL;
  const [timeSlotsOfClasses, setTimeSlotsOfClasses] = useState();

  const [teacherSubjectData, setTeacherSubjectData] = useState(initialValues);

  const [departmentNames, setDepartmentNames] = useState();
  const [sectionNames, setSectionNames] = useState([]);
  const [courseNames, setCourseNames] = useState([]);
  const [teacherNames, setTeacherNames] = useState([]);
  const [subjectNames, setSubjectNames] = useState([]);
  const [teacherWithSameNameIds, setTeacherWithSameNameIds] = useState([]);

  const [dayNames, setDayNames ] = useState(daysOfWeek);

  const semValues = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"];

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${server_url}/api/admin/addTeacherAndSubject`,
        teacherSubjectData
      );
      console.log("data saved =", response.data);
      if(response.data.success)
      {

        alert("saved successfully..")
      }
      else{
        alert(response.data.message);
        return;
      }
      setTeacherSubjectData(initialValues);
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

  // fetch the teacher id on selection of teacher name

  useEffect(() => {
    try {
      const fetchTeacherLocalId = async () => {
        const response = await axios.post(
          `${server_url}/api/academics/getTeacherLocalId`,
          teacherSubjectData
        );

        console.log(
          "we got the response on fetching the teacher id as =-=-=-=",
          response.data.data
        );
        setTeacherWithSameNameIds(response.data.data);
      };

      fetchTeacherLocalId();
    } catch (error) {
      console.log("error ", error.message);
    }
  }, [teacherSubjectData.teacherName]);

  useEffect(() => {
    console.log("", teacherSubjectData);
  }, [teacherSubjectData]);

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
    const fetchClassTimeSlots = async () => {
      try {
        const response = await axios.post(
          `${server_url}/api/academics/getClassTimeSlots`
        );
        console.log(
          "class time slots from server ========",
          response.data.data
        );
        setTimeSlotsOfClasses(response.data.data);
      } catch (error) {
        console.log("error", error.message);
      }
    };
    fetchClassTimeSlots();

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
        console.log('response of unique teachers ',response.data );
        
        setTeacherNames(response.data.data.uniqueTeachers);
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

  return (
    <>
    <Navbar/>
    {/* // adding the department */}
    <div className="main_container">
      <form onSubmit={handleSubmit}>
        {/* day of the week */}
        <div className="elements">
          <label htmlFor="">
            Choose<b> Day for time table</b>
          </label>
          <select
           
            name="day"
            value={teacherSubjectData.day}
            onChange={handleChange}
          >
            <option value="">Select Day Below</option>
            {dayNames.map((day, index) => {
              return (
                <option key={index} value={day}>
                  {day}
                </option>
              );
            })}
          </select>
        </div>

        {/* departments entry */}
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
            Choose <b>Class-Timing-Slot</b>
          </label>
          <select
            name="classTimingSlot"
            value={teacherSubjectData.classTimingSlot}
            onChange={handleChange}
          >
            <option value="">Select Time-Slot Below</option>
            {timeSlotsOfClasses &&
              timeSlotsOfClasses.map((slot, index) => {
                return (
                  <option key={index} value={slot}>
                    {slot}
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

        {/* choose teacher id if it two or more teachers exists with same name */}

        <div className="elements">
          <label htmlFor="">
            Choose<b> Teachers LocalId</b>
          </label>
          <select
            name="teacherLocalId"
            value={teacherSubjectData.teacherLocalId}
            onChange={handleChange}
          >
            <option value="">Select Teacher Id Below</option>
            {teacherWithSameNameIds &&
              teacherWithSameNameIds.map((teacher, index) => {
                return (
                  <option key={index} value={teacher.teachersLocalId}>
                    {teacher.teachersLocalId}
                  </option>
                );
              })}
          </select>
        </div>

        {/* adding button */}

        <button className="submitButton">Add</button>
      </form>
    </div>
    </>
  );
};

export default AddTimeTable;
