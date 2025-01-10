import axios from "axios";

function calculateScore(a, b) {
  const arrayA = a.split("");
  const arrayB = b.split("");

  const common = arrayA.filter((char) => {
    const index = arrayB.indexOf(char);
    if (index != -1) {
      arrayB.splice(index, 1);
      return true;
    }
    return false;
  });

  const score = (common.length / Math.max(arrayA.length, b.length)) * 100;
  return score.toFixed(2);
}

//*************************************************************** */

/**
 * # For Departments Only
 */
async function rejectDeptDuplicateString(str1) {
  const string = str1.toUpperCase();
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/api/admin/getDepartments`
    );
    const array = response.data.departments.name;
    const matches = array.filter((element) => {
      const score = calculateScore(string, element);
      if (score >= 80) {
        return true;
      }
      return false;
    });
    return matches;
  } catch (error) {
    console.error("Error fetching Data:", error.message);
  }
}
//*************************************************************** */

/**
 * # For Courses
 */

async function rejectDuplicateCourses(str, deptName) {
  const string = str.toUpperCase();
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/api/admin/getCourses`,
      { departmentName: deptName }
    );
    const array = response.data.data;
    const matches = array.filter((element) => {
      const score = calculateScore(string, element.courseName);
      if (score >= 80) {
        return true;
      } else {
        return false;
      }
    });
    return matches;
  } catch (error) {
    console.error("Error fetching Data:", error.message);
  }
}
//*************************************************************** */
/**
 * # For Teachers
 */

async function rejectDuplicateSection(str, deptName, courseName, semester) {
  const string = str.toUpperCase();
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/api/admin/getSections`,
      {
        departmentName: deptName,
        courseName: courseName,
        semesterName: semester,
      }
    );
    const array = response.data.data;
    console.log(array);
    const matches = array.filter((element) => {
      const score = calculateScore(string, element.sectionName);
      if (score >= 80) {
        return true;
      } else {
        return false;
      }
    });
    return matches;
  } catch (error) {
    console.log("Error fetching Data:", error.message);
  }
}
//*************************************************************** */

/**
 * # For Subjects
 */

async function rejectDuplicateSubjects(
  str,
  deptName,
  courseName,
  sectionName,
  semester
) {
  const string = str.toUpperCase();
  try {
    const response = await axios.post(
      `${
        import.meta.env.VITE_SERVER_URL
      }/api/admin/getTeacherAndSubjectForSection`,
      {
        departmentName: deptName,
        courseName: courseName,
        sectionName: sectionName,
        semesterName: semester,
      }
    );
    const array = response.data.data.subjectNames;
    const matches = array.filter((element) => {
      const score = calculateScore(string, element.subjectName);
      if (score >= 80) {
        return true;
      } else {
        return false;
      }
    });
    return matches;
  } catch (error) {
    console.log("Error fetching Data:", error.message);
  }
}

//*************************************************************** */
/**
 * # For Teachers
 */

async function rejectDuplicateTeacher(
  str,
  deptName,
  courseName,
  sectionName,
  semester
) {
  const string = str.toUpperCase();
  try {
    const response = await axios.post(
      `${
        import.meta.env.VITE_SERVER_URL
      }/api/admin/getTeacherAndSubjectForSection`,
      {
        departmentName: deptName,
        courseName: courseName,
        sectionName: sectionName,
        semesterName: semester,
      }
    );
    const array = response.data.data.teacherNames;
    const matches = array.filter((element) => {
      const score = calculateScore(string, element.teacherName);
      if (score >= 80) {
        return true;
      } else {
        return false;
      }
    });
    return matches;
  } catch (error) {
    console.log("Error fetching Data:", error.message);
  }
}
//*************************************************************** */

export {
  rejectDeptDuplicateString,
  rejectDuplicateCourses,
  rejectDuplicateSubjects,
  rejectDuplicateTeacher,
  rejectDuplicateSection,
};
/**
 * # ******************************************************************* #
 */
