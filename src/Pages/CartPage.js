import React from 'react'
import Layout from '../Components/Layout/Layout'
import { useCart } from '../Context/Cart'
import { useAuth } from '../Context/Auth'
import { useNavigate } from 'react-router-dom'



const CartPage = () => {
  const [cart,setCart]=useCart()
  const [auth]=useAuth()
  const navigate = useNavigate()

  const totalPrice = ()=>{
    let total = 0
    cart?.map((p)=> {total = total + p.price})
    return total.toLocaleString('en-US',{
      style:'currency',
      currency:"USD"
    })
  }

const removeItem = (pid)=>{
  try{
    let myCart = [...cart]
    let index = myCart.findIndex(p=> p._id === pid)
    myCart.splice(index,1)
    localStorage.setItem('cart', JSON.stringify(myCart))
    setCart(myCart)
  }catch(err){
    console.log(err)
  }
 
}

  return (
    <Layout>
    <div className='container'>
      <div className='row'>
        <h1 className='text-center bg-light p-2'>
          {`Hello  ${auth?.token && auth?.user.name}`}
        </h1>
      </div>
    </div>
    <div className='row'>
      <div className='col-md-6'>
        <div className='row'>
          {
            cart?.map(p => (
              <div className='row card flex-row mb-2 p-3' key={p._id}>
                <div className='col-md-4'>
                <img src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`} width='100px' height='100px' className="card-img-top" alt={p.photo} />
                </div>
                <div className='col-md-8'>
                  <p>{p.name}</p>
                  <p>{p.description}</p>
                  <p>Price:{p.price}</p>
                  <button className='btn btn-danger' onClick={()=> {removeItem(p._id)  }}>Remove</button>
                </div>
              </div>
            ))
          }
        </div>
      </div>
      <div className='col-md-4 text-center '>
        <h2>
          Cart Summary
        </h2>
        <p>Total | Checkout | Payment</p>
        <hr/>
        <h4>Total :{totalPrice()}</h4>
      </div>
    </div>
    </Layout>
  )
}

export default CartPage
