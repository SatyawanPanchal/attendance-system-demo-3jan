import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import AddStudents from "./pages/AddStudents/AddStudents.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import AddRollNumberRanges from "./pages/AddRollNumberRanges/AddRollNumberRanges.jsx";
import AddTimeSlots from "./pages/AddTimesSlots/AddTimeSlots.jsx";
import AddTimeTable from "./pages/AddTimeTable/AddTimeTable.jsx";

function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/addStudents" element={<AddStudents />}></Route>
        <Route path="/addTimeSlots" element={<AddTimeSlots/>}></Route>
        <Route path="/addRollNumberRanges" element={<AddRollNumberRanges/>}></Route>
        <Route path="/addTimeTable" element={<AddTimeTable/>}></Route>
      </Routes>
    </>
  );
}
export default App;
