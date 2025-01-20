/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = (props) => {

  const navigate=useNavigate();
  
  const userInitialValues = {
    userName: "",
    userRole: "",
    token: null,
  };


  const [userDetails, setUserDetails] = useState(userInitialValues);

  useEffect(() => {
    const savedUser = localStorage.getItem("savedUser");
    const authToken = localStorage.getItem("authToken");
    const savedRole = localStorage.getItem("savedRole");

    console.log("saved token and saved user", savedUser, authToken);

    if (savedUser && authToken) {
      setUserDetails({
        userName: savedUser,
        token: authToken,
        userRole: savedRole,
      });
    }
  }, []);

  const setLoginDetails = (loginData) => {
    const { userName, userRole, token } = loginData;
    setUserDetails(loginData);
    localStorage.setItem("authToken", token);
    localStorage.setItem("savedUser", userName);
    localStorage.setItem("savedRole", userRole);

  };

  const logout = () => {
    console.log('i am in logout method ⛹️‍♀️');
    
    localStorage.removeItem("authToken");
    localStorage.removeItem("savedUser");
    localStorage.removeItem("savedRole");
     navigate("/")
     window.location.reload();
    // setUserDetails(userInitialValues);
  };
  const contextValue = { userDetails, setLoginDetails, logout };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};
