import React from 'react'
import './OtpVerifyModal.css'
const OtpVerifyModal = () => {
    const verifyOtp=()=>{
        
    }
  return (
    <div>
      <div class="d-flex justify-content-center align-items-center container-otp">
      <div class="card-otp py-5 px-3">
        <h5 class="m-0">Mobile phone verification</h5>
        <span class="mobile-text-otp"
          ><b>Enter the code we just sent on your phone</b>
          <b class="text-color-otp">+91 09899619282</b>
        </span>
        <div class="d-flex flex-row mt-5">
          <input type="text" class="form-control m-1" autofocus="" />
          <input type="text" class="form-control m-1" />
          <input type="text" class="form-control m-1" />
          <input type="text" class="form-control m-1" />
        </div>
        <div class="text-center mt-5">
            <button className='btn btn-success' onClick={verifyOtp}>Verify</button>
        </div>
      </div>
    </div>
    </div>
  )
}

export default OtpVerifyModal
