import React, { useState } from "react";
import Layout from "../../Components/Layout/Layout";
import axios from "axios";
import { useNavigate,useLocation } from "react-router-dom";
import toast from 'react-hot-toast';
import { useAuth } from "../../Context/Auth";



const Login = () => {


  
  const [email,setEmail]= useState("")
  const [password,setPassword]= useState("")
  const [auth,setAuth] = useAuth()
 
  const navigate = useNavigate()
  const location = useLocation()


 
  const handleOnSubmit = async(e)=>{
    e.preventDefault()
    try{
        const response = await axios.post(`http://localhost:8080/api/v1/auth/login`,
        
        {email,password})
        if(response.data.status === false){
          toast.error(response.data.message)
        }
        toast.success(response.data && response.data.message)
        setAuth({
          ...auth,
          user:response.data.user,
          token:response.data.token
        })
        localStorage.setItem('auth',JSON.stringify(response.data))
        navigate(location.state || '/')
    }catch(err){
      console.log(err)
      toast.error(err.response.data.message)
    }
  }

  return (
    <Layout>
      <div className="form-container">
        <h1 className="registerHeader"> Login Page</h1>
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
              placeholder="Enter Password"
              value={password}
              onChange={(e)=> setPassword(e.target.value)}
            />
          </div>
          <button type="submit" class="btn btn-primary">
            Submit
          </button>
          <div className="mt-3">
          <button type="button" class="btn btn-primary" onClick={()=> {navigate('/forget-password')}} >
            Forget Password
          </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
