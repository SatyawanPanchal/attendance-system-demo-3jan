import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./AppComponents/Context/AuthContext/AuthContext.jsx";
import {   CommonContextsProvider } from "./AppComponents/Context/AttendanceContexts/Attendance_Contexts.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <CommonContextsProvider>
        <App />
      </CommonContextsProvider>
    </AuthProvider>
  </BrowserRouter>
);
