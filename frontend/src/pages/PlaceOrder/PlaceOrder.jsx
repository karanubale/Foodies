import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
    const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: ""
    })
    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))
    }
    
    const placeorder = async (event) => {
        event.preventDefault();
        let orderItems = [];
        food_list.map((item) => {
            if (cartItems[item._id] > 0) {
                let itemInfo = item;
                itemInfo["quantity"] = cartItems[item._id];
                orderItems.push(itemInfo);
            }
        })
        // console.log(orderItems);

        let orderData = {
            address: data,
            items: orderItems,
            amount: getTotalCartAmount() + 2,
        }
        // console.log(orderData);
        let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
        // console.log(response.data.success);
        if (response.data.success) {
            const { session_url } = response.data;
            window.location.replace(session_url);
        }
        else {
            console.log(response)
            alert("Error");
        }
    }
    const navigate=useNavigate();

    useEffect(()=>{
        if(!token)
        {
            navigate('/cart');
        }
        else if(getTotalCartAmount()===0)
        {
            navigate('/cart')
        }

    },[token])

    return (
        <form className="place-order" onSubmit={placeorder}>

            <div className="place-order-left">
                <p className="title">Delivary Information</p>
                <div className="multi-fields">
                    <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='first name' />
                    <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='first name' />
                </div>
                <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='email address ' />
                <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='street' />
                <div className="multi-fields">
                    <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
                    <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='state' />
                </div>
                <div className="multi-fields">
                    <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='zip code' />
                    <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='country' />
                </div>
                <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' />
            </div>
            <div className="place-order-right">
                <div className="cart-total">
                    <h2>Total Cart Amount</h2>
                    <div>
                        <div className="cart-total-details">
                            <p>Subtotal</p>
                            <p>&#x20b9; {getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Delivery Fees</p>
                            <p>&#x20b9; {getTotalCartAmount() === 0 ? 0 : 2}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Total</p>
                            <p>&#x20b9; {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</p>
                        </div>
                    </div>
                    <button type='submit' >Proceed to payment</button>

                </div>
            </div>
        </form>
    )
}

export default PlaceOrder