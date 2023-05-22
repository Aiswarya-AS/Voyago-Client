import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from '../../../utilis/axios'
import Navbar from "../Home/Navbar";
import { BiLocationPlus } from "react-icons/bi";
import { GrLanguage } from "react-icons/gr";
import Cookies from "js-cookie";
import "./rating.css";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Calendar from "react-calendar";
import { addCommentPost, commentsGet, guideGet, locationsGet, requests } from "../../../utilis/constants";
// import "react-calendar/dist/Calendar.css";
const GuideDetail = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    axios
      .post(
        `${addCommentPost}/${guide_id}/${user_id}`,
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        toast.success("Thankyou for your feedback...");
        get_comments();
        reset();
      });
  };
  const parms = useParams();
  const [guide, setGuide] = useState({});
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [persons, setPersons] = useState();
  const [locations, setLocation] = useState([]);
  const [select, setSelect] = useState();
  const [request, setRequest] = useState("");
  const [comments, setComment] = useState([]);
  const user_id = Cookies.get("user_id");
  const guide_id = parms.id;
  const guide_name = guide.firstname;
  const guide_place = guide.place;
  const guide_price = guide.pricing;
  const guide_country = guide.country;
  const guide_state = guide.state;
  const availableDates = ["2023-05-01", "2023-05-09", "2023-05-10"];
  const [showCalendar, setShowCalendar] = useState(false);
  const [avg, setAvg] = useState("");
  const isDateAvailable = (date) => {
    return availableDates.includes(date.toISOString().split("T")[0]);
  };
  const handleCalendarClick = () => {
    setShowCalendar(!showCalendar);
  };
  const [visibleItems, setVisibleItems] = useState(5);

  const handleShowMore = () => {
    setVisibleItems(comments.length);
  };
  const tileClassName = ({ date }) => {
    if (isDateAvailable(date)) {
      return "available";
    }
    return "unavailable";
  };

  useEffect(() => {
    axios
      .get(`${guideGet}/${parms.id}`)
      .then((res) => {
        setGuide(res.data);
      });
  }, [parms]);


  useEffect(() => {
    get_comments();
  }, []);

  const get_comments = () => {
    axios
      .get(`${commentsGet}/${guide_id}`)
      .then((res) => {
        setComment(res.data.comments);
        setAvg(res.data.avg);
      });
  };

  useEffect(() => {
    axios.get(locationsGet).then((res) => {
      console.log(res.data,'locationsssss');
      setLocation(res.data);
    });
  }, []);

  // useEffect(() => {
  //   axios
  //     .post(
  //       "http://127.0.0.1:8000/user/request_exists",
  //       { guide_id: guide_id, user_id: user_id },
  //       { headers: { "Content-Type": "application/json" } }
  //     )
  //     .then((res) => {
  //       setRequest(res.data);
  //     });
  // }, []);
  const handleSubmitc = (e) => {
    e.preventDefault();
    const data = JSON.stringify({
      date,
      time,
      persons,
      user_id,
      guide_id,
      guide_name,
      guide_place,
      guide_price,
      select,
      guide_state,
      guide_country,
    });

    axios
      .post(requests, data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        if (res.data.status === "true") {
          toast("Your request has send!", {
            icon: "👏",
            position: "top-right",
          });
        } else if (res.data.status === "exists") {
          toast("You have already send request.Plz wait..", {
            icon: "😔",
            position: "top-right",
          });
        }
      });
  };
  return (
    <>
      <Navbar />
      <div className="d-flex flex-row col-md-12">
        <div className="container col-md-3 mx-5 mt-5">
          <div class="card " style={{ width: "25rem" }}>
            <img
              src={`https://res.cloudinary.com/dmysmwucj/${guide.image}`}
              class="img-thumbnail "
              style={{
                width: "15rem",
                height: "20rem",
                marginLeft: "2rem",
                borderRadius: "1rem",
              }}
              alt="..."
            ></img>
            <div class="card-body">
              <div className="container">
                <div className="row text-center ">
                  <div className="col-md-6">
                    <h5 class="card-title ">
                      {guide.firstname}&nbsp;{guide.lastname}
                    </h5>
                  </div>
                  <div className="col-md-6">
                    <p className=" text-warning">{avg}/5</p>
                  </div>
                </div>
              </div>
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">
                <BiLocationPlus /> I live in {guide.place}
              </li>
              <li class="list-group-item">
                <GrLanguage /> I speak {guide.languages_known}
              </li>
              {/* <li class="list-group-item">A third item</li> */}
            </ul>
            <div class="card-body text-center">
              <div>
                <button
                  className="btn btn-info mt-3"
                  onClick={handleCalendarClick}
                >
                  Check Availability
                </button>

                {showCalendar && <Calendar tileClassName={tileClassName} />}
              </div>
            </div>
          </div>
        </div>
        <div className="" style={{ width: "60rem", height: "20rem" }}>
          <div class="card " style={{ border: "none" }}>
            <video width="850" height="500" controls>
              <source src={guide.video} type="video/mp4" />
              <source src="movie.ogg" type="video/ogg" />
              Your browser does not support the video tag.
            </video>
            <div class="card-body">
              <h5 class="card-title">Haii threre.. Its me {guide.firstname}</h5>
              <p class="card-text">{guide.description}.</p>
            </div>
          </div>
        </div>
      </div>

      <div
        className="d-flex flex-row col-md-12 mt-5  "
        style={{ border: "none" }}
      >
        <form style={{ border: "none" }} onSubmit={handleSubmitc}>
          <div className="col-md-6 conatiner mx-5 " style={{ border: "none" }}>
            <div class="card" style={{ width: "24rem" }}>
              <ul class="list-group list-group-flush">
                <p className="mx-3">
                  RS:<b>200</b>/per Person
                </p>
                <input
                  type="date"
                  className="form-control mt-3 "
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value);
                  }}
                  placeholder="Pick Date"
                  required
                />
                <input
                  type="time"
                  className="form-control mt-3 "
                  value={time}
                  onChange={(e) => {
                    setTime(e.target.value);
                  }}
                  placeholder="Pick Time"
                  required
                />
                <input
                  type="text"
                  className="form-control mt-3 "
                  value={persons}
                  onChange={(e) => {
                    setPersons(e.target.value);
                  }}
                  placeholder="Total Persons"
                  required
                />

                <select
                  class="form-select form-control form-select-sm p-2 mt-3"
                  style={{ width: "18rem" }}
                  // aria-label=".form-select-sm example"
                  value={select}
                  onChange={(e) => setSelect(e.target.value)}
                >
                  <option selected>Select Location</option>
                  {locations.map((l) => {
                    return <option value={l.id}>{l.location}</option>;
                  })}
                </select>
              </ul>

              <div class=" text-center mt-4">
                {request.exists == "true" ? (
                  <button disabled className="btn btn-dark">
                    Already Requested
                  </button>
                ) : (
                  <button className="btn btn-dark"> Request</button>
                )}
              </div>
            </div>
          </div>
        </form>
        <div className="col-md-6  mx-3">
          <div class="card-rate">
            <div class="p-3">
              <h6>Comments</h6>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div class="mt-3 d-flex flex-row align-items-center p-3 form-color">
                {/* <img src="https://i.imgur.com/zQZSWrt.jpg" width="50" class="rounded-circle mr-2"/>  */}
                <input
                  type="number"
                  class="form-control mx-2"
                  {...register("rating")}
                  max={5}
                  min={0}
                  placeholder="Give rating out of 5"
                  required
                />
                <input
                  type="text"
                  class="form-control mx-2"
                  {...register("comment")}
                  placeholder="Enter your comment..."
                  required
                />
                <div className="mx-3 mx-auto ">
                  <button type="submit " className="btn btn-primary">
                    Share
                  </button>
                </div>
              </div>
            </form>
            
            {comments.slice(0, visibleItems).map((c) => (
              <div class="mt-2">
                <div class="d-flex flex-row p-3">
                  
                  <div class="w-100">
                    <div class="d-flex justify-content-between align-items-center mx-2">
                      <div class="d-flex flex-row align-items-center">
                        {" "}
                        <span class="mr-2">{c.user_name}</span>{" "}
                      </div>{" "}
                      <small>{c.rating}</small>
                    </div>
                    <p class="text-justify comment-text mb-0 mx-2">
                      {c.comment}
                    </p>
                    <hr />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {visibleItems < comments.length && (
                    <a
                      onClick={handleShowMore}
                      href="#"
                      class="text-dark text-decoration-none d-flex justify-content-center m-5"
                    >
                      Show more <b class="caret"></b>
                    </a>
                  )}
    
        </div>
      </div>
    </>
  );
};

export default GuideDetail;
