import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import {
  historyGet,
  sendOtpPost,
  verifyOtpPost,
  withdrawPost,
} from "../../../utilis/constants";
import moment from "moment";
import axios from "../../../utilis/axios";
import Modal from "react-modal";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import swal from "sweetalert";
const GHistory = () => {
  const getDateDifference = (date) => {
    const currentDate = moment();
    const parsedDate = moment(date, "YYYY-MM-DD");

    // Check if the parsed date is valid
    if (!parsedDate.isValid()) {
      return "Invalid Date";
    }

    // Calculate the difference in milliseconds
    const differenceInMilliseconds = Math.abs(currentDate.diff(parsedDate));

    // Convert the difference to days
    const differenceInDays = Math.ceil(
      differenceInMilliseconds / (1000 * 60 * 60 * 24)
    );

    return differenceInDays;
  };

  const [otp, setOtp] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const guide_id = Cookies.get("guide_id");
  const [history, setHistory] = useState([]);
  const [visibleItems, setVisibleItems] = useState(1);
  const handleShowMore = () => {
    setVisibleItems(history.length);
  };
  useEffect(() => {
    booking_history();
  }, []);
  const booking_history = () => {
    axios.get(`${historyGet}/${guide_id}`).then((res) => {
      setHistory(res.data);
    });
  };

  const sendOtp = (user_id, index) => {
    setHistory((prevHistory) => {
      const newHistory = [...prevHistory];
      newHistory[index].isOpen = true;
      return newHistory;
    });
    axios.get(`${sendOtpPost}/${user_id}/${guide_id}`).then((res) => {
      console.log(res.data.status);
    });
  };
  const verifyOtp = (u_id, g_id, o_id) => {
    console.log(o_id);
    const data = JSON.stringify({
      u_id,
      g_id,
      otp,
      o_id,
    });
    axios
      .post(verifyOtpPost, data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        if (res.data.status === "true") {
          toast.success("Otp verification success");
          navigate("/guide");
          setIsOpen(false);
          booking_history();
        } else {
          toast.error(res.data.status);
        }
      });
  };
  const handleWithdraw = (id, guide_id) => {
    const data = JSON.stringify({
      guide_id,
    });
    swal({
      title: "Are you sure?",
      // text: "Once deleted, you will not be able to recover this item!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .post(`${withdrawPost}/${id}`, data, {
            headers: { "Content-Type": "application/json" },
          })
          .then((res) => {
            booking_history();
          });
        swal("Withdrawed!", {
          icon: "success",
        });
      } else {
        swal("Cancelled!");
      }
    });
  };
  return (
    <>
      <div class="profile-content" style={{ width: "60rem" }}>
        <div class="row">
          <div class="col-xl-12">
            <div class="tab-content p-0">
              <div class="tab-pane fade active show" id="profile-followers">
                <div className="d-flex justify-content-end">
                  <p className="small">
                    {" "}
                    <span className="text-danger">*</span> Withdraw can be done
                    after 7 days of trip completion
                  </p>
                </div>
                <div class="list-group">
                  {history.slice(0, visibleItems).map((h, index) => (
                    <div class="list-group-item d-flex align-items-center mt-3">
                      {/* <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" width="50px" class="rounded-sm ml-n2" /> */}
                      <div class="flex-fill pl-3 pr-3">
                        <div>
                          <a href="#" class="text-dark font-weight-600">
                            {h.time},{h.date}
                          </a>
                        </div>
                        <div class="text-muted fs-13px">
                          {h.location},{h.state},{h.country}
                        </div>
                        <div class="text-muted fs-13px">
                          {" "}
                          <span className="text-success">
                            {h.status}
                          </span> via {h.payment_mode}
                        </div>
                      </div>

                      {h.journey_status === "start" ? (
                        <p className="text-primary">Journey Started</p>
                      ) : h.journey_status === "end" ? (
                        <div>
                          <p className="text-secondary">Journey Ended</p>

                          {getDateDifference(h.date) >= 7 &&
                          h.guide_withdraw_status == false ? (
                            <button
                              className="btn btn-success"
                              onClick={() => {
                                handleWithdraw(h.id, h.guide);
                              }}
                            >
                              Withdraw
                            </button>
                          ) : (
                            <button className="btn btn-success" disabled>
                              Withdraw
                            </button>
                          )}
                        </div>
                      ) : h.status === "Cancelled" ? (
                        <p className="text-danger">Journey Cancelled</p>
                      ) : h.status === "Paid" ? (
                        <button
                          type="submit"
                          onClick={() => {
                            sendOtp(h.user, index);
                          }}
                          className="btn btn-outline-info "
                        >
                          Send otp
                        </button>
                      ) : (
                        ""
                      )}

                      <Modal
                        isOpen={h.isOpen}
                        value={otp}
                        onRequestClose={() => setIsOpen(false)}
                        style={{
                          content: {
                            width: "50%",
                            height: "90%",
                            margin: "auto",
                            overflow: "hidden",
                          },
                        }}
                      >
                        <button
                          className=""
                          onClick={() => {
                            setHistory((prevHistory) => {
                              const newHistory = [...prevHistory];
                              newHistory[index].isOpen = false;
                              return newHistory;
                            });
                          }}
                        >
                          Close Modal
                        </button>
                        <div class="d-flex justify-content-center align-items-center container-otp">
                          <div class="card-otp py-5 px-3">
                            <h5 class="m-0">Mobile phone verification</h5>
                            {/* <span class="mobile-text-otp">
                              <b>Enter the code we just sent on your phone</b>
                              <b class="text-color-otp">+91 09899619282</b>
                            </span> */}
                            <div class="d-flex flex-row mt-5">
                              {/* <input
                                type="text"
                                 className="otp-input"
                                class="form-control m-1"
                                autofocus=""
                                onChange={(e) => {
                                  setOtp(e.target.value);
                                }}
                              /> */}

                              <OtpInput
                                value={otp}
                                onChange={setOtp}
                                style={{
                                  backgroundColor: "red",
                                  padding: "10px",
                                }}
                                numInputs={4}
                                renderSeparator={<span>-</span>}
                                renderInput={(props) => <input {...props} />}
                              />
                            </div>

                            <div class="text-center mt-5">
                              <button
                                onClick={() => {
                                  verifyOtp(h.user, h.guide, h.id);
                                }}
                                className="btn btn-success"
                                // onClick={verifyOtp}
                              >
                                Verify
                              </button>
                            </div>
                          </div>
                        </div>
                      </Modal>
                    </div>
                  ))}
                </div>
                <div class="text-center p-3">
                  {visibleItems < history.length && (
                    <a
                      onClick={handleShowMore}
                      href="#"
                      class="text-dark text-decoration-none"
                    >
                      Show more <b class="caret"></b>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GHistory;
