import React from 'react'
import useCategory from '../Components/Hooks/useCategory'
import { Link } from 'react-router-dom'
import Layout from '../Components/Layout/Layout'

const Categories = () => {
  const categories = useCategory()
  return (
    <Layout>  
        <div className='container'>
      <div className='row'>
         {categories.map(c=>  <div className='col-md-6 mt-5 mb-3'>
            <button className='btn btn-primary'><Link className="btn btn-primary"to={`/category/${c.slug}` }>{c.name}</Link></button>
          </div>)}
      </div>
    </div>
    </Layout>

  )
}

export default Categories
