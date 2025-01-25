import jwt from "jsonwebtoken";
import { getSelectedDepartmentId } from "../../utilities/utilities.js";
import teacherModel from "../../models/AdminModels/TeacherEnteryModel.js";
import nodemailer from "nodemailer";
import otpModel from "../../models/userModel/otpModel.js";
import bcrypt from "bcrypt";
 
import userModel from "../../models/userModel/userModel.js";

const userId = process.env.USER_ID;
const passW = process.env.USER_PASS;

// let us create the token by using id...

const createToken = (id,role) => {
  return jwt.sign({userId:id,userRole:role }, process.env.JWT_SECRET,{ expiresIn: '1h' });
};


const registerSuperUser=async(req,res)=>{
  console.log('i am in registration of super user 🦹‍♂️🦹‍♀️🦹‍♀️');
  const { departmentName, localId, userName, emailId, password,roles,approved } = req.body;
  console.log("i am in registerUser at backend with data ", req.body);
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("hashed password---->", hashedPassword);

    const alreadyExisting = await userModel.findOne({ emailId: emailId });

    if (alreadyExisting) {
      res.json({
        success: false,
        message: "email already existing",
      });
    }

    const newUser = new userModel({
      departmentName: departmentName,
      localId: localId,
      userName: userName,
      emailId: emailId,
      password: hashedPassword,
      roles:roles,
      approved:approved,
    });

    const savedUser = await newUser.save();

    if (savedUser) {
      console.log("SuperUser is already saved ", savedUser);
      res.json({
        success:true,
        message:`user with email id ${emailId} saved successfully`,
      })
    }
  } catch (error) {
    console.log("error ", error.message);
  }
  
}


const loginUser = async (req, res) => {
  console.log("i am in login user with data",req.body);
 
  const {   emailId, password,loginAs } = req.body;


try {
  
    const user= await userModel.findOne({emailId:emailId });
    
    console.log('we found the data of user as ',user);
    
    if(!user)
    {
      return res.json({
        success:false,
        message:'no such user exist ⚔️'
      })
    }
// mathing for password and role
const isPasswordMatched=await bcrypt.compare(password,user.password);
if(!isPasswordMatched)
{
  console.log('no such password exist ');
  
  return res.json({
    success:false,
    message:'no such password exist ⚔️'
  })
}

// checking for the role is matched or not ..
const isRoleMatched=(user.roles.includes(loginAs));
if(!isRoleMatched){
  return res.json({
    success:false,
    message:'no such role exist ⚔️'
  })

}

console.log('login is success with role ',user.role);

const token=createToken(user._id,user.role);
console.log('we created the token ',token);


return res.json({
  data:{userName:user.userName,role:loginAs,success:true,},
 
  token:token,
   
  message:'successfully loged In 🫸'
})

console.log('user found ==',user);


} catch (error) {
  res.json({
    success:false,
    message:`no such person exists🙏 ${error.message}`,
  })
}
   
};

const verifyOtp = async (req, res) => {
  const { OtpRecieved, emailId } = req.body;

  try {
    const otpData = await otpModel.findOne();
    if (otpData.otp === OtpRecieved) {
      console.log("otp is matched");
      res.json({
        success: true,
        message: "OTP is Matched",
      });
    } else {
      res.json({
        success: false,
        message: "otp is not matched",
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: "some error " + error.message,
    });
  }
};

//sending an otp to others email

const sendOtp = async (req, res) => {
  console.log("i am in send otp with the following data ", req.body);
  const { otp, email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email and userName is required" });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    console.log("otp : ", otp);

    await otpModel.deleteMany().then(async () => {
      const newOtpAndEmail = new otpModel({
        otp: otp,
        email: email,
      });

      const otpSaved = await newOtpAndEmail.save();
      console.log("otp and email saved is as 👍", otpSaved);
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Prakash Techs",
      text: `your otp is valid for 5 mins ${otp}`,
    });
    console.log("OTP sent tried ,reciever might recieve");

    res
      .status(200)
      .json({ success: true, message: "OTP sent tried successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// get the userName from local id selection at frontend
const getNameFromId = async (req, res) => {
  const { departmentName, localId } = req.body;

  console.log("i am in get getNameFromId with data", departmentName, localId);

  try {
    const departmentId = await getSelectedDepartmentId(departmentName);
    console.log("department id=", departmentId);

    const userName = await teacherModel.findOne(
      { teachersLocalId: localId },
      { teacherName: 1, _id: 0 }
    );
    console.log("userName we got", userName);

    res.json({
      success: true,
      message: "ids fetched successfully",
      data: userName,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "error in fetching ids" + error.message,
    });
  }
};

//  get local id of teacher on selection of department
const getLocalIds = async (req, res) => {
  const { departmentName } = req.body;
  try {
    const departmentId = await getSelectedDepartmentId(departmentName);
    console.log("department id=", departmentId);

    const departmentLocalIds = await teacherModel.find(
      { departmentId: departmentId },
      { teachersLocalId: 1, _id: 0 }
    );
     
    if (departmentLocalIds.length === 0) {
      res.json({
        success: false,
        message: "Select department properly",
      });
    } else {
      res.json({
        success: true,
        message: "ids fetched successfully",
        data: departmentLocalIds,
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: "error in fetching ids" + error.message,
    });
  }
};

const registerUser = async (req, res) => {
  const { departmentName, localId, userName, emailId, password } = req.body;
  console.log("i am in registerUser at backend with data ", req.body);
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("hashed password---->", hashedPassword);

    const alreadyExisting = await userModel.findOne({ emailId: emailId });

    if (alreadyExisting) {
      res.json({
        success: false,
        message: "email already existing",
      });
    }

    const newUser = new userModel({
      departmentName: departmentName,
      localId: localId,
      userName: userName,
      emailId: emailId,
      password: hashedPassword,
      approved:false,
    });

    const savedUser = await newUser.save();

    if (savedUser) {
      console.log("saved user -----🤣❤️", savedUser);
      res.json({
        success:true,
        message:`user with email id ${emailId} saved successfully`,
      })
    }
  } catch (error) {
    console.log("error ", error.message);
  }
};



export {
  loginUser,
  registerUser,
  getLocalIds,
  getNameFromId,
  sendOtp,
  verifyOtp,
  registerSuperUser,
};
