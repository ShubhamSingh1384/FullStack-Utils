import React, { useState } from "react";
import axios from 'axios';
import { toast } from "react-toastify";

function App() {
  
  const [phone, setPhone] = useState(null);
  const [isSend, setIsSend] = useState(true);
  const [opt, setOtp] = useState(null);

  const handleSend = ()=>{
    axios.post('http://localhost:4000/api/user/send-otp', { phone })
    .then((data)=>{
      console.log("data is : " , data);
      setIsSend(false);
      toast.success(data.message);
    })
    .catch((error)=>{
      console.log(error, "error in handleSend");
      toast.error(error.response?.data?.message)
    })
  }

  const handleVerify = ()=>{
    axios.post('http://localhost:4000/api/user/verify-otp', { phoneNumber: phone, otp: opt })
    .then((data)=>{
      console.log(data);
      setIsSend(true);
      setOtp(null);
      toast.success("OTP verified Successfully");
    })
    .catch((error)=>{
      toast.error(error.response?.data?.message)
      console.log(error, "error in handleVerify");
    })
  }

  return (
    <>
      {
        isSend ? (
          <div>
        Phone : 
        <input
        onChange={(e)=> setPhone(e.target.value)}
        type="text" name='phone' value={phone} placeholder='Enter your phone number' />
        <button
        onClick={handleSend}
        >Send OTP</button>
      </div>
      ) : (
      <div>
        OPT: 
        <input
         onChange={(e)=> setOtp(e.target.value)}
         type="text" name="otp" value={opt} placeholder="Enter OTP" />
        <button
        onClick={handleVerify}
        >Verify OTP</button>
      </div>
      )
      }
    </>
  )
}

export default App
