import { useState,useEffect } from "react"
import axios from "axios"


export default function useCategory() {
const [categories,setCategories] = useState([])


const getCategory = async()=>{
try{
const response = await axios.get(`http://localhost:8080/api/v1/category/get-all-category`)
if(response?.data?.category){
  setCategories(response?.data?.category)
}
}catch(err){
  console.log(err.message)
}
}

useEffect(()=>{
  getCategory()
},[])

return categories
}
