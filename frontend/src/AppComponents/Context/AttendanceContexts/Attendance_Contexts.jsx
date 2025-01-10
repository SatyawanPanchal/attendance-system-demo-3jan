/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useEffect, useState } from "react";



export const CommonContexts=createContext();
const server_url=import.meta.env.VITE_SERVER_URL;
export const CommonContextsProvider=(props)=>
{
    const [departmentNames,setDepartmentNames]=useState([])


    useEffect(() => {
        const fetchDepartmentNames = async () => {
          try {
            console.log("server url", server_url);
    
            const res = await axios.get(`${server_url}/api/admin/getDepartments`);
            console.log("departments", res.data.departments.name);
            setDepartmentNames(res.data.departments.name);
          } catch (error) {
            alert(error.message + "---> is the response from server");
          }
        };
        fetchDepartmentNames();
      }, []);



const contextValues={departmentNames,setDepartmentNames}

return(
    <CommonContexts.Provider value={contextValues}>
    {props.children}

    </CommonContexts.Provider>
)

}