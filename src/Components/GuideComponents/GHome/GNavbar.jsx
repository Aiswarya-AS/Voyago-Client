import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
const GNavbar = () => {
    const navigate=useNavigate()
    const handleLogout=()=>{
        const token=Cookies.get('guide_jwt')
       
      if (token){
        Cookies.remove('guide_jwt')
        Cookies.remove('guide_id')
        navigate('/guide_login')
      }
    }
  return (
    <>
       <div class="profile-header">
            <div class="profile-header-cover"></div>
            <div class="profile-header-content">
                <div class="profile-header-img">
                    <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="" />
                </div>
                



            <ul class="nav nav-tabs mx-3" id="myTab" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Profile</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">Contact</button>
                    </li>
            </ul>
                <div class="tab-content" id="myTabContent">
                <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                    
                </div>
                <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">...</div>
                <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">...</div>
                </div>
            </div>
        </div>
    </>
  )
}

export default GNavbar
