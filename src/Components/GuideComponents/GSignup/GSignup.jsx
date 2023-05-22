import React, { useState  } from 'react'
import './GSignup.css'
import axios from 'axios';
import toast from 'react-hot-toast';
const GSignup = () => {
   
  const [first_name,setFirstName]=useState();
  const [last_name,setLastName]=useState();
  const [email,setEmail]=useState();
  const [phone,setPhone]=useState();
  const [place,setPlace]=useState();
  const [pincode,setPincode]=useState();
  const [language,setLanguage]=useState();
  const [password,setPassword]=useState();


  const handleSubmit=(e)=>{
    e.preventDefault()
    const data=JSON.stringify({
      first_name,
      last_name,
      email,
      phone,
      place,
      pincode,
      language,
      password
    })
    axios.post('http://localhost:8000/guide/guide_signup/',data,{
        headers:{"Content-Type": "application/json"},
    }).then((res)=>{
        
        if (res.data.status==='true'){
            toast((t) => (
                <span>
                  Please wait for the  confirmation email from admin to login!!
                  &nbsp;  <button className='btn btn-secondary' onClick={() => toast.dismiss(t.id)}>
                           OK
                           
                  </button>
                </span>
              ));
             setFirstName('')
             setEmail('')
             setLanguage('')
             setPassword('')
             setPhone('')
             setPincode('')
             setPlace('')
             setLastName('')
        }else{
            console.log("oopss....");
        }
    })
  }
  return (
    <>
     <div class="container contact-form mb-5">
            {/* <div class="contact-image">
                <img src="https://image.ibb.co/kUagtU/rocket_contact.png" alt="rocket_contact"/>
            </div> */}
            <form onSubmit={handleSubmit}>
                <h3>Sign Up</h3>
               <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <input type="text" value={first_name} onChange={(e)=>setFirstName(e.target.value)} name="first_name" class="form-control mt-3" placeholder="First Name *" />
                        </div>
                        <div class="form-group">
                            <input type="text"value={last_name} onChange={(e)=>setLastName(e.target.value)} name="last_name" class="form-control mt-3" placeholder="Last Name *" />
                        </div>
                        <div class="form-group">
                            <input type="text"value={email} onChange={(e)=>setEmail(e.target.value)} name="email" class="form-control mt-3" placeholder="Email Address *" />
                        </div>
                        <div class="form-group">
                            <input type="number"value={phone} onChange={(e)=>setPhone(e.target.value)}name="phone" class="form-control mt-3" placeholder="Phone Number *" />
                        </div>
                        
                    </div>
                    <div class="col-md-6">
                    <div class="form-group">
                            <input type="text" name="place"value={place} onChange={(e)=>setPlace(e.target.value)} class="form-control mt-3" placeholder="Your Place *" />
                        </div>
                        <div class="form-group">
                            <input type="text" name="pincode"value={pincode} onChange={(e)=>setPincode(e.target.value)} class="form-control mt-3" placeholder="Pincode *" />
                        </div>
                        <div class="form-group">
                            <input type="text" name="languages"value={language} onChange={(e)=>setLanguage(e.target.value)} class="form-control mt-3" placeholder="Languages Known *" />
                        </div>
                        <div class="form-group">
                            <input type="password" name="txtPhone"value={password} onChange={(e)=>setPassword(e.target.value)} class="form-control mt-3" placeholder="Password *" />
                        </div>
                      
                    </div>
                    <div class="form-group  mt-3 w-25">
                            <input type="submit" name="btnSubmit" class="btnContact " value="Sign Up" />
                        </div>
                </div>
            </form>
</div>

    </>
  )
}

export default GSignup
