import jwt from "jsonwebtoken";
import { getSelectedDepartmentId } from "../../utilities/utilities.js";
import teacherModel from "../../models/AdminModels/TeacherEnteryModel.js";

// let us create the token by using id
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

const getLocalIds = async (req, res) => {
  const { departmentName } = req.body;
  try {
    
      const departmentId = await getSelectedDepartmentId(departmentName);
      console.log("department id=", departmentId);
      
      const departmentLocalIds = await teacherModel.find(
          { departmentId: departmentId },
          { teachersLocalId: 1, _id: 0 }
        );
        console.log("local ids we got", departmentLocalIds);
        if (departmentLocalIds.length === 0) {
            res.json({
                success: false,
                message: "no ids exist under this deparment",
            });
        }
        else{

            res.json({
                success: true,
                message: "ids fetched successfully",
                data: departmentLocalIds,
            });
        }
    } catch (error)
     {
        res.json({
            success:false,
            message:'error in fetching ids'+error.message,
        })
      
    }
};

const registerUser = (req, res) => {
  const { userName, emailId, password, loginAs } = req.body;
  console.log("i am in registerUser at backend");
};

const loginUser = async (req, res) => {
  console.log("i am in login user");

  //const { userName, emailId, password,loginAs } = req.body;

  // try {
  //   const newUser = new userModel({
  //     userName: userName,
  //     emailId: emailId,
  //     password: password,
  //     role:loginAs,

  //   });

  //   const isDuplicate = await userModel.findOne({ emailId: emailId });
  //   if (!isDuplicate) {
  //     const savedUser = await newUser.save();
  //     res.send({
  //       success: true,
  //       userName: savedUser.userName,
  //       role: savedUser.role,
  //       message: "user saved successfully",
  //     });
  //   }
  //   else{
  //     res.send({
  //       success: false,
  //       message: "Already registered with same email" ,
  //     });
  //   }
  // } catch (error) {
  //   res.send({
  //     success: false,
  //     message: "Error found" + error.message,
  //   });
  // }
};

export { loginUser, registerUser, getLocalIds };
