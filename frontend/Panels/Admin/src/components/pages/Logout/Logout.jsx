import { useContext, useEffect } from "react"
import { AuthContext } from "../../../../../../src/AppComponents/Context/AuthContext/AuthContext"

 

const Logout = () => {
   const {logout} =useContext(AuthContext);
   useEffect(()=>{
    console.log('logout executed in logout component');
    
 logout();
   },[])
  return (
    <div>
      <h1>i am in logout</h1>
    </div>
  )
}

export default Logout
