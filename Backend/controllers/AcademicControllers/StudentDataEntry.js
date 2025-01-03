import mongoose from "mongoose";
import rollRangeModel from "../../models/AcademicModels/addRollNumberRange.js";
import timeTableSlotsModel from "../../models/AcademicModels/addTimeTableSlots.js";
import teacherModel from "../../models/AdminModels/TeacherEnteryModel.js";
import {
  getSelectedCourseId,
  getSelectedDepartmentId,
} from "../../utilities/utilities.js";

const getTeacherLocalId = async (req, res) => {
  console.log(
    "i am at server end in getTeacherLocalId with data=-=-=-=",
    req.body
  );
  const { departmentName, courseName, teacherName } = req.body;

  try {
    const departmentId = await getSelectedDepartmentId(departmentName);
    const courseId = await getSelectedCourseId(courseName);
    const teacherWithSameNameIds = await teacherModel.find(
      {
        departmentId: departmentId,
        courseId: courseId,
        teacherName: teacherName,
      },
      { teachersLocalId: 1, _id: 0 }
    );

    res.json({
      success: true,
      message: `data is fetched successfully ..`,
      data: teacherWithSameNameIds,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message + "is the error",
    });
  }
};

const getClassTimeSlots = async (req, res) => {
  try {
    console.log("i am in getClassTimeSlots function");

    const slotsData = await timeTableSlotsModel.find();
    //  console.log('slots we got..',slotsData);
    const slots = slotsData.map(
      (slot) => `${slot.classStartsFrom}-${slot.classEndsAt}`
    );
    console.log("slots we got", slots);
    return res.json({
      success: true,
      message: `data fetched successfully`,
      data: slots,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message + "is the error",
    });
    console.log("error", error.message);
  }
};

const addTimeTableSlots = async (req, res) => {
  const { slotName, classStartsFrom, classEndsAt } = req.body;

  console.log("i am in addTimeTableSlots with data", req.body);

  try {
    const newtimeTableSlots = new timeTableSlotsModel({
      slotName,
      classStartsFrom,
      classEndsAt,
    });
    const savedSlot = await newtimeTableSlots.save();
    res.json({
      success: true,
      message: `data saved successfully`,
      data: savedSlot,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message + "data not saved",
    });
  }
};

const addRollNumberRanges = async (req, res) => {
  try {
    console.log("i am in addRollNumberRanges with data ", req.body);

    const {
      departmentName,
      courseName,
      semesterName,
      sectionName,
      rollStartsFrom,
      rollEndsWith,
      extraRolls,
    } = req.body;

    if (
      !departmentName ||
      !courseName ||
      !semesterName ||
      !sectionName ||
      !rollStartsFrom ||
      !rollEndsWith
    ) {
      return res.json({
        success: false,
        message: "Missing required fields.",
      });
    }

    // Check if rollStartsFrom and rollEndsWith are valid numbers
    if (isNaN(rollStartsFrom) || isNaN(rollEndsWith)) {
      return res.status(400).json({
        success: false,
        message: "Roll number range must be valid numbers.",
      });
    }

    // Check that rollStartsFrom is less than or equal to rollEndsWith
    if (parseInt(rollStartsFrom) > parseInt(rollEndsWith)) {
      return res.json({
        success: false,
        message: "Starts From should be less than or equal to End With.",
      });
    }

    // Check if the combination of departmentName, courseName, semesterName, and sectionName already exists

    const existingRollRange = await rollRangeModel.findOne({
      departmentName,
      courseName,
      semesterName,
      sectionName,
    });

    if (existingRollRange) {
      return res.json({
        success: false,
        message:
          "A roll number range with the same department, course, semester, and section already exists. ",
        data: existingRollRange,
      });
    }
    const newRollRanges = new rollRangeModel({
      departmentName: departmentName,
      courseName: courseName,
      semesterName: semesterName,
      sectionName: sectionName,
      rollStartsFrom: rollStartsFrom,
      rollEndsWith: rollEndsWith,
      extraRolls: extraRolls,
    });

    const savedRolls = await newRollRanges.save();

    res.json({
      success: true,
      data: savedRolls,
      message: "data is saved successfully...",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message + "data  not saved...",
    });
  }
};

export {
  addRollNumberRanges,
  addTimeTableSlots,
  getClassTimeSlots,
  getTeacherLocalId,
};
