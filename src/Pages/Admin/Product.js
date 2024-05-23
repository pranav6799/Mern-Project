import React, { useState, useEffect } from "react";
import AdminMenu from "../../Components/Layout/AdminMenu";
import Layout from '../../Components/Layout/Layout'
import axios from "axios";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/v1/product/get-products"
    );

    if (response.data.status === true) {
      setProducts(response.data.products);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Layout>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Products list</h1>
          <div className="d-flex">
            {products.map((p) => (
              <Link to={`/dashboard/admin/product/${p.slug}`}key={p._id} className="product-link">
              <div className="card m-2" style={{ width: "18rem" }} >
                <img src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.photo} />
                <div className="card-body ">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description}</p>
                </div>
              </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
