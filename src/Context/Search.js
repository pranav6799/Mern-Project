import { createContext, useContext, useState } from "react";

const SearchContext = createContext()

const SearchProvider = ({children})=>{
  const[values,setValues]= useState({
    results: [],
    keyword: "",
   
})
return(
  <SearchContext.Provider value={[values,setValues]}>
    {children}
  </SearchContext.Provider>
)
}


const useSearch = ()=> useContext(SearchContext)

export {SearchProvider,useSearch}
