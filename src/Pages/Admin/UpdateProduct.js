import React, { useState , useEffect} from 'react'
import AdminMenu from '../../Components/Layout/AdminMenu'
import Layout from '../../Components/Layout/Layout'
import { useAuth } from '../../Context/Auth'
import axios from "axios";
import toast from "react-hot-toast";
import { Select } from 'antd';
import { useNavigate,useParams } from 'react-router-dom';
const {Option} = Select

const UpdateProducts = () => {
  const [categories,setCategories] = useState([])
  const [price,setPrice]=useState("")
  const [quantity,setQuantity]=useState("")
  const [shipping,setShipping]=useState("")
  const [description,setDescription]=useState("")
  const[category,setCategory]=useState("")
  const [name,setName]=useState("")
  const [photo,setPhoto]=useState()
  const [id,setId]=useState('')

  const[auth]= useAuth()
  const navigate = useNavigate()
  const params = useParams()

  const getSingleProduct = async()=>{
    try{
      const response = await axios.get(`http://localhost:8080/api/v1/product/get-one-product/${params.slug}`)

      setName(response.data.product.name)
      setId(response.data.product._id)
      setDescription(response.data.product.description)
      setCategory(response.data.product.category._id)
      setQuantity(response.data.product.quantity)
      setPrice(response.data.product.price)
      setPhoto(response.data.product.photo)


    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    getSingleProduct()
    // eslint-disable-next-line
  },[])

  
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
    //eslint-disable-next-line
  }, []);

  const handleUpdate = async(e)=>{
    e.preventDefault()
   
    try{
          const productData = new FormData()
          productData.append("name",name)
          productData.append("price",price)
          productData.append("description",description)
          productData.append("quantity",quantity)
          productData.append("shipping",shipping)
          productData.append("category",category)
          photo && productData.append("photo",photo)

      const response = await axios.patch(`http://localhost:8080/api/v1/product/update-product/${id}`,productData
      ,{
        headers:{
          'Authorization':auth?.token
        }
      }
      )
      if(response.data.status === true){
        setCategory(response.data.category)
        navigate('/dashboard/admin/products')

        toast.success(response.data.message)
      }
      else{
        toast.error(response.data.message)
      }
    }catch(err){
        toast.error(err.response.data.message)
    }

  }


  const handleDelete = async()=>{

    const response = await axios.delete(`http://localhost:8080/api/v1/product/product-delete/${id}`)
    if(response.data.status === true){
      navigate('/dashboard/admin/products')
      toast.success('Item Deleted')
    }
  }
  return (
    <Layout title={'Dashboard-Create-Products'}>
      <div className='container-fluid m-3 p-3'>
    <div className='row'>
    <div className='col-md-3'>
      <AdminMenu></AdminMenu>
    </div>
    <div className='col-md-9'>
      <h1>Update Products</h1>
      
      <div className='m-1'>
        <Select bordered={false} placeholder='Select a category' size='large' showSearch className='form-select mb-3' onChange={(value)=>{setCategory(value)}} value={category}>
          {categories?.map((c)=> (<Option key={c._id} value={c._id}>{c.name}</Option>))}
        </Select>
        <div className='mb-3'>
          <label className='btn btn-outline-secondary col-md-12'>
              {photo? photo.name : 'Upload Photo'}
            <input type='file' name='photo' accept='image/*' onChange={(e)=> setPhoto(e.target.files[0])} hidden></input>
          </label>
        </div>
        <div className='mb-3'>
          {photo ? (
            <div className='text-center'>
              <img src={URL.createObjectURL(photo)} alt='productphoto' height={'200px'} className='img img-responsive' />
            </div>
          ):(
            <div className='text-center'>
            <img src={`http://localhost:8080/api/v1/product/product-photo/${id}`} alt='productphoto' height={'200px'} className='img img-responsive' />
          </div>
          )}
        </div>
        <div className='mb-3'>
          <input type='text' placeholder='Enter a Name' value={name}className='form-control' onChange={(e)=> setName(e.target.value)}></input>
        </div>
        <div className='mb-3'>
          <textarea type='text' value={description} placeholder='Enter a Description' className='form-control' onChange={(e)=> setDescription(e.target.value)}></textarea>
        </div>
        <div className='mb-3'>
          <input type='number' value={quantity} placeholder='Select Quantity' className='form-control' onChange={(e)=> setQuantity(e.target.value)}></input>
        </div>
        <div className='mb-3'>
          <input type='number' value={price} placeholder='Enter Price' className='form-control' onChange={(e)=> setPrice(e.target.value)}></input>
        </div>
        
        <div className='mb-3'>
        
          <Select className='form-select' bordered={false} placeholder='Select shipping' size='large' showSearch onChange={(value)=> setShipping(value)} value={shipping ? 'Yes': 'No'}>
            <Option value='0'>Yes</Option>
            <Option value='1'>No</Option>
          </Select>
          
        </div>
        <div className='mb-3'>
          <button type='submit' onClick={handleUpdate} className=' btn btn-primary' > Update Product</button>
        </div>
         <div className='mb-3  '>
          <button type='submit' onClick={handleDelete} className=' btn btn-danger' > Delete Product</button>
        </div>
      </div>
    
    </div>
    
  </div>
  </div>
  </Layout>
  )
}

export default UpdateProducts

