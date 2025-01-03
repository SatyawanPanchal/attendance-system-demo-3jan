import sectionModel from "../models/AdminModels/AddSemAndSectionModel.js";
import courseModel from "../models/AdminModels/CourseEnteryModel.js";
import departmentModel from "../models/AdminModels/DeptEnteryModel.js";

const getSelectedSectionId=async(departmentId,courseId,semesterName,sectionName)=>{
 
  try {
        const sectionData=await sectionModel.findOne({departmentId:departmentId,courseId:courseId,semesterName:semesterName,sectionName:sectionName});
       return sectionData.sectionId;
        
      } catch (error) {
        console.log('some error',error.message);
        
    
  }
}

const getSelectedDepartmentId = async (departmentName) => {

    const departmentNameSelected=departmentName;
  
      try {
        const department=await departmentModel.findOne({departmentName:departmentNameSelected})
         
         
        return department.departmentId;
        
      } catch (error) {
         console.log(`${error.message}`);
         
      }
    };

    const getSelectedCourseId=async(courseName)=>{
        try {
            const course=await courseModel.findOne({courseName:courseName})
            return course.courseId;
        } catch (error) {
            console.log(`error in getting department id ${error.message}`);
            
        }
    }
export {getSelectedDepartmentId,getSelectedCourseId,getSelectedSectionId}    