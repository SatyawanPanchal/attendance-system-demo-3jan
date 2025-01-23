import AddTeachers from "../../addTeachers/AddTeachers"
import Navbar from "../../Navbar/Navbar"

 

const Teachers = () => {
  return (
    <div>
      <Navbar/>
      <h1>Add Teachers Below</h1>
      <h1 style={{color:"red", background:"beige" , fontWeight:"400"}}>Please add Teacher only once (in appointed department) </h1>
      <AddTeachers/>
    </div>
  )
}

export default Teachers
