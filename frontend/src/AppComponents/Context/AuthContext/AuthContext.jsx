/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {   createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
 
 
  const userInitialValues={
  userName:"",
  userRole:"",
  success:false,
};
 
  const [userDetails, setUserDetails] = useState(userInitialValues);

   

  const setLoginDetails=(loginData)=>{
    const{userName,userRole,success}=loginData;
    setUserDetails(loginData);
  }

  const logout = ( ) => {
    setUserDetails(userInitialValues)
 
  };
const contextValue={  userDetails, setLoginDetails, logout}
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};
