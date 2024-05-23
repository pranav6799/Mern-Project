import React, { useState } from "react";
import Layout from "../../Components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';



const ForgetPassword = () => {


  
  const [email,setEmail]= useState("")
  const [newPassword,setNewPassword]= useState("")
  const [answer,setAnswer] = useState("")
 
  const navigate = useNavigate()


 
  const handleOnSubmit = async(e)=>{
    e.preventDefault()
    try{
        const response = await axios.post(`http://localhost:8080/api/v1/auth/forget-password`,
        
        {email,newPassword,answer})
        if(response.data.status === false){
          toast.error(response.data.message)
        }
        toast.success(response.data && response.data.message)
        
        navigate('/login')
    }catch(err){
      console.log(err)
      toast.error(err.response.data.message)
    }
  }

  return (
    <Layout>
      <div className="form-container">
        <h1 className="registerHeader"> Reset Password</h1>
        <form onSubmit={handleOnSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput2"
              placeholder="Enter Email"
              value={email}
              onChange={(e)=> setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="formGroupExampleInput2"
              placeholder="Enter New Password"
              value={newPassword}
              onChange={(e)=> setNewPassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="formGroupExampleInput2"
              placeholder="Enter Your Favrouite Sports"
              value={answer}
              onChange={(e)=> setAnswer(e.target.value)}
            />
          </div>
          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default ForgetPassword
