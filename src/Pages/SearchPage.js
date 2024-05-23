import React from "react";
import Layout from "../Components/Layout/Layout";
import { useSearch } from "../Context/Search";

const SearchPage = () => {
  const [values]=useSearch()

  console.log("Search results in component:", values.results);

  if (!Array.isArray(values.results) || values.results.length === 0) {
    return (
      <Layout title={"Search Results"}>
        <div className="container">
          <h1>Search Results</h1>
          <h6>No Products Found</h6>
        </div>
      </Layout>
    );
  }
 
  return (
    <Layout title={"Search Results"}>
      <div className="container">
        <h1>Search Results</h1>
        {/* <h6>{values?.results.length < 1 ? "no Products Found" : `Found${values?.results.length}`}</h6> */}
        <div className='d-flex flex-wrap mt-4'>
          {values?.results.map((p) => (
              <div className="card m-2" style={{ width: "16rem" }} >
                <img src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.photo} />
                <div className="card-body ">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description.substring(0,30)}</p>
                  <p className="card-text">$ {p.price}</p>
                  <div className='flex '>
                  <button className='btn btn-primary m-1' style={{ fontSize: '12px' }}>More Details</button>
                  <button className='btn btn-secondary m-1' style={{ fontSize: '12px' }}> Add to Cart</button>
                  </div>
                </div>
              </div>
            ))}

          </div>
      </div>
    </Layout>
  );
};

export default SearchPage;
