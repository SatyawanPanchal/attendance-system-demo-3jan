import userModel from "../../models/userModel/userModel.js";

const getClasseNamesForTheDay = async (req, res) => {
  const { emailId, day } = req.body;
  console.log("i am in getClassesOfTeacher with data 🏛️---\n\n", emailId, day);
  try {
    if (day === "SUNDAY") {
      res.json({
        success: false,
        message: "date selected is SUNDAY",
      });
    }
    // finding the local id of teacher
    const teacher = await userModel.findOne({ emailId: emailId }) ;
const LocalId_Of_Teacher=teacher.localId;
    console.log("local id of teacher =", LocalId_Of_Teacher);
    // finding the classes  of the teacher
     
     const classesOfTeacher=await teacherAndSubjectModel.find({day:day ,teacherLocalId:LocalId_Of_Teacher})
console.log('classes are here ...',classesOfTeacher);

  } catch (error) {}
};

export { getClasseNamesForTheDay };
