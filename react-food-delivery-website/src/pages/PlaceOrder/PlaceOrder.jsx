import { useContext, useEffect, useState} from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from "react-router-dom";

import axios from 'axios'

const PlaceOrder = () => {

  const {getTotalCartAmount, token, food_list, cartItems, url} = useContext(StoreContext);

  const [data, setData] = useState({
      firstName:"",
      lastName:"",
      email:"",
      street:"",
      city:"",
      state:"",
      zipcode:"",
      country:"",
      phone:""
  });

  const onChangeHandler = (event)=>{
    const name = event.target.name;
    const value = event.target.value;

    setData(data=>({...data, [name]:value}));
  }

  const placeOrder = async(event)=>{
    event.preventDefault();
    let orderItems = [];

    food_list.map((item)=>{
      if(cartItems[item._id] >0){
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })
    
    let orderData = {
      address:data,
      items:orderItems,
      amount:getTotalCartAmount()+2
    }

    let response = await axios.post(url+"/api/order/place", orderData, {headers:{token}})
    
    if(response.data.success){
      const {session_url} = response.data;
      console.log(session_url);
      window.location.replace(session_url);
    }else{
      alert("Error");
    }
  }

  const navigate = useNavigate()

  useEffect(()=>{
    if(!token){
      navigate("/cart")
    }else if(getTotalCartAmount()=== 0){
      navigate("/cart");
    }
  }, [token])


  return (
    <form onSubmit={placeOrder} className='place-order'>

      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required type="text" placeholder='First Name' onChange={onChangeHandler} name='firstName' value={data.firstName}/>
          <input required  type="text" placeholder='Last Name' onChange={onChangeHandler} name='lastName' value={data.lastName}/>
        </div>
        <input required  type="email" placeholder='Email Address' onChange={onChangeHandler} name='email'value={data.email}/>
        <input required  type="text" placeholder='Street' onChange={onChangeHandler} name='street' value={data.street}/>
        <div className="multi-fields">
          <input required  type="text" placeholder='City'onChange={onChangeHandler} name='city' value={data.city}/>
          <input required  type="text" placeholder='State' onChange={onChangeHandler} name='state' value={data.state}/>
        </div>
        <div className="multi-fields">
          <input required  type="text" placeholder='Zip code' onChange={onChangeHandler} name='zipcode' value={data.zipcode}/>
          <input required  type="text" placeholder='Country' onChange={onChangeHandler} name='country' value={data.country}/>
        </div>
        <input required  type="text" placeholder='Phone' onChange={onChangeHandler} name='phone' value={data.phone} />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>

            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />

            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() ? 2 : 0}</p>
            </div>
            <hr />

            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount() ? getTotalCartAmount() + 2 : 0}</b>
            </div>

          </div>

          <button type='submit' >PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
