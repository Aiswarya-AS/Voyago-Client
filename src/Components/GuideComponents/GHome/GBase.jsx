import React from 'react'
import './GBase.css';
import { useLocation } from 'react-router-dom';
import GNavbar from './GNavbar';
import GProfile from './GProfile';

import GRequests from './GRequests';
const GBase = () => {
    const path=useLocation();
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

export default GBase
