import React from 'react'
import GNavbar from '../../Components/GuideComponents/GHome/GNavbar'
import GProfile from '../../Components/GuideComponents/GHome/GProfile'
import GRequests from '../../Components/GuideComponents/GHome/GRequests'
import '../../Components/GuideComponents/GHome/GBase.css'


const GRequestPage = () => {
  return (
    <div>
    <div class="container">
  <div class="profile">

    <GNavbar/>

      <div class="profile-container">
         <GProfile/>
           <GRequests/>

      </div>
  </div>
</div>
  </div>
  )
}

export default GRequestPage
