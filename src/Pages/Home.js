import React, { useEffect, useState } from 'react'
import Layout from '../Components/Layout/Layout'
import { useAuth } from '../Context/Auth'
import toast from 'react-hot-toast'
import axios from 'axios'
import { Checkbox,Radio } from 'antd'
import { Prices } from '../Components/Prices'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../Context/Cart'

const Home = () => {
const [auth] = useAuth()
const[cart,setCart]= useCart()
const [products,setProducts]=useState([])
const [categories,setCategories]=useState([])
const [checked,setChecked]=useState([])
const [radio,setRadio]=useState([])
const [total,setTotal]=useState(0)
const [page,setPage]=useState(1)
const [loading,setLoading]=useState(false)

const navigate = useNavigate()





const getAllCategories = async () => {

  try {


    const response = await axios.get(
      "http://localhost:8080/api/v1/category/get-all-category"
    ,{
      headers:{
        'Authorization':auth?.token
      }
    });
   
    if (response.data.status === true) {
      setCategories(response.data.category);
    
    }
  } catch (err) {
    console.log(err.message);
    toast.error(err.message);
  }
};

useEffect(() => {
  getAllCategories();
  getTotal()
  //eslint-disable-next-line
}, []);



const getAllProducts = async()=>{
  try{
    setLoading(true)
    const response = await axios.get(`http://localhost:8080/api/v1/product/product-list/${page}`)
    setLoading(false)
    setProducts(response.data.products)

  }catch(err){
    setLoading(false)
    toast.error(err.response.message)
  }
}

useEffect(()=>{
  getAllProducts()
},[])


const getTotal = async()=>{
  try{
      const response = await axios.get('http://localhost:8080/api/v1/product/product-count')
  setTotal(response.data.total)
  }catch(err){
    console.log(err.message)
  }
}

useEffect(()=>{ 
  if(page>1)
  loadMore()
  },[page])

const loadMore = async()=>{
  try{
    setLoading(true)
  const response = await axios.get(`http://localhost:8080/api/v1/product/product-list/${page}`)
  setLoading(false)
  setProducts([...products,...response.data.products])
  }catch(err){
console.log(err)
setLoading(false)
toast.error(err.response.message)
  }
}




const handleFilter = (value,id)=>{
  let all = [...checked]
  if(value){
    all.push(id)
  }else{
    all = all.filter(c=> c!==id)
  }
  setChecked(all)
}

useEffect(()=>{
  if(!checked.length || !radio.length) getAllProducts()

 //eslint-disable-next-line   
},[])




const filterProduct = async()=>{
  try{
  
    const response = await axios.post(`http://localhost:8080/api/v1/product/product-filter`,{checked,radio})
    setProducts(response.data.products)
    toast.success(response.data.message)
  }catch(err){
    console.log(err.message)
  }
}

useEffect(()=>{
  if(checked.length || radio.length)
 
 filterProduct()  
 },[checked,radio])





  return (
    <Layout title={'All Products-Best Offer'}>
      <div className='row mt-1'>
        <div className='col-md-3'>
          <h6 className='text-center mt-3'>Filter by Category</h6>
          <div className='d-flex flex-column'>
          {categories?.map((c)=> (
            <Checkbox key={c._id} onChange={(e)=>{handleFilter(e.target.checked,c._id)}}>
                  {c.name}
            </Checkbox>
          ))}
          </div>
          <h6 className='text-center mt-4'>Filter by Price</h6>
          <div className='d-flex flex-column'>
         <Radio.Group onChange={(e)=> setRadio(e.target.value)}>
          {Prices.map(p=>(
            <div>
            <Radio value={p.array}>{p.name}</Radio>
            </div>
          ))}
         </Radio.Group>
          </div>
          <button className='btn btn-danger m-3' onClick={()=> window.location.reload() }>Reset Filter</button>
          
        </div>
        <div className='col-md-9'>
          <h1 className='text-center'>All Products</h1>
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
                  <button className='btn btn-secondary m-1' style={{ fontSize: '12px' }} 
                  onClick={()=> {setCart([...cart,p]); localStorage.setItem('cart', JSON.stringify([...cart,p]))}}> Add to Cart</button>
                  </div>
                 

                </div>
              </div>
            ))}

          </div>
          <div className='m-3 p-3'>
            {products && products.length <total && (
              <button className='btn btn-warning' onClick={(e)=> {
                e.preventDefault();
                setPage(page + 1) }
              } >
                {loading ? 'loading':'Loadmore'}
              </button>
            )  }
          </div>
        </div>
              
      </div>
      
    </Layout>
  )
}

export default Home

