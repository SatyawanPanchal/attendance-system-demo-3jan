import mongoose from "mongoose";
import studentModel from "../../models/AcademicModels/AddStudentModel.js";
import teacherModel from "../../models/AdminModels/TeacherEnteryModel.js";
import {
  getSelectedCourseId,
  getSelectedDepartmentId,
} from "../../utilities/utilities.js";

const getLocalId = async (req, res) => {
  const { departmentName, courseName, sectionName } = req.body;
  // splitting the first element from course name
  let courseFirstString = courseName.split(" ")[0];
  let employeeNumber = null;
  let localId = null;
  let localIds = null;
  try {
    // get the department Name and coursename from deaprtment and course tables
    const departmentId = await getSelectedDepartmentId(departmentName);
    const courseId = await getSelectedCourseId(courseName);

    // if there is no teacher in docs
    localIds = await teacherModel.find(
      {
        departmentId: departmentId,
        courseId: courseId,
      },
      { teachersLocalId: 1, _id: 0 }
    );
    console.log("local ids  found--//////////////->", localIds);
    // if no teacher found start it with 101
    if (localIds.length === 0) {
      employeeNumber = 101;
      localId = `${courseFirstString}-${employeeNumber}`;
    }
    // if some teacher found then start it with number greater than largest id in record
    if (localIds.length > 0) {
      console.log(
        "there are more than one record in the table  ====>",
        localIds
      );
      const idnos = localIds.map((id) => id.teachersLocalId.split("-")[1]);
      const lastElement = idnos.sort((a, b) => Number(a) - Number(b)).at(-1);
      const newEmployeeNumber = parseInt(lastElement) + 1;
      localId = `${courseFirstString}-${newEmployeeNumber}`;
    }

    return res.json({
      success: true,
      message: `local id created successfully`,
      data: localId,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message + `is the error`,
    });
    console.log("error -->", error.message);
  }

  console.log("i am in getLocalId with following data", req.body);
};
const AddStudents = async (req, res) => {
  console.log("i am in add students with data", req.body);

  const {
    departmentName,
    courseName,
    semesterName,
    sectionName,
    studentName,
    fatherName,
    rollNumber,
    whatsAppNumber,
  } = req.body;

  try {
    const newstudentModel = new studentModel({
      departmentName: departmentName,
      courseName: courseName,
      semesterName: semesterName,
      sectionName: sectionName,
      studentName: studentName.toUpperCase(),
      fatherName: fatherName.toUpperCase(),
      rollNumber: rollNumber,
      whatsAppNumber: whatsAppNumber,
    });

    const isStudentAlreadyExisting = await studentModel.findOne({
      rollNumber: rollNumber,
    });

    if (isStudentAlreadyExisting) {
      res.json({
        success: false,
        message: `student already exists with the roll number ${rollNumber}`,
      });
    } else {
      const studentSaved = await newstudentModel.save();
      console.log(`students ${studentName} saved successfully `);

      res.json({
        success: true,
        message: `student ${studentName} saved at roll ${rollNumber}`,
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: `error saving students ${error.message}`,
    });
  }
};

export { AddStudents, getLocalId };
