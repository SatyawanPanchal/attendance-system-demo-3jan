import express from 'express'
import {loginUser,registerUser,getLocalIds} from '../../controllers/UserControllers/UserControllers.js'

const userRouters=express.Router();

userRouters.post('/loginUser',loginUser);
userRouters.post('/registerUser',registerUser);
userRouters.post('/getLocalIds',getLocalIds);

export default userRouters;







// import express from 'express';
// import { AddStudents,getLocalId } from '../../controllers/PrincipalControllers/AddStudents.js';

// const principalRouter=express.Router();

// principalRouter.post('/addStudents',AddStudents);
// principalRouter.post('/getLocalId',getLocalId);

// export default principalRouter; 



