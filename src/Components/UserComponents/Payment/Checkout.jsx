// import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useCallback } from "react";
import useRazorpay from "react-razorpay";
const Checkout = () => {
    const Razorpay = useRazorpay();
    // const [checkoutData]=useState(location.state.data)
    const parms=useParams()
    const [orderdata,setorderData] = useState({}) 
    
    const amount=orderdata.total_amount
    const navigate = useNavigate()
    
    useEffect(()=>{
        axios.get(`${'http://127.0.0.1:8000/user/order_recap'}/${parms.id}`).then((res)=>{
            setorderData(res.data)
            
        })
    },[parms.id])

    const booking=()=>{
        axios.post('http://127.0.0.1:8000/user/payment',{data:{orderdata},amount:amount},{
            headers:{"Content-Type": "application/json"}
        }).then((res)=>{
            console.log(res.data);
    
        })
    }

const handlePayment=useCallback(()=>{
    const options= {
        key: "rzp_test_kHXZcATGWVEeS7",
        amount: amount*100,
        currency: "INR",
        name: "Acme Corp",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        // order_id: order.id,
        handler: (res) => {
            
            if (res.razorpay_payment_id){
                booking()
                navigate('/',{state:{data:orderdata}})
            }
        },
        prefill: {
            name: "Piyush Garg",
            email: "youremail@example.com",
            contact: "9999999999",
        },
        notes: {
            address: "Razorpay Corporate Office",
        },
        theme: {
            color: "#3399cc",
        },
        modal: {
            ondismiss: function() {
              
            }
          }
      };
  
      const rzpay = new Razorpay(options);
      rzpay.open();
},[Razorpay,orderdata])

  return (
    <>
    <div class="container rounded bg-white">
    <div class="row d-flex justify-content-center pb-5">
    
        <div class="col-sm-3 col-md-12 offset-md-1 mobile">
         
            <div class="bg-light rounded d-flex flex-column p-5 mt-5 " style={{width:'75rem'}}>
                <div class="p-2  mx-5 text-center"  ><h4 >Order Recap</h4></div>
                {/* <div class="p-2 d-flex">
                    <div class="col-8">State</div>
                    <div class="ml-auto">$186.76</div>
                </div>

                <div class="p-2 d-flex">
                    <div class="col-8">Country</div>
                    <div class="ml-auto">$186.76</div>
                </div> */}
                
                <div class="p-2 d-flex">
                    <div class="col-8">Location</div>
                    <div class="ml-auto">{orderdata.guide_place},{orderdata.state},{orderdata.country}</div>
                </div>

                <div class="p-2 d-flex">
                    <div class="col-8">Date</div>
                    <div class="ml-auto">{orderdata.date}</div>
                </div>
                <div class="p-2 d-flex">
                    <div class="col-8">Time</div>
                    <div class="ml-auto">{orderdata.time}</div>
                </div>
                <div class="p-2 d-flex">
                    <div class="col-8">Guide Name</div>
                    <div class="ml-auto">{orderdata.guide_name}</div>
                </div>

                <div class="p-2 d-flex">
                    <div class="col-8">Total Persons</div>
                    <div class="ml-auto">{orderdata.total_peoples}</div>
                </div>
                <div class="p-2 d-flex">
                    <div class="col-8">Guide Price</div>
                    <div class="ml-auto">{orderdata.price}</div>
                </div>

             
          
                <div class="border-top px-4 mx-3"></div>
                <div class="p-2 d-flex pt-3">
                    <div class="col-8"><b>Total</b></div>
                    <div class="ml-auto"><b class="green">{orderdata.total_amount}</b></div>
                </div>

                <div class="p-2 d-flex pt-3">
                    <div class="col-8"> <button className='btn btn-outline-secondary'>Cancel</button> </div>
                    <div class="ml-auto"> <button onClick={handlePayment} className='btn btn-success'>Procced to pay</button> </div>
                </div>
            </div>
        </div>        
    </div>
</div>
    </>
  )
}

export default Checkout
