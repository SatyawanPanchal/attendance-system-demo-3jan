/* eslint-disable no-unused-vars */
import axios from "axios";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext/AuthContext";
import "./LoginRegister.css";
import { CommonContexts } from "../Context/AttendanceContexts/Attendance_Contexts";
import { getOtp, sendOtp, verifyOtp } from "./otpSendAndVerify";
const server_url = import.meta.env.VITE_SERVER_URL;
// eslint-disable-next-line react/prop-types
const LoginRegister = ({ setLoginStatus }) => {
  let generatedOtp = getOtp();
  const { setLoginDetails } = useContext(AuthContext);
  const { departmentNames } = useContext(CommonContexts);
  const [userName, setUserName] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(true);
  const [localIds, setLocalIds] = useState([]);

  const [userData, setUserData] = useState({
    departmentName: "",
    loginAs: "",
    localId: "",
    userName: "",
    emailId: "",
    password: "",
    reEnterPassword: "",
    OtpRecieved: "",
  });

  const loginRoles = [
    "SuperUser",
    "Admin",
    "AcademicCoordinator",
    "Teacher",
    "Principal",
    "Parent",
    "Student",
  ];

  const handleSubmitButtonClickForLogin = async () => {
    try {
      const response = await axios.post(
        server_url + "/api/user/loginUser",
        userData
      );
      console.log("login data ⛱️", response.data.data);
      alert(response.data.message);
      console.log("token", response.data.token);

      //alert(response.data.token);
      if (response.data.data.success) {
        console.log("we are logged in ");

        const { userName, role, success  } = response.data.data;
        setLoginDetails({
          userName: userName,
          userRole: role,
          success: success,
          emailId:userData.emailId,
          token: response.data.token,
        });
        // alert(
        //   `${response.data.data.userName} logged in as ${response.data.data.role}  successfully`
        // );
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert(error.message);
    }
  };
  const handleSubmitButtonClickForRegistration = async () => {
    let otpMatched = false;
    // check for the otp is matched or not

    if (userData.OtpRecieved) {
      try {
        const response = await axios.post(
          `${server_url}/api/user/verifyOtp`,
          userData
        );
        if (response.data.success) {
          otpMatched = true;
          console.log("otp matched");
        } else {
          alert(response.data.message);
          return;
        }
      } catch (error) {
        console.log("", error.message);
      }
    }
    // check for password entered and re-entered matched or not

    if (userData.password.trim().length < 4) {
      alert("password length is less than 4");
      return;
    }

    if (userData.password !== userData.reEnterPassword) {
      alert("passwords not matched");
      return;
    }

    if (
      !userData.departmentName ||
      !userData.localId ||
      !userData.userName ||
      !userData.emailId ||
      !userData.password
    ) {
      alert("please fill all the fields");
      return;
    }

    try {
      const response = await axios.post(
        server_url + "/api/user/registerUser",
        userData
      );
      alert(response.data.message);
    } catch (error) {
      console.log("error", error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    console.log("user data -->", userData);
  }, [userData]);

  //fetching the employee ids on the selection of the department name

  useEffect(() => {
    const getEmployeeLocalIds = async () => {
      const departmentName = userData.departmentName;
      try {
        const response = await axios.post(
          `${server_url}/api/user/getLocalIds`,
          { departmentName }
        );
        if (response.data.success) {
          setLocalIds(response.data.data);
        }
      } catch (error) {
        alert(error.message);
      }
    };

    const localIds = getEmployeeLocalIds();
    console.log("localids are...", localIds);
  }, [userData.departmentName]);

  // fetching the teacherName on selection of localId or employee local id

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const response = await axios.post(
          `${server_url}/api/user/getNameFromId`,
          userData
        );
        console.log(
          "response of fetching the name ",
          response.data.data.teacherName
        );
        setUserName(response.data.data.teacherName);
        setUserData((prev) => ({
          ...prev,
          userName: response.data.data.teacherName,
        }));
      } catch (error) {
        console.log("error in fetching the name =", error.message);
      }
    };

    const userName = fetchUserName();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData.localId]);

  return (
    <>
      <div className="main_container">
        <form onSubmit={handleSubmit}>
          {/* employee id */}
          {!isLoggingIn && (
            <div className="elements">
              <label htmlFor="">
                Choose <b>Department</b>
              </label>
              <select
                name="departmentName"
                value={userData.departmentName}
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
          )}
          {/* Entering employee ids */}
          {!isLoggingIn && (
            <div className="elements">
              <label htmlFor="">
                Choose <b>employee id</b>
              </label>
              <select
                name="localId"
                value={userData.localId}
                onChange={handleChange}
              >
                <option value="">Select Local Id Below</option>
                {localIds &&
                  localIds.map((localId, index) => {
                    return (
                      <option key={index} value={localId.teachersLocalId}>
                        {localId.teachersLocalId}
                      </option>
                    );
                  })}
              </select>
            </div>
          )}
          {/* login as */}
          {isLoggingIn && (
            <div className="elements">
              <label htmlFor="">
                <b>Login As</b>
              </label>
              <select
                name="loginAs"
                value={userData.loginAs}
                onChange={handleChange}
                required
              >
                <option value="">Select login As</option>
                {loginRoles.map((personRole, index) => {
                  return (
                    <option key={index} value={personRole}>
                      {personRole}
                    </option>
                  );
                })}
              </select>
            </div>
          )}
          {/* Entering the userName */}
          {!isLoggingIn && (
            <div className="elements">
              <label htmlFor="">
                Your <b>Name</b>{" "}
              </label>
              <input
                type="text"
                name="userName"
                value={userName}
                onChange={handleChange}
              />
            </div>
          )}
          {/* Enter the email id */}
          <div className="elements">
            <label htmlFor="">
              Enter <b>Email</b>{" "}
            </label>
            <input
              type="email"
              name="emailId"
              value={userData.emailId}
              onChange={handleChange}
              required
            />
          </div>
          {!isLoggingIn && (
            <div className="elements">
              <button
                className="sendOtpButton"
                onClick={() =>
                  sendOtp({ otp: generatedOtp, email: userData.emailId })
                }
              >
                Send OTP
              </button>
            </div>
          )}
          {/* Enter the password */}
          <div className="elements">
            <label htmlFor="">
              Enter <b>Password</b>{" "}
            </label>
            <input
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
            />
          </div>
          {/*  re-enter the password */}
          {!isLoggingIn && (
            <div className="elements">
              <label htmlFor="">
                <b>Re-Enter</b> Password
              </label>
              <input
                type="password"
                name="reEnterPassword"
                value={userData.reEnterPassword}
                onChange={handleChange}
              />
            </div>
          )}
          {/* Enter the password */}
          {!isLoggingIn && (
            <div className="elements">
              <label htmlFor="">
                Enter <b>OTP</b>{" "}
              </label>
              <input
                type="text"
                name="OtpRecieved"
                value={userData.OtpRecieved}
                onChange={handleChange}
              />
            </div>
          )}
          {/*  re-enter the password */}
          {/* choose for login and registration */}
          {!isLoggingIn ? (
            <div className="element">
              <label htmlFor="">
                I am already a user{" "}
                <button
                  className="loginOrRegister"
                  onClick={() => setIsLoggingIn((prev) => !prev)}
                >
                  {" "}
                  <b>login here</b>
                </button>
              </label>
            </div>
          ) : (
            <div className="element">
              <label htmlFor="">
                i want to register{" "}
                <button
                  className="loginOrRegister"
                  onClick={() => setIsLoggingIn((prev) => !prev)}
                >
                  <b>Register here</b>
                </button>
              </label>
            </div>
          )}
          {isLoggingIn ? (
            <button
              className="SubmitButton"
              type="submit"
              onClick={() => handleSubmitButtonClickForLogin()}
            >
              Login
            </button>
          ) : (
            <button
              className="SubmitButton"
              type="submit"
              onClick={() => handleSubmitButtonClickForRegistration()}
            >
              Register
            </button>
          )}{" "}
        </form>
      </div>
    </>
  );
};

export default LoginRegister;
