 
import express from 'express'
import {  getClasseNamesForTheDay } from '../../controllers/TeacherControllers/TeacherControllers.js';
const teacherRouter=express.Router();

 
teacherRouter.post('/getClasseNamesForTheDay',getClasseNamesForTheDay)


export default teacherRouter;