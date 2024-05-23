import React from "react";
import { Link } from "react-router-dom";

const UserMenu = () => {
  return (
    <>
      <div className="text-centre">
        <div className="list-group">
          <h4>Dashboard</h4>
          <Link to="/dashboard/user/profile" className="list-group-item list-group-item-action">
            Profile
          </Link>
          <Link to="/dashboard/user/orders" className="list-group-item list-group-item-action">
            Orders
          </Link>
        </div>
      </div>
    </>
  );
};

export default UserMenu;
