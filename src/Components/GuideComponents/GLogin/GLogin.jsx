import React, { useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';
const GLogin = () => {
    
    const [email,setEmail]=useState();
    
    const [password,setPassword]=useState();
    const navigate = useNavigate();
  
    const handleSubmit=(e)=>{
      e.preventDefault()
      const data=JSON.stringify({
        
        email,
       
        password
      })
      axios.post('http://localhost:8000/guide/guide_login/',data,{
          headers:{"Content-Type": "application/json"},
      }).then((res)=>{
          
        if(res.data.status==='true'){
            toast.success('Logined successfully!!!',{
                position:'top-center',
                style: {
                  borderRadius: '10px',
                  background: '#333',
                  color: '#fff',
                }
              })
              Cookies.set("guide_jwt",String(res.data.guide_jwt))
              Cookies.set('guide_id',String(res.data.guide_id))
              navigate('/guide')
        }else{
            toast.error('Invalid Email and Password!!',{
                position:'top-center',
                style: {
                  borderRadius: '10px',
                  background: '#333',
                  color: '#fff',
                }
              })
        }
        
      })
    }
    return (
      <>
       <div class="container contact-form mb-5"style={{width:"40rem"}}>
              {/* <div class="contact-image">
                  <img src="https://image.ibb.co/kUagtU/rocket_contact.png" alt="rocket_contact"/>
              </div> */}
              <form onSubmit={handleSubmit}>
                  <h3>Login</h3>
                 <div class="row " >
                      <div class="col-md-12">
                        
                        
                          <div class="form-group">
                              <input type="text"value={email} onChange={(e)=>setEmail(e.target.value)} name="email" class="form-control mt-3" placeholder="Email Address *" required />
                          </div>
                          <div class="form-group">
                              <input type="password" name="txtPhone"value={password} onChange={(e)=>setPassword(e.target.value)} class="form-control mt-3" placeholder="Password *" required />
                          </div>
                          <div class="form-group text-center">
                            <input type="submit" name="btnSubmit" class="btnContact mt-3" value="Login" />
                        </div>
                        <div className='form-group text-center mt-2'>
                                <Link  to= '/guide_signup'className='text-decoration-none'>Register</Link>
                        </div>
                      </div>
                    
                  </div>
              </form>
              
  </div>
  
      </>
  )
}

export default GLogin
