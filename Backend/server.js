import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import adminRouter from "./routes/AdminRoutes/adminRoutes.js";
import principalRouter from "./routes/PrincipalRoutes/PrincipalRoutes.js";
import { connectDB } from "./config/ConnectDB.js";
import academicRouter from "./routes/AcademicRoutes/AcademicsRoutes.js";

dotenv.config();
const app = express();

const port = process.env.PORT;
app.use(cors());
app.use(express.json());
connectDB();

app.use('/api/admin',adminRouter);
app.use('/api/principal',principalRouter);
app.use('/api/academics',academicRouter);


app.listen(port, () => {
  console.log("server in listening at ", port);
});
