import React, { useEffect, useState } from "react";
import { RiProfileLine } from "react-icons/ri";
import { GoRequestChanges } from "react-icons/go";
import { BsClockHistory } from "react-icons/bs";
import { FaBlog } from "react-icons/fa";
import Cookies from "js-cookie";
import axios from "axios";
import { Link } from "react-router-dom";
const ProfileCard = () => {
  const user_id = Cookies.get("user_id");
  const [user, setUser] = useState([]);

  useEffect(() => {
    axios
      .get(`${"http://127.0.0.1:8000/user/user_profile"}/${user_id}`)
      .then((res) => {
        setUser(res.data);
        console.log(res.data);
      });
  }, [user_id]);
  return (
    <>
      <div class="col-md-4 mb-3">
        <div class="card">
          <div class="card-body">
            <div class="d-flex flex-column align-items-center text-center">
              <img
                src={`http://127.0.0.1:8000/${user.profile_pic}`}
                alt="Admin"
                class="rounded-circle"
                width="150"
              />
              <div class="mt-3">
                <h4>{user.username}</h4>
                <p class="text-secondary mb-1">
                  {user.firstname} {user.lastname}
                </p>
                {/* <p class="text-muted font-size-sm">Bay Area, San Francisco, CA</p> */}
                {/* <button class="btn btn-primary">Follow</button>
                      <button class="btn btn-outline-primary">Message</button> */}
              </div>
            </div>
          </div>
        </div>
        <div class="card mt-3 text-center">
          <div class="d-flex align-items-center text-center">
            <div
              class="nav flex-column nav-pills me-3"
              id="v-pills-tab"
              role="tablist"
              aria-orientation="vertical"
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
                Home
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
                Profile
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
                Messages
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
                Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
