import React from "react";
import { Link } from "react-router-dom";

const AdminMenu = () => {
  return (
    <>
      <div className="text-centre">
        <div className="list-group text-center">
          <h4 className="text-center">Admin Panel</h4>
          <Link to="/dashboard/admin/create-category" className="list-group-item list-group-item-action">
            Create Category
          </Link>
          <Link to="/dashboard/admin/create-product" className="list-group-item list-group-item-action">
            Create Products
          </Link>
          <Link to="/dashboard/admin/products" className="list-group-item list-group-item-action">
            Products
          </Link>
          <Link to="/dashboard/admin/users" className="list-group-item list-group-item-action">
            Users
          </Link>
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
