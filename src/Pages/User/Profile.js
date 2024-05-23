import React, { useEffect, useState } from 'react'
import Layout from '../../Components/Layout/Layout'
import UserMenu from '../../Components/Layout/UserMenu'
import { useAuth } from '../../Context/Auth'
import axios from "axios";
import toast from 'react-hot-toast';

const Profile = () => {
  const [name,setName]= useState("")  
  const [email,setEmail]= useState("")
  const [phone,setPhone]= useState("")
  const [address,setAddress]= useState("")
  const [auth,setAuth]=useAuth()

  const handleOnSubmit = async(e)=>{
    e.preventDefault()
    try{
        const response = await axios.post(`http://localhost:8080/api/v1/auth/register`,{name,email,phone,address})
        toast.success(response.data && response.data.message)
      setEmail("")
     
    }catch(err){
      console.log(err)
      toast.error(err.response.data.message)
    }
  }

  useEffect(()=>{
    const {name,email,address,phone}=auth?.user

    setName(name);
    setEmail(email)
    setAddress(address)
    setPhone(phone)
  },[auth?.user])

  return (
    
    <Layout title={'Profile'}>
      <div className='container-fluid m-3 p-3'>
    <div className='row'>
      <div className='col-md-3'>
        <UserMenu></UserMenu>
      </div>
      <div className='col-md-9'>
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
              disabled
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
          <button type="submit" class="btn btn-primary" onSubmit={handleOnSubmit}>
            Submit
          </button>
        </form>
      </div>

      </div>
      
    </div>
    </div>
    </Layout>
  
  )
}

export default Profile
