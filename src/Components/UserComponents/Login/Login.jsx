import toast from 'react-hot-toast';
import axios from '../../../utilis/axios';
import React, { useEffect } from 'react'
// import './Login.css'
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom";
import { loginPost } from '../../../utilis/constants';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";


const Login = () => {
    
    const navigate = useNavigate();
    const {register,handleSubmit,formState: { errors }} =useForm();


    useEffect(()=>{
      const token = Cookies.get('jwt')
      console.log(token)
      if(token){
        navigate('/')
      }
    },[navigate])

    
    const onSubmit=(data)=>{
       
        
        
      
            axios.post(loginPost,data,{headers: { "Content-Type": "application/json" },}).then(
                (res)=>{
                  
                    
                        if(res.data.status==='true'){
                            toast.success('Logged in successfully!!!',{
                              position:'top-right',
                              style: {
                                borderRadius: '10px',
                                background: '#333',
                                color: '#fff',
                              }
                            })
                            Cookies.set("jwt",String(res.data.user_jwt))
                            Cookies.set('user_id',String(res.data.user_id))
                            navigate('/')
                        }else {
                          toast.error('Invalid Email and Password!!',{
                            position:'top-right',
                            style: {
                              borderRadius: '10px',
                              background: '#333',
                              color: '#fff',
                            }
                          })
                          

                        }
                    
                    
                    
                }
            )

        
    }
return (
    <>
 
 {/* <!-- Section: Design Block --> */}
<section class="">
  {/* <!-- Jumbotron --> */}
  <div class="px-4 py-5 px-md-5 text-center text-lg-start" style={{backgroundColor:" hsl(0, 0%, 96%)"}}>
    <div class="container">
      <div class="row gx-lg-5 align-items-center">
        <div class="col-lg-6 mb-5 mb-lg-0">
          <h1 class="my-5 display-3 fw-bold ls-tight">
            Welcome to <br />
            <span class="text-primary">VOYAGO Login</span>
          </h1>
          <p style={{color: "hsl(217, 10%, 50.8%)"}}>
          Please enter your credentials to log in and access your travel account.
          </p>
        </div>

        <div class="col-lg-6 mb-5 mb-lg-0">
          <div class="card">
            <div class="card-body py-5 px-md-5">
              <form onSubmit={handleSubmit(onSubmit)}>
              <h3 className='text-center mb-2'>Welcome Back</h3>

                {/* <!-- Email input --> */}
                <div class="form-outline mb-4 mt-5">
                  <label class="form-label" for="form3Example3">Email address</label>
                  <input type="email" id="form3Example3" name="email"   {...register("email", {
                                            required: "Email is required",
                                            pattern: {
                                              value: /\S+@\S+\.\S+/,
                                              message: "Invalid email format"
                                            }
                                          })} class="form-control" placeholder='Email Address' />
                                          {errors.email && <p className='text-danger  pt-1 px-2  'style={{fontSize:".8rem"}}>{errors.email.message}</p>}
                </div>

                {/* <!-- Password input --> */}
                <div class="form-outline mb-4">
                  <label class="form-label" for="form3Example4">Password</label>
                  <input type="password" id="form3Example4" class="form-control" name="password"  {...register('password',{
        required:"Password is required"
      })} placeholder='Password' />
      {errors.password && <p className='text-danger  pt-1 px-2  'style={{fontSize:".8rem"}}>{errors.password.message}</p>}
                </div>

                

                {/* <!-- Submit button --> */}
                <div className='text-center'>
                <button type="submit" class="btn btn-primary btn-block mb-4 ">
                  Login
                </button>
                </div>
                

                {/* <!-- Register buttons --> */}
                <div class="text-center">
                  <p>Don't Have an Account? <Link to='/signup'>Sign Up</Link> </p>
                  
                </div>
                {/* Link to Regsiter */}
                
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* <!-- Jumbotron --> */}
</section>
{/* <!-- Section: Design Block --> */}
    </>
)
}

export default Login
