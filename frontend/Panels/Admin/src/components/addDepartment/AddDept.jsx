import { useEffect, useState } from "react";
import axios from "axios";
import "./AddDept.css";
 
import {   generateSpecifiedId } from "../../utilities/createdMethods/generateId.js";
import { rejectDeptDuplicateString } from "../../utilities/createdMethods/duplicateStringReject.js";

const AddDept = () => {
  
  const [deptData, setDeptData] = useState({
    departmentName: "",
    departmentId: "",
    departmentDetails: "",
  });

  const [duplicacyError, setDuplicacyError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (deptData.departmentName.length < 3) {
      alert("department name length should be atleast 3 letters");
      return;
    }

    try {
       // for Duplicacy
       const deptDuplicates = await rejectDeptDuplicateString(deptData.departmentName);

       if(deptDuplicates && deptDuplicates.length > 0){
         setDuplicacyError(
          `The department with name ${deptDuplicates.join(",")} already exists.`
        );
         return;
       }

       setDuplicacyError(""); // if no duplicates, clear any existing error
      const resp = await axios.post(
        "http://localhost:4000/api/admin/addDepartment",
        deptData
      );
      alert(`${resp.data.message} is the response`);
    } catch (error) {
      alert(`${error.message} --> occured`);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDeptData({
      ...deptData,
      [name]: value,
    });
  };
  useEffect(() => {
   
    const Id = generateSpecifiedId("Dept",deptData.departmentName);
    console.log('id generated =',Id);
    
    setDeptData((prevData) => ({
      ...prevData,
      departmentId: Id,
    }));
  }, [deptData.departmentName]);


  return (
    <div className="main_container">
      <h1>Add Departments here</h1>
      {/* form starting here */}
      <form onSubmit={handleSubmit}>
        <div className="department-input-div elements">
          {/* departmentName */}
          <label>Enter name of <b>Department:</b></label>
          <input
            type="text"
            name="departmentName"
            value={deptData.departmentName}
            onChange={handleChange}
          />
        </div>

        <div className="department-id-div elements">
          <label htmlFor="">Id of Department:</label>
          <textarea
            type="text"
            name="departmentId"
            value={deptData.departmentId}
            rows={4}
            cols={40}
            readOnly
          />
        </div>

        <div className="department-details-div elements">
          <label>Write department details if Any:</label>
          <textarea
            name="departmentDetails"
            value={deptData.departmentDetails}
            rows={4}
            cols={40}
            onChange={handleChange}
          />
        </div>
        
        {/* Display the error message if it exists */}
        <div className="error_message">
          {duplicacyError}
        </div>
        
        <button className="submitButton" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};
export default AddDept;
