import express from "express";
import { addRollNumberRanges, addTimeTableSlots,getClassTimeSlots,getTeacherLocalId } from "../../controllers/AcademicControllers/StudentDataEntry.js";

const academicRouter = express.Router();

academicRouter.post("/addRollNumberRanges", addRollNumberRanges);
academicRouter.post("/addTimeTableSlots",addTimeTableSlots);
academicRouter.post('/getClassTimeSlots',getClassTimeSlots);
academicRouter.post('/getTeacherLocalId',getTeacherLocalId)

export default academicRouter;

 
