import { Route, Routes } from "react-router-dom";
import Home from "../Admin/src/components/pages/Home/Home";
import "./App.css";
import Departments from "../Admin/src/components/pages/Departments/Departments.jsx";
import Courses from "../Admin/src/components/pages/Courses/Courses.jsx";
import Teachers from "../Admin/src/components/pages/Teachers/Teachers.jsx";
import SemAndSections from "../Admin/src/components/pages/SemAndSections/SemAndSections.jsx";
import Subjects from "../Admin/src/components/pages/Subjects/Subjects.jsx";
import TeacherAndSubject from "../Admin/src/components/pages/TeaherAndSubject/TeacherAndSubject.jsx";
import LoginRegister from "./AppComponents/Login-Register/LoginRegister.jsx";
import { useContext, useState } from "react";
// import AdminPanel from "../Admin/src/components/AdminPanel/AdminPanel.jsx";
import PrincipalPanel from "../Principal/src/PrincipalComponents/PrincipalPanel/PrincipalPanel.jsx";
import { AuthContext } from "./AppComponents/Context/AuthContext/AuthContext.jsx";

const App = () => {
  const { userDetails } = useContext(AuthContext);
  // eslint-disable-next-line no-unused-vars
  const [loginStatus, setLoginStatus] = useState(true);

  const user = userDetails.userName; // get from context
  const userRole = userDetails.userRole;
  return (
    <>
      {user} is logged in
      {!user && <LoginRegister setLoginStatus={setLoginStatus} />}
      {userRole === "admin" && (
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/department" element={<Departments />}></Route>
          <Route path="/courses" element={<Courses />}></Route>

          <Route path="/semAndSection" element={<SemAndSections />}></Route>
          <Route path="/teachers" element={<Teachers />}></Route>
          <Route path="/subjects" element={<Subjects />}></Route>
          <Route
            path="/teacherAndSubject"
            element={<TeacherAndSubject />}
          ></Route>
        </Routes>
      )}
      {user === "principal" && <PrincipalPanel />}
    </>
  );
};
export default App;
