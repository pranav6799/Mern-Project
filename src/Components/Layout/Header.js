import { Link } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";
import { useAuth } from "../../Context/Auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import useCategory from "../Hooks/useCategory";
import { useCart } from "../../Context/Cart";
import {Badge} from 'antd'

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart]=useCart()
  const categories = useCategory()

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth")
    localStorage.removeItem("cart");
    toast.success("Logout Successfully");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand" href="#">
            <BsCart4 /> Ecommerce App
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className="collapse navbar-collapse "
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <SearchInput></SearchInput>
              
                <li className="nav-item ">
                <Link to="/" className="nav-link " aria-current="page" href="#">
                  Home
                </Link>
              </li>
          
             
                <li class="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to={'/categories'} role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Category
                </Link>
                <ul className="dropdown-menu">
                  <li>
                  <Link className="dropdown-item" to={`/categories`}>All Categories</Link>
                  </li>
               {categories?.map((c)=> ( 
                 <li><Link className="dropdown-item" to={`/category/${c.slug}`}>{c.name}</Link></li>
               ) )}
               </ul>
              </li>
              
              
              {!auth.user ? (
                <>
                  <li className="nav-item">
                    <Link to="/register" className="nav-link">
                      Register
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/login" className="nav-link">
                      Login
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {auth?.user?.name}
                    </Link>
                    <ul className="dropdown-menu">
                      <li>
                        <Link className="dropdown-item" to={`/dashboard/${auth?.user?.role === 1 ? 'admin':'user'}`}>
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/login"
                          onClick={handleLogout}
                        >
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </li>
                </>
              )}
              <li className="nav-item">
                {!auth?.user  ?
                 (
                  <>
                  </>
                ):(
                <Badge count={cart?.length} showZero>
                <Link to="/cart" className="nav-link">
                  Cart
                </Link>
                </Badge>
                )}
               
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
