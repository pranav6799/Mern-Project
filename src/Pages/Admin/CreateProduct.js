import React, { useState , useEffect} from 'react'
import AdminMenu from '../../Components/Layout/AdminMenu'
import Layout from '../../Components/Layout/Layout'
import { useAuth } from '../../Context/Auth'
import axios from "axios";
import toast from "react-hot-toast";
import { Select } from 'antd';
import { useNavigate } from 'react-router-dom';
const {Option} = Select

const CreateProducts = () => {
  const [categories,setCategories] = useState([])
  const [price,setPrice]=useState("")
  const [quantity,setQuantity]=useState("")
  const [shipping,setShipping]=useState("")
  const [description,setDescription]=useState("")
  const[category,setCategory]=useState("")
  const [name,setName]=useState("")
  const [photo,setPhoto]=useState()

  const[auth]= useAuth()
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
    //eslint-disable-next-line
  }, []);

  const handleCreate = async(e)=>{
    e.preventDefault()
   
    try{
          const productData = new FormData()
          productData.append("name",name)
          productData.append("price",price)
          productData.append("description",description)
          productData.append("quantity",quantity)
          productData.append("shipping",shipping)
          productData.append("category",category)
          productData.append("photo",photo)

      const response = await axios.post('http://localhost:8080/api/v1/product/create-product',productData
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

  return (
    <Layout title={'Dashboard-Create-Products'}>
      <div className='container-fluid m-3 p-3'>
    <div className='row'>
    <div className='col-md-3'>
      <AdminMenu></AdminMenu>
    </div>
    <div className='col-md-9'>
      <h1>Create Products</h1>
      
      <div className='m-1'>
        <Select bordered={false} placeholder='Select a category' size='large' showSearch className='form-select mb-3' onChange={(value)=>{setCategory(value)}}>
          {categories?.map((c)=> (<Option key={c._id} value={c._id}>{c.name}</Option>))}
        </Select>
        <div className='mb-3'>
          <label className='btn btn-outline-secondary col-md-12'>
              {photo? photo.name : 'Upload Photo'}
            <input type='file' name='photo' accept='image/*' onChange={(e)=> setPhoto(e.target.files[0])} hidden></input>
          </label>
        </div>
        <div className='mb-3'>
          {photo && (
            <div className='text-center'>
              <img src={URL.createObjectURL(photo)} alt='productphoto' height={'200px'} className='img img-responsive'/>
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
        
          <Select className='form-select' bordered={false} placeholder='Select shipping' size='large' showSearch onChange={(value)=> setShipping(value)}>
            <Option value='0'>Yes</Option>
            <Option value='1'>No</Option>
          </Select>
          
        </div>
        <div className='mb-3'>
          <button type='submit' onClick={handleCreate} className=' btn btn-primary' > Create Product</button>
        </div>

        
      </div>
    
    </div>
    
  </div>
  </div>
  </Layout>
  )
}

export default CreateProducts
