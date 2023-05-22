import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./GuideList.css";
const GuideList = (props) => {
  const [guide, setGuide] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`${"http://127.0.0.1:8000/user/guides"}/${props.place}`, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        setGuide(res.data);
        console.log(res.data);
      });
  }, [props.place]);

  return (
    <>
      <div class="container mt-5 mb-5">
        <div class="row justify-content-center">
          <div class="col-12 col-sm-8 col-lg-6">
            {/* <!-- Section Heading--> */}
            <div
              class="section_heading text-center wow fadeInUp"
              data-wow-delay="0.2s"
              style={{
                visibility: "visible",
                animationDelay: " 0.2s",
                animationName: " fadeInUp",
              }}
            >
              <h3>
                Our Guides <span> </span>
              </h3>
              {/* <p>Appland is completely creative, lightweight, clean &amp; super responsive app landing page.</p> */}
              <div class="line"></div>
            </div>
          </div>
        </div>
        <div className="horizontal-scroll-container">
          {guide.map((g, index) => (
            <div className="scroll-item col-md-3 px-3 mt-3"  key={index}onClick={()=>navigate(`/guide/${g.id}`)}>
              {/* <div class="col-lg-4  mb-4"> */}
              <div class="bg-image hover-zoom ripple shadow-1-strong rounded position-relative">
              
                <img src={`https://res.cloudinary.com/dmysmwucj/${g.image}`} style={{ width: '400px', height: '350px' }} class="rounded float-left" alt="..."></img>
                {/* <a href="#!"> */}
                <div className="position-absolute top-0 start-0">
                <div class="d-flex justify-content-end align-items-start h-100">
                      <h5>
                        <span class="badge bg-dark pt-2 ms-3 mt-3 text-light">
                          {g.firstname}
                        </span>
                      </h5>
                    </div>
                </div>
                 
                {/* </a> */}
              </div>
              {/* </div> */}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default GuideList;
