import React from 'react'
import GNavbar from '../../Components/GuideComponents/GHome/GNavbar'
import GProfile from '../../Components/GuideComponents/GHome/GProfile'
import GHistory from '../../Components/GuideComponents/GHome/GHistory'

const GHistorypage = () => {
  return (
    <div>
    <div class="container">
  <div class="profile">

    <GNavbar/>

      <div class="profile-container">
         <GProfile/>
           <GHistory/>

      </div>
  </div>
</div>
  </div>
  )
}

export default GHistorypage
