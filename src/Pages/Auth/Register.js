import React, { useState } from "react";
import Layout from "../../Components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';



const Register = () => {


  const [name,setName]= useState("")  
  const [email,setEmail]= useState("")
  const [password,setPassword]= useState("")
  const [phone,setPhone]= useState("")
  const [address,setAddress]= useState("")
  const [answer,setAnswer]= useState("")

  const navigate = useNavigate()


 
  const handleOnSubmit = async(e)=>{
    e.preventDefault()
    try{
        const response = await axios.post(`http://localhost:8080/api/v1/auth/register`,{name,email,password,phone,address,answer})
        toast.success(response.data && response.data.message)
        navigate('/login')
      setEmail("")
      setPassword("")
    }catch(err){
      console.log(err)
      toast.error(err.response.data.message)
    }
  }

  return (
    <Layout>
      <div className="form-container">
        <h1 className="registerHeader"> Register Page</h1>
        <form onSubmit={handleOnSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput"
              placeholder="Enter Name"
              value={name}
              onChange={(e)=> setName(e.target.value)}
            />
          </div>
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
              placeholder="Enter Password"
              value={password}
              onChange={(e)=> setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput2"
              placeholder="Enter Phone"
              value={phone}
              onChange={(e)=> setPhone(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput2"
              placeholder="Enter Address"
              value={address}
              onChange={(e)=> setAddress(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput2"
              placeholder="Enter Answer"
              value={answer}
              onChange={(e)=> setAnswer(e.target.value)}
            />
          </div>
          <button type="submit" class="btn btn-primary" onSubmit={handleOnSubmit}>
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
