import React, { useEffect, useState } from 'react'
import GNavbar from './GNavbar'
import GProfile from './GProfile'
import GRequests from './GRequests'
import GHistory from './GHistory'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import GDetails from './GDetails'
import axios from '../../../utilis/axios'
const Guide = () => {
    const navigate = useNavigate()
    const handleLogout=()=>{
        Cookies.remove('guide_id')
        Cookies.remove('guide_jwt')
        navigate('/guide_login')
    }
    const guide_id=Cookies.get('guide_id')
    const [guide,setGuide]=useState([])
    const guideDetails=()=>{
        axios.get(`${'http://127.0.0.1:8000/guide/guide'}/${guide_id}`).then((res)=>{
            setGuide(res.data.serdata)
            
        })
    }
    useEffect(()=>{
        guideDetails();
    },[])

  return (
    <>
     <div className='container col-md-12'>
        <div className='profile'>
            {/* <GNavbar/> */}
            <div class="profile-header">
            <div class="profile-header-cover"></div>
            <div class="profile-header-content">
                <div class="profile-header-img">
                    <img  src={`https://res.cloudinary.com/dmysmwucj/${guide.image}`} alt="" />
                </div>
                



            <ul class="nav nav-tabs mx-3" id="myTab" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Requests</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Profile</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">History</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" type="button" role="tab" aria-controls="contact" onClick={handleLogout}> <span className='text-danger'>Logout</span></button>
                    </li>
            </ul>
                
            </div>
        </div>
            <div className='profile-container'>
                <GProfile/>   
                <div class="tab-content" id="myTabContent">
                    <div class="tab-pane fade show active col-md-12" id="home" role="tabpanel" aria-labelledby="home-tab">
                    <GRequests/> 
                    </div>
                    <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                       <GDetails data={guide} guideDetails={guideDetails}/>
                    </div>
                    <div class="tab-pane fade col-md-12" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                        <GHistory/>
                    </div>
                </div>
            </div>
        </div>
     </div>
    </>
  )
}

export default Guide
