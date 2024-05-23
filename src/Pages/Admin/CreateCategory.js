import { useState, useEffect } from "react";
import AdminMenu from "../../Components/Layout/AdminMenu";
import Layout from "../../Components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import CategoryForm from "../../Components/Form/CategoryForm";
import { useAuth } from "../../Context/Auth";
import {Modal} from 'antd'

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name,setName]= useState("")
  const [auth] = useAuth()
  const [visible, setVisible] = useState(false);
  const [selected , setSelected] = useState(null)
  const [updatedName,setUpdatedName]= useState("")

  

  const handleSubmit = async (e)=>{
    e.preventDefault()
try{

  const response = await axios.post('http://localhost:8080/api/v1/category/create-category',{name},{
    headers:{
      'Authorization':auth.token
    }
  }

  )
  console.log(response)
  if(response.data.status){
    getAllCategories()
  }else{
    toast.error(response.data.message)
  }
}catch(err){
  toast.error(err.message)
}

  }

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
        setName("")
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

  const handleUpdate = async (e)=>{
    e.preventDefault()
    
    try{
      const response = await axios.patch(`http://localhost:8080/api/v1/category/update-category/${selected._id}`,{name:updatedName},{
        headers:{
          'Authorization':auth?.token
        }
       
      })
     
      if(response.data.status === true){
        toast.success(`Updated Successfully`)
        setSelected(null)
        setUpdatedName("")
        setVisible(false)
        getAllCategories()
      }
    }catch(err){
      console.log(err.message)
      toast.error(err.message)
    }
  }


  const handleDelete = async (id)=>{
    
    try{
      const response = await axios.delete(`http://localhost:8080/api/v1/category/delete-category/${id}`,{
        headers:{
          'Authorization':auth?.token
        }
       
      })
     
      if(response.data.status === true){
        toast.success(`Deleted Successfully`)       
        getAllCategories()
      }
    }catch(err){
      toast.error(err.message)
    }
  }


  return (
    <Layout title={"Dashboard-CreateCategory"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu></AdminMenu>
          </div>
          <div className="col-md-9">
            <h1>Manage Category</h1>
            <div className="w-50">
            <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} visible={visible}></CategoryForm>
            </div>
            <div className="w-75">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c) => (
                    <>
                      <tr>
                        <td key={c._id}>{c.name}</td>
                        <td>
                          <button className="btn btn-primary ms-2" onClick={()=> {setVisible(true); setSelected(c); setUpdatedName(c.name)}}>Edit</button>
                          <button className="btn btn-danger ms-2" onClick={()=>{handleDelete(c._id)}}>Delete</button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal onCancel={()=> setVisible(false)} footer={null}  visible={visible}>
              <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate}/>
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
