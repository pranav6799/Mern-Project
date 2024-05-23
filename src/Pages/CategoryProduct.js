import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Layout from '../Components/Layout/Layout'


const CategoryProduct = () => {
  const params = useParams()
const [category,setCategory] = useState("")
const [products,setProduct] = useState([])
const navigate = useNavigate()

useEffect(()=>{
  if(params?.slug)
  getProductByCat()
},[params.slug])

const getProductByCat = async()=>{
  try{
    const response = await axios.get(`http://localhost:8080/api/v1/product/product-category/${params.slug}`)
    setCategory(response?.data?.category)
    setProduct(response.data.product)
  }catch(err){
    console.log(err)
  }
}
 
  return (
    <Layout>
    <div className='mt-3'>
    <h1>H1</h1>
    <h1 className='text-center'>{category.name}</h1>
    <h1 className='text-center'>{products.length}</h1>
    <div className='row'>
    <div className='d-flex flex-wrap'>
          {products.map((p) => (
              <div className="card m-2" style={{ width: "16rem" }} >
                <img src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.photo} />
                <div className="card-body ">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description.substring(0,30)}</p>
                  <p className="card-text">$ {p.price}</p>
                  <div className='flex '>
                  <button className='btn btn-primary m-1' style={{ fontSize: '12px' }} onClick={()=> navigate(`/product/${p.slug}`)}>More Details</button>
                  <button className='btn btn-secondary m-1' style={{ fontSize: '12px' }}> Add to Cart</button>
                  </div>
                 

                </div>
              </div>
            ))}

          </div>
    </div>
    </div>
    </Layout>
  )
}

export default CategoryProduct
