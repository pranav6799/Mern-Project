
// import React, { useEffect, useState } from 'react'
// import Layout from '../Components/Layout/Layout'
// import axios from 'axios'
// import { useParams } from 'react-router-dom'

// const ProductDetails = () => {
// const [product,setProduct] = useState(null)
// const [similar,setSimilar] = useState([])
// const params = useParams()


// useEffect(()=>{
//   if(params?.slug) 
//     getProducts()
  
// },[params.slug])

//   const getProducts = async()=>{
//     try{
//       const response = await axios.get(`http://localhost:8080/api/v1/product/get-one-product/${params.slug}`)
//         setProduct(response?.data?.product)
//         getSimilarProduct(response.data.product._id,response.data.product.category._id)
//     }catch(err){
//       console.log(err.message)
//     }
//   }

//   const getSimilarProduct = async(pid,cid)=>{
//     try{
//       const response = await axios.get(`http://localhost:8080/api/v1/product/similar-product/${pid}/${cid}`) 
//       setSimilar(response?.data?.product)
//     }catch(err){
//       console.log(err)
//     }
//   }

 

//   return (
// // JSON.stringify(product,null,4)

//     <Layout>
//       <div className='row container mt-2'>
//         <div className='col-md-6'>
//         <img src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`} className="card-img-top w-50" alt={product.photo} />
//         </div>
//         <div className='col-md-6 text-left mt-3'>
//         <h1>Product Details</h1>
//         <h6>Name:{product.name}</h6>
//         <h6>Description:{product.description}</h6>
//         <h6>Price:{product.price}</h6>
//         <h6>Category Name:{product.category.name}</h6>
//         <button className='btn btn-secondary mt-2'>Add to cart</button>
//         </div>
//       </div>
//       <div className='row'>
//         <div className='col-md-6'>
//           <h1> Similar Product</h1>
//          {JSON.stringify(similar,null,4)}
//         </div>
//       </div>
      

//       </Layout>
//   )
// }

// export default ProductDetails

import React, { useEffect, useState } from 'react';
import Layout from '../Components/Layout/Layout';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [similar, setSimilar] = useState([]);
  const params = useParams();

  useEffect(() => {
    if (params?.slug) {
      getProducts();
    }
  }, [params.slug]);

  const getProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/product/get-one-product/${params.slug}`);
      setProduct(response?.data?.product);
      getSimilarProduct(response.data.product._id, response.data.product.category._id);
    } catch (err) {
      console.log(err.message);
    }
  };

  const getSimilarProduct = async (pid, cid) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/product/similar-product/${pid}/${cid}`);
      setSimilar(response?.data?.product || []);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout>
      <div className='row container mt-2'>
        {product ? (
          <>
            <div className='col-md-6'>
              <img
                src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`}
                className="card-img-top w-50"
                alt={product.photo}
              />
            </div>
            <div className='col-md-6 text-left mt-3'>
              <h1>Product Details</h1>
              <h6>Name: {product.name}</h6>
              <h6>Description: {product.description}</h6>
              <h6>Price: {product.price}</h6>
              <h6>Category Name: {product.category.name}</h6>
              <button className='btn btn-secondary mt-2'>Add to cart</button>
            </div>
          </>
        ) : (
          <div>Loading...</div>
        )}
      </div>
      <div className='row'>
        <div className='col-md-6'>
          <h1>Similar Products</h1>
          {similar.length ? (
            similar.map((s) => (
              <div key={s._id} className="card m-2" style={{ width: "16rem" }}>
                <img
                  src={`http://localhost:8080/api/v1/product/product-photo/${s._id}`}
                  className="card-img-top"
                  alt={s.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{s.name}</h5>
                  <p className="card-text">{s.description.substring(0, 30)}</p>
                  <p className="card-text">$ {s.price}</p>
                  <button className='btn btn-primary m-1' style={{ fontSize: '12px' }}>More Details</button>
                  <button className='btn btn-secondary m-1' style={{ fontSize: '12px' }}>Add to Cart</button>
                </div>
              </div>
            ))
          ) : (
            <div>No similar products found</div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;

