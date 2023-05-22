import React, { useEffect, useState } from "react";

import axios from "axios";
import Cookies from "js-cookie";
import UserRequests from "./UserRequests";
import Profile from "./Profile";
import BookingHistory from "./BookingHistory";
import Navbar from "../Home/Navbar";
import ProfileUpdate from "./ProfileUpdate";
const UserProfile = () => {
  const user_id = Cookies.get("user_id");
  const [user, setUser] = useState([]);
  const [walletBalance, setWalletBalance] = useState("");
  const user_deatails = () => {
    axios
      .get(`${"http://127.0.0.1:8000/user/user_profile"}/${user_id}`)
      .then((res) => {
        setUser(res.data.serdata);
        setWalletBalance(res.data.balance);
      });
  };
  useEffect(() => {
    user_deatails();
  }, [user_id]);
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="main-body">
          <div className="row gutters-sm">
            <div class="col-md-4 mb-3 ">
              <div class="card">
                <div class="card-body">
                  <div class="d-flex flex-column align-items-center text-center">
                    <img
                      src={`https://res.cloudinary.com/dmysmwucj/${user.profile_pic}`}
                      alt="Admin"
                      class="rounded-circle"
                      width="150"
                    />
                    <div class="mt-3">
                      <h4>{user.username}</h4>
                      <p class="text-secondary mb-1">
                        {user.firstname} {user.lastname}
                      </p>
                      <p class="text-muted font-size-sm">
                        Wallet balance:{walletBalance}{" "}
                      </p>
                      {/* <button class="btn btn-primary">Follow</button> */}
                    </div>
                  </div>
                </div>
              </div>
              <div class="card mt-3 text-center">
                <div class="d-flex align-items-center text-center">
                  <div
                    class="nav flex-column nav-pills me-3 "
                    id="v-pills-tab"
                    role="tablist"
                    aria-orientation="vertical"
                    style={{ marginLeft: "5rem" }}
                  >
                    <button
                      class="nav-link active"
                      id="v-pills-home-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#v-pills-home"
                      type="button"
                      role="tab"
                      aria-controls="v-pills-home"
                      aria-selected="true"
                    >
                      Profile
                    </button>
                    <button
                      class="nav-link"
                      id="v-pills-profile-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#v-pills-profile"
                      type="button"
                      role="tab"
                      aria-controls="v-pills-profile"
                      aria-selected="false"
                    >
                      Requests
                    </button>
                    <button
                      class="nav-link"
                      id="v-pills-messages-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#v-pills-messages"
                      type="button"
                      role="tab"
                      aria-controls="v-pills-messages"
                      aria-selected="false"
                    >
                      Booking History
                    </button>
                    <button
                      class="nav-link"
                      id="v-pills-settings-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#v-pills-settings"
                      type="button"
                      role="tab"
                      aria-controls="v-pills-settings"
                      aria-selected="false"
                    >
                      Your Blogs
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div class=" col-md-8 tab-content" id="v-pills-tabContent">
              <div
                class="  tab-pane fade show active"
                id="v-pills-home"
                role="tabpanel"
                aria-labelledby="v-pills-home-tab"
              >
                <Profile user={user} />
              </div>
              <div
                class=" tab-pane fade"
                id="v-pills-profile"
                role="tabpanel"
                aria-labelledby="v-pills-profile-tab"
              >
                <UserRequests user_id={user_id} />
              </div>
              <div
                class=" tab-pane fade"
                id="v-pills-messages"
                role="tabpanel"
                aria-labelledby="v-pills-messages-tab"
              >
                <BookingHistory user_id={user_id} />
              </div>
              <div
                class=" tab-pane fade"
                id="v-pills-settings"
                role="tabpanel"
                aria-labelledby="v-pills-settings-tab"
              >
                kooiiii
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
