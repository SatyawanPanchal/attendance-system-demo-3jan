import axios from "axios";

function calculateScore(a, b) {
  const setA = new Set(a);
  const setB = new Set(b);

  const common = [...setA].filter((char) => setB.has(char));

  const score = (common.length / Math.max(setA.size, setB.size)) * 100;

  return score.toFixed(2);
}

// //*************************************************************** */
// async function findMatches(apiUrl, params, key, str) {
//   const string = str.toUpperCase();
//   try {
//     const response = await axios.post(
//       `${import.meta.env.VITE_SERVER_URL}/api/admin/${apiUrl}`,
//       params
//     );
//     const array = response.data[key];

//     return array.filter((element) => {
//       const score = calculateScore(string, element[key]);
//       return score >= 80;
//     });
//   } catch (error) {
//     console.error("Error fetching Data:", error.message);
//   }
// }
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
  // return findMatches("getCourses", { departmentName: deptName }, "data", str);
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
  // return findMatches(
  //   "getTeacherAndSubjectForSem",
  //   {
  //     departmentName: deptName,
  //     courseName: courseName,
  //     semesterName: semester,
  //   },
  //   "data.teacherNames",
  //   str
  // );

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
  // return findMatches(
  //   "getTeacherAndSubjectForSem",
  //   {
  //     departmentName: deptName,
  //     courseName: courseName,
  //     semesterName: semester,
  //   },
  //   "data.subjectNames",
  //   str
  // );

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
  // return findMatches(
  //   "getTeacherAndSubjectForSem",
  //   {
  //     departmentName: deptName,
  //     courseName: courseName,
  //     semesterName: semester,
  //   },
  //   "data.teacherNames",
  //   str
  // );

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
