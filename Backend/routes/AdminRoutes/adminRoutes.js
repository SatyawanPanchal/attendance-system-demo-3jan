import express from "express";
import { addDepartment ,getDepartments,addCourse,getCourses,addSemAndSection,addSubject,addTeacher,getTeacherAndSubjectForSection,getSections,addTeacherAndSubject } from "../../controllers/AdminControllers/AddDetails/AddDetails.js";

const adminRouter=express.Router();

adminRouter.get('/getDepartments',getDepartments);
adminRouter.post('/getCourses',getCourses);
adminRouter.post('/getSections',getSections);
 

adminRouter.post('/addDepartment',addDepartment);
adminRouter.post('/addCourse',addCourse);
adminRouter.post('/addSemAndSection',addSemAndSection);
adminRouter.post('/addSubject',addSubject);
adminRouter.post('/addTeacher',addTeacher);
adminRouter.post('/getTeacherAndSubjectForSection',getTeacherAndSubjectForSection);
adminRouter.post('/addTeacherAndSubject',addTeacherAndSubject); 
 
 

export default adminRouter;