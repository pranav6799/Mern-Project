import React from 'react'
import Layout from '../../Components/Layout/Layout'
import UserMenu from '../../Components/Layout/UserMenu'
import { useAuth } from '../../Context/Auth'


const Dashboard = () => {
  const [auth]=useAuth()
  return (
    <Layout title={'User Dashboard'}>
      <div className='container-fluid m-3 p-3'>
      <div className='row'>
        <div className='col-md-3'>
          <UserMenu></UserMenu>
        </div>
        <div className='col-md-8 '>
        <div className='card w-75 p-3 '>
          <h3>User Name:{auth?.user?.name}</h3>
          <h3>User Email:{auth?.user?.email}</h3>
          {/* <h3>User Contact:{auth?.user?.phone}</h3> */}
        </div>
        </div>
      </div>
      </div>
    </Layout>
  )
}

export default Dashboard
