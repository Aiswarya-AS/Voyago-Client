import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/UserPages/LoginPage";
import SignupPage from "./Pages/UserPages/SignupPage";
import HomePage from "./Pages/UserPages/HomePage";
import DestinationPage from "./Pages/UserPages/DestinationPage";
import DestinationDetailPage from "./Pages/UserPages/DestinationDetailPage";
import ErrorPage from "./Pages/ErrorPage";
import GSignupPage from "./Pages/GuidePages/GSignupPage";
import GHomePage from "./Pages/GuidePages/GHomePage";

import GRequestPage from "./Pages/GuidePages/GRequestPage";
import GuideDetailPage from "./Pages/UserPages/GuideDetailPage";
import ProfilePage from "./Pages/UserPages/ProfilePage";
import UserRequestPage from "./Pages/UserPages/UserRequestPage";
// import Login from './Components/UserComponents/Login/Login';
import { Toaster } from "react-hot-toast";
import GLogin from "./Components/GuideComponents/GLogin/GLogin";
import {
  AuthorizeGuide,
  AuthorizeUser,
  RequireLoginGuide,
  RequireLoginUser,
} from "./utilis/Conditions";
import Checkout from "./Components/UserComponents/Payment/Checkout";
import BookingHistoryPage from "./Pages/UserPages/BookingHistoryPage";
import OrderConfirmation from "./Components/UserComponents/UserProfile/OrderConfirmation";
import ProfileUpdatePage from "./Pages/UserPages/ProfileUpdatePage";
import UserProfile from "./Components/UserComponents/UserProfile/UserProfile";
import GHistorypage from "./Pages/GuidePages/GHistorypage";
import Guide from "./Components/GuideComponents/GHome/Guide";
import OtpVerifyModal from "./Components/GuideComponents/GHome/OtpVerifyModal";
function App() {
  return (
    <div className="App">
      <Toaster />
      <Router>
        <Routes>
          {/* User Routes */}
          <Route path="*" element={<ErrorPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>

          <Route path="/signup" element={<SignupPage />}></Route>

          <Route
            path="/"
            element={
             
                <HomePage />
              
            }
          />

          <Route element={<RequireLoginUser />}>
            <Route
              path="/destinations"
              element={
                
                  <DestinationPage />
                
              }
            ></Route>
            <Route
              path="/destination/:id"
              element={<DestinationDetailPage />}
            ></Route>
            <Route
              path="/guide/:id"
              element={
                
                  <GuideDetailPage />
                
              }
            ></Route>
            {/* Profile */}
            {/* <Route path="/profile" element={<ProfilePage/>}></Route> */}
            <Route
              path="/profileUpdate"
              element={
                
                  <ProfileUpdatePage />
                
              }
            ></Route>
            <Route
              path="/requests"
              element={
                
                  <UserRequestPage />
                
              }
            />
            <Route
              path="/checkout/:id"
              element={
                
                  <Checkout />
                
              }
            />
            <Route
              path="/history"
              element={
                
                  <BookingHistoryPage />
                
              }
            />
            <Route
              path="/confirmation"
              element={
                
                  <OrderConfirmation />
                
              }
            />
            <Route
              path="/userprofile"
              element={
                
                  <UserProfile />
                
              }
            ></Route>
          </Route>

          {/* Guide Routes */}

          <Route path="/guide_signup" element={<GSignupPage />} />
          <Route path="/guide_login" element={<GLogin />} />

          {/* <Route element={<RequireLoginGuide />}> */}
            {/* <Route path='/guide_home' element={<GHomePage/>}/> */}
            <Route
              path="/guide_request"
              element={
                <AuthorizeGuide>
                  <GRequestPage />
                </AuthorizeGuide>
              }
            />
            <Route
              path="/guide_history"
              element={
                <AuthorizeGuide>
                  <GHistorypage />
                </AuthorizeGuide>
              }
            />
            <Route
              path="/guide"
              element={
                <AuthorizeGuide>
                  <Guide />
                </AuthorizeGuide>
              }
            />
            <Route
              path="/otpVerfiy"
              element={
                <AuthorizeGuide>
                  <OtpVerifyModal />
                </AuthorizeGuide>
              }
            />
          {/* </Route> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
