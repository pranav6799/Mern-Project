import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Policy from "./Pages/Policy";
import PageNotFound from "./Pages/PageNotFound";
import Register from "./Pages/Auth/Register";
import Login from "./Pages/Auth/Login";
import Dashboard from "./Pages/User/Dashboard";
import PrivateRoute from "./Routes/Private";
import ForgetPassword from "./Pages/Auth/ForgetPassword";
import AdminRoute from "./Routes/AdminPrivate";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import CreateCategory from "./Pages/Admin/CreateCatergory";
import Users from "./Pages/Admin/Users";
import CreateProducts from "./Pages/Admin/CreateProducts";
import Profile from "./Pages/User/Profile";
import Orders from "./Pages/User/Orders";
import Products from "./Pages/Admin/Products";
import UpdateProducts from "./Pages/Admin/UpdateProduct";
import SearchPage from "./Pages/SearchPage";
import ProductDetails from "./Pages/ProductDetails";
import Categories from "./Pages/Categories";
import CategoryProduct from "./Pages/CategoryProduct";
import CartPage from "./Pages/CartPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchPage/>} />
        <Route path="/cart" element={<CartPage/>} />


        <Route path="/product/:slug" element={<ProductDetails/>} />
        <Route path="/categories" element={<Categories/>} />
        <Route path="/category/:slug" element={<CategoryProduct/>} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/profile" element={<Profile/>} />
          <Route path="user/orders" element={<Orders/>} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProducts />} />
          <Route path="admin/products" element={<Products/>} />
          <Route path="admin/product/:slug" element={<UpdateProducts/>} />
          <Route path="admin/users" element={<Users />} />
        </Route>
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/about" element={<About />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/*" element={<PageNotFound />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
