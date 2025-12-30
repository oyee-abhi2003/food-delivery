import React, { useContext, useEffect, useState } from 'react';
import './placeorder.css';
import { StoreContextProvider } from "./context/StoreContext.jsx";

import axios from 'axios';
import {useNavigate} from 'react-router-dom'

const PlaceOrder = () => {

  const navigate =useNavigate();

  const { getTotalCartAmount, token, food_list, cartItems, url, user } =
  useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  // ✅ FIXED onChange
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();

    let orderItems = [];

    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        orderItems.push({
          ...item,                     // ✅ clone
          quantity: cartItems[item._id] // ✅ correct key
        });
      }
    });

    let orderData = {
  address: data,
  items: orderItems,
  amount: getTotalCartAmount() + 2,
};


    try {
      const response = await axios.post(
        url + "/api/order/place",
        orderData,
        { headers: { token } }
      );

      if (response.data.success) {
        window.location.replace(response.data.session_url);
      } else {
        alert("Payment failed");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

useEffect(()=>{
  if(!token){
    navigate('/cart')
  }
  else if(getTotalCartAmount()===0)
  {
     navigate('/cart')
  }
},[token])

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>

        <div className="multi-fields">
          <input required name='firstName' value={data.firstName} onChange={onChangeHandler} placeholder='First name' />
          <input required name='lastName' value={data.lastName} onChange={onChangeHandler} placeholder='Last name' />
        </div>

        <input required name='email' value={data.email} onChange={onChangeHandler} placeholder='Email address' />
        <input required name='street' value={data.street} onChange={onChangeHandler} placeholder='Street' />

        <div className="multi-fields">
          <input required name='city' value={data.city} onChange={onChangeHandler} placeholder='City' />
          <input required name='state' value={data.state} onChange={onChangeHandler} placeholder='State' />
        </div>

        <div className="multi-fields">
          <input required name='zipcode' value={data.zipcode} onChange={onChangeHandler} placeholder='Zip code' />
          <input required name='country' value={data.country} onChange={onChangeHandler} placeholder='Country' />
        </div>

        <input required name='phone' value={data.phone} onChange={onChangeHandler} placeholder='Phone' />

        <button type='submit'>PROCEED TO PAYMENT</button>
      </div>
    </form>
  );
};

export default PlaceOrder;
