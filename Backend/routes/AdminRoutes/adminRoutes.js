import express from "express";
import { addDepartment ,getDepartments,addCourse,getCourses,addSemAndSection,addSubject,addTeacher,getSubjectForSection,getSections,addTeacherAndSubject,getUsers,updateApproval,approveRights,affixTeacherAndSubject ,getIdOfTeacher,getTeachersFromCourse} from "../../controllers/AdminControllers/AddDetails/AddDetails.js";

const adminRouter=express.Router();

adminRouter.get('/getDepartments',getDepartments);
adminRouter.post('/getCourses',getCourses);
adminRouter.post('/getSections',getSections);
 

adminRouter.post('/addDepartment',addDepartment);
adminRouter.post('/addCourse',addCourse);
adminRouter.post('/addSemAndSection',addSemAndSection);
adminRouter.post('/addSubject',addSubject);
adminRouter.post('/addTeacher',addTeacher);
adminRouter.post('/getSubjectForSection',getSubjectForSection);
adminRouter.post('/addTeacherAndSubject',addTeacherAndSubject);
adminRouter.post('/getUsers',getUsers) ;
adminRouter.post('/updateApproval',updateApproval);
adminRouter.post('/approveRights',approveRights);
adminRouter.post('/affixTeacherAndSubject',affixTeacherAndSubject);
adminRouter.post('/getIdOfTeacher',getIdOfTeacher);
adminRouter.post('/getTeachersFromCourse',getTeachersFromCourse)
 
 

export default adminRouter;