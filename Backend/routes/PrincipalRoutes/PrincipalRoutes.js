import express from 'express';
import { AddStudents,getLocalId } from '../../controllers/PrincipalControllers/AddStudents.js';

const principalRouter=express.Router();

principalRouter.post('/addStudents',AddStudents);
principalRouter.post('/getLocalId',getLocalId);

export default principalRouter; 