import React, { useEffect, useState } from 'react'
import { useAuth } from '../Context/Auth'
import { Outlet } from 'react-router-dom'
import axios from 'axios'
import Spinner from '../Components/Spinner'


const AdminRoute = () => {
  const [ok,setOk] = useState(false)
  const [auth]= useAuth()
useEffect(()=>{
  
  const authCheck =async()=>{
      const response = await axios('http://localhost:8080/api/v1/auth/admin-auth',{
        headers:{
          'Authorization':auth?.token
        }
      })
    
      if(response.data.ok){
        setOk(true)
      }else{
        setOk(false)
      }
  }

  if(auth?.token){
    authCheck()
  }


},[auth?.token])

return ok ? <Outlet/> : <Spinner path='/'/>
}

export default AdminRoute
