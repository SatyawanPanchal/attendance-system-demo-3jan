import axios from "axios";
 
const server_url = import.meta.env.VITE_SERVER_URL;

const getOtp = () => {
    const length = 6;
    let otp = '';
    for (let i = 0; i < length; i++) {
      otp += Math.floor(Math.random() * 10); // Generate random digits between 0-9
    }
     
    return otp;
};

const sendOtp = async ({otp,email} ) => {
      
     
  try {
    const response = await axios.post(`${server_url}/api/user/sendOtp`,  
      {otp,email},
    );
    console.log(response.data);
    return response.data.success;
  } catch (error) {
    console.log("error", error.message);
  }
};

const verifyOtp = async () => {
  alert("verifying otp");
};

export { sendOtp, verifyOtp, getOtp };
