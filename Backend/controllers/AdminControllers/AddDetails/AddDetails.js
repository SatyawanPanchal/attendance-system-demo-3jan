import mongoose from "mongoose";
// import {generateSpecifiedId} from "../../../utilities/generateId.js"
import courseModel from "../../../models/AdminModels/CourseEnteryModel.js";
import departmentModel from "../../../models/AdminModels/DeptEnteryModel.js";
import subjectModel from "../../../models/AdminModels/SubjectEnteryModel.js";
import {
  getSelectedCourseId,
  getSelectedDepartmentId,
  getSelectedSectionId,
} from "../../../utilities/utilities.js";
import teacherModel from "../../../models/AdminModels/TeacherEnteryModel.js";
import sectionModel from "../../../models/AdminModels/AddSemAndSectionModel.js";
import teacherAndSubjectModel from "../../../models/AdminModels/TeacherAndSubjectModel.js";
import userModel from "../../../models/userModel/userModel.js";
import jwt from "jsonwebtoken";
import affixTeacherAndSubjectModel from "../../../models/AdminModels/affixTeacherSubjectModel.js";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

const getTeachersFromCourse = async (req, res) => {
  const { departmentNameOfTeacher, courseNameOfTeacher } = req.body;

  const departmentName = departmentNameOfTeacher;
  const courseName = courseNameOfTeacher;

  try {
    const department = await departmentModel.findOne({
      departmentName: departmentName,
    });
    const id_of_department = department.departmentId;
    console.log("department id fetched-->", id_of_department);

    const course = await courseModel.findOne({
      courseName: courseName,
    });
    const id_of_course = course.courseId;
    console.log("course id fetched -->", id_of_course);

    // finding teachers name ---
    const teacherNames = await teacherModel.find(
      {
        departmentId: id_of_department,
        courseId: id_of_course,
      },
      { teacherName: 1, _id: 0 } // Projection to include teacherName and exclude _id
    );
    const uniqueTeachers = Array.from(
      new Set(teacherNames.map((teacher) => teacher.teacherName))
    ).map((name) => ({ teacherName: name }));

    console.log("unique teachers ---==>>>", uniqueTeachers);

    // finding teachers local id
    const teacherIds = await teacherModel.find(
      {
        departmentId: id_of_department,
        courseId: id_of_course,
      },
      {
        teachersLocalId: 1,
        _id: 0,
      } // Projection to include teacherName and exclude _id
    );

    console.log("local id 🆔", teacherIds);

    res.json({
      success: true,
      teacherNames: uniqueTeachers,
      teacherIds: teacherIds,
      message: "☑️fetched teacherNames and teacherIds successfully ",
    });
  } catch (error) {
    res.json({
      success: false,
      message: `❌ ${error.message}`,
    });
  }
};

const approveRights = async (req, res) => {
  const { emailId, roles } = req.body;
  const userWithUpdatedRoles = req.body;

  // we want to return from here if user is already a superuser

  try {
    const userFromDatabase = await userModel.findOne({ emailId: emailId });
    if (("user roles", userFromDatabase.roles.includes("SuperUser"))) {
      res.json({
        success: true,
        message: `${userFromDatabase.userName} is already a Super User`,
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: `no data updated`,
    });
  }

  try {
    const updatedUser = await userModel.findOneAndUpdate(
      { emailId: emailId },
      { $set: userWithUpdatedRoles },
      { new: true, runValidators: true }
    );

    if (updatedUser) {
      console.log("updated user ==", updatedUser);

      res.json({
        success: true,
        message: `${userWithUpdatedRoles.userName} is updated with rights ${userWithUpdatedRoles.roles}`,
      });
    } else {
      console.log("no user is updated");
    }
  } catch (error) {
    console.log("error updating user ::::", error.message);
  }
};

const updateApproval = async (req, res) => {
  const { emailId } = req.body;

  console.log("hi i am in updateApproval with data", emailId);
  try {
    const updatedUser = await userModel.findOneAndUpdate(
      { emailId }, // Filter to find the user by emailId
      { approved: true }, // Update the approved field to true
      { new: true } // Return the updated document
    );
    if (updatedUser) {
      const users = await userModel.find();
      if (users) {
        res.json({
          success: true,
          message: `${updatedUser.userName} is approved`,
          users: users,
        });
      }
    }

    console.log("updateuser-------->⛱️⛱️⛱️", updatedUser);
  } catch (error) {
    res.json({
      success: false,
      message: `user is not approved ${error.message}`,
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.json({
      success: true,
      message: `fetched successfully`,
      users: users,
    });
  } catch (error) {
    res.json({
      success: false,
      message: `${error.mesage} is the error in fetching users`,
    });
  }
};

const getIdOfTeacher = async (req, res) => {
  const { teacherName } = req.body;
  console.log("i am in getIdOfTeacher with data ", teacherName);
  try {
    const idsFound = await teacherModel.find(
      { teacherName: teacherName },
      { teachersLocalId: 1, _id: 0 }
    );
    console.log(`we found the id of ${teacherName} as ${idsFound}`);

    if (idsFound) {
      res.json({
        success: true,
        data: idsFound,
        message: `id we found are ${idsFound}`,
      });
    } else {
      res.json({
        success: false,

        message: `id not found `,
      });
    }
  } catch (error) {
    console.log(`error is ${error.message}`);
    res.json({
      success: false,

      message: `id not found and error ${error.message}`,
    });
  }
};

const affixTeacherAndSubject = async (req, res) => {
  console.log(
    "i am in affixTeacherAndSubject 👨‍🏫 🚉\n\n\n with data ",
    req.body
  );
  const {
    departmentNameOfSubject,
    courseNameOfSubject,
    semesterName,
    sectionName,
    teacherName,
    teacherLocalId,
    subjectName,
  } = req.body;

  const departmentName=departmentNameOfSubject;
  const  courseName=courseNameOfSubject; 






  //  check if same teacher have lecture on same day and same time

  const ifSameClassOfTeacherExists = await affixTeacherAndSubjectModel.findOne({
    teacherName: teacherName,
    teacherLocalId: teacherLocalId,
    subjectName: subjectName,
  });
  // console.log("same teacher is already fixed");

  if (ifSameClassOfTeacherExists) {
    return res.json({
      success: false,
      message: `${teacherName} have already fixed with the subject ${subjectName}`,
    });
  }

  const newAffixTeacherAndSubject = new affixTeacherAndSubjectModel({
    departmentName: departmentName,
    courseName: courseName,
    semesterName: semesterName.toUpperCase(),
    sectionName: sectionName,
    teacherName: teacherName,
    teacherLocalId: teacherLocalId,
    subjectName: subjectName,
  });

  try {
    const savedSubjectWithTeacher = await newAffixTeacherAndSubject.save();
    res.json({
      success: true,
      message: `${teacherName} teaches ${subjectName} saved successfully`,
      data: savedSubjectWithTeacher,
    });
  } catch (error) {
    res.json({
      success: false,
      message: `data not saved ${error.message}`,
    });

    console.log("errror in saving ", error.message);
  }
};

const addTeacherAndSubject = async (req, res) => {
  console.log("we are in addTeacherAndSubject with data", req.body);
  const {
    day,
    departmentName,
    courseName,
    semesterName,
    sectionName,
    classTimingSlot,
    subjectName,
    teacherName,
    teacherLocalId,
  } = req.body;

  //  check if same teacher have lecture on same day and same time

  const ifSameClassOfTeacherExists = await teacherAndSubjectModel.findOne({
    teacherName: teacherName,
    teacherLocalId: teacherLocalId,
    classTimingSlot: classTimingSlot,
    day: day,
  });
  console.log("class already exists");

  if (ifSameClassOfTeacherExists) {
    return res.json({
      success: false,
      message: `${teacherName} have lecture at same time , so not saved`,
    });
  }

  const newTeacherAndSubject = new teacherAndSubjectModel({
    day: day,
    departmentName: departmentName,
    courseName: courseName,
    semesterName: semesterName.toUpperCase(),
    sectionName: sectionName,
    classTimingSlot: classTimingSlot,
    subjectName: subjectName,
    teacherName: teacherName,
    teacherLocalId: teacherLocalId,
  });

  try {
    const savedTeacherAndSubject = await newTeacherAndSubject.save();
    res.json({
      success: true,
      message: `${teacherName} teaches ${subjectName} saved successfully`,
      data: savedTeacherAndSubject,
    });
  } catch (error) {
    res.json({
      success: false,
      message: `data not saved`,
    });

    console.log("errror in saving ", error.message);
  }
};

const getSections = async (req, res) => {
  const { departmentNameOfSubject, courseNameOfSubject, semesterName } =
    req.body;
  try {
    const departmentId = await getSelectedDepartmentId(departmentNameOfSubject);
    const courseId = await getSelectedCourseId(courseNameOfSubject);

    const semesterNameUppercase = semesterName.toUpperCase();

    const sectionNames = await sectionModel.find(
      {
        departmentId: departmentId,
        courseId: courseId,
        semesterName: semesterNameUppercase,
      },
      { sectionName: 1, _id: 0 }
    );

    res.json({
      success: true,
      data: sectionNames,
      message: `${sectionNames} there`,
    });
  } catch (error) {
    res.json({
      success: false,
      message: `fetching sections not successful`,
    });
  }
};

const addSemAndSection = async (req, res) => {
  const { departmentName, courseName, semesterName, sectionName, sectionId } =
    req.body;
  try {
    const departmentId = await getSelectedDepartmentId(departmentName);
    const courseId = await getSelectedCourseId(courseName);
    console.log("we got department id and courseId =", departmentId, courseId);

    const newSection = new sectionModel({
      departmentId: departmentId,
      courseId: courseId,
      semesterName: semesterName.trim().toUpperCase(),
      sectionName: sectionName.toUpperCase().trim(),
      sectionId: sectionId,
    });

    const savedSection = await newSection.save();
    console.log("section saved =====>", savedSection);

    res.json({
      success: true,
      data: savedSection,
      message: `${departmentName} , ${courseName}, ${semesterName} , ${sectionName} saved successfully`,
    });
  } catch (error) {
    res.json({
      success: false,
      message: `${error.message} is an error`,
    });
  }
};

const getSubjectForSection = async (req, res) => {
  console.log("i am in getTeacherAndSubjectForSection with data", req.body);
  const {
    departmentNameOfSubject,
    courseNameOfSubject,
    semesterName,
    sectionName,
  } = req.body;
  try {
    const department = await departmentModel.findOne({
      departmentName: departmentNameOfSubject,
    });
    const id_of_department = department.departmentId;
    console.log("department id fetched-->", id_of_department);

    const course = await courseModel.findOne({
      courseName: courseNameOfSubject,
    });
    const id_of_course = course.courseId;
    console.log("course id fetched -->", id_of_course);

    const id_of_section = await getSelectedSectionId(
      id_of_department,
      id_of_course,
      semesterName.toUpperCase(),
      sectionName
    );
    console.log("section id fetched -->", id_of_section);

    //
    const subjectNames = await subjectModel.find(
      {
        departmentId: id_of_department,
        courseId: id_of_course,
        semesterName: semesterName.toUpperCase(),
        sectionId: id_of_section,
      },
      { subjectName: 1, _id: 0 }
    );

    console.log("subjects we found ---->", subjectNames);
    res.json({
      success: true,
      message: `teachers and subjects fetched successfully`,
      data: { subjectNames },
    });
  } catch (error) {
    res.json;
  }
};

const addTeacher = async (req, res) => {
  console.log("i am in Add Teacher with data =========", req.body);

  const {
    departmentName,
    courseName,
    teacherName,
    teachersLocalId,
    teacherId,
  } = req.body;
  try {
    //fetching the id of department and course to be submitted in db
    const departmentId = await getSelectedDepartmentId(departmentName);
    const courseId = await getSelectedCourseId(courseName);

    const newTeacher = new teacherModel({
      departmentId: departmentId,
      courseId: courseId,
      teacherName: teacherName.toUpperCase(),
      teachersLocalId: teachersLocalId.toUpperCase(),
      teacherId: teacherId,
    });

    const teacherSaved = await newTeacher.save();
    res.json({
      success: true,
      message: `${teacherSaved.teacherName} save sucessfully`,
      data: teacherSaved,
    });
  } catch (error) {
    res.json({
      success: false,
      message: `${error.message} is the error`,
    });
  }
};

const addSubject = async (req, res) => {
  const {
    departmentName,
    courseName,
    semesterName,
    sectionName,
    subjectName,
    subjectId,
  } = req.body;

  try {
    const departmentId = await getSelectedDepartmentId(departmentName);
    console.log("departmentId we got", departmentId);
    const courseId = await getSelectedCourseId(courseName);
    console.log("course id we got ---->", courseId);
    const sectionId = await getSelectedSectionId(
      departmentId,
      courseId,
      semesterName,
      sectionName
    );
    console.log("seciton id we got =====>", sectionId);

    const newSubject = new subjectModel({
      departmentId: departmentId,
      courseId: courseId,
      semesterName: semesterName.toUpperCase(),
      sectionId: sectionId,
      subjectName: subjectName.toUpperCase(),
      subjectId: subjectId,
    });

    const subjectSaved = await newSubject.save();
    res.json({
      success: true,
      message: `${subjectName} is saved successfully`,
    });
    console.log("subject is saved as ---->", subjectSaved);
  } catch (error) {
    res.json({
      success: false,
      message: `${error.message} is an error in saving subject`,
    });
  }
};

const getCourses = async (req, res) => {
  try {
    let courses_we_need = {};
    const { departmentName } = req.body;
    console.log(
      "i am in get courses and will send the names of courses from ",
      departmentName
    );
    const departmentfromDatabase = await departmentModel.findOne({
      departmentName: departmentName,
    });
    const id_of_department = departmentfromDatabase.departmentId;

    let courses_in_department = await courseModel.find({
      departmentId: id_of_department,
    });
    console.log(
      "courses in department " + departmentName + "are" + courses_in_department
    );

    courses_we_need = courses_in_department.map((item) => ({
      courseName: item.courseName,
    }));
    console.log("courses we need", courses_we_need);
    res.json({
      success: true,
      data: courses_we_need,
      message: "courses fetched successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: "no data fetched as " + error.message,
    });
  }
};

const addCourse = async (req, res) => {
  const { departmentName, courseName, courseId } = req.body;

  const departmentId = await getSelectedDepartmentId(departmentName);
  console.log("department details in addcourse", departmentId);

  try {
    const newCourse = new courseModel({
      departmentId: departmentId,
      courseName: courseName.trim().toUpperCase(),
      courseId: courseId,
    });
    const courseSaved = await newCourse.save();

    res.json({
      success: true,
      data: courseSaved,
      message: `${courseSaved.courseName} is saved successfully`,
      data: courseSaved,
    });
  } catch (error) {
    res.json({
      success: false,
      message: `${error.message}-->error from server`,
    });
  }
};

const getDepartments = async (req, res) => {
  try {
    console.log("i am called in get department");

    const departmentList = {
      name: [],
    };
    const records = await departmentModel.find();

    departmentList.name = records.map((record) => record.departmentName);
    console.log("departmentList-->", departmentList);
    res.json({
      success: true,
      departments: departmentList,
      message: "you accessed departments successfully,you can choose one",
    });
  } catch (error) {
    res.json({
      success: false,

      message: "you havn't accessed departments successfully,refresh page",
    });
  }
};
const addDepartment = async (req, res) => {
  const { departmentName, departmentId, departmentDetails } = req.body;
  try {
    const deptDetails = req.body;

    const newDept = new departmentModel({
      departmentName: departmentName.trim().toUpperCase(),
      departmentId: departmentId.trim(),
      departmentDetails: departmentDetails.trim(),
    });

    const departmentSaved = await newDept.save();
    res.json({
      success: true,
      message: "data saved successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: `${error.message} is an error`,
    });
  }
};

export {
  addDepartment,
  getDepartments,
  addCourse,
  addSemAndSection,
  getCourses,
  addSubject,
  addTeacher,
  getSubjectForSection,
  getSections,
  addTeacherAndSubject,
  affixTeacherAndSubject,
  getUsers,
  updateApproval,
  approveRights,
  getIdOfTeacher,
  getTeachersFromCourse,
};
