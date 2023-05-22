import React, { useEffect, useState } from "react";
import axios from "../../../utilis/axios";
import Accordion from "react-bootstrap/Accordion";
import "./BookingHistory.css";
import {
  bookingHistoryGet,
  cancelBookingPost,
  endJourney,
} from "../../../utilis/constants";
import swal from "sweetalert";
const BookingHistory = (props) => {
  const [historyData, setHistoryData] = useState([]);
  console.log(historyData);
  const user_id = props.user_id;
  const order_data = () => {
    axios.get(`${bookingHistoryGet}/${user_id}`).then((res) => {
      setHistoryData(res.data);
    });
  };
  useEffect(() => {
    order_data();
  }, []);
  const cancelBooking = (order_id, user) => {
    swal({
      title: "Are you sure?",
      // text: "Once , you will not be able to recover this item!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .post(
            `${cancelBookingPost}/${order_id}/${user}`,
            { user: user },
            { headers: { "Content-Type": "application/json" } }
          )
          .then((res) => {
            order_data();
          });
        swal("Sucessfully Cancelled", {
          icon: "success",
        });
      } else {
        swal("Cancelled!");
      }
    });
  };
  const handleEndJourney = (id) => {
    swal({
      title: "Are you sure?",
      // text: "Once , you will not be able to recover this item!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios.put(`${endJourney}/${id}`).then((res) => {
          order_data();
        });
        swal("Journey ended", {
          icon: "success",
        });
      } else {
        swal("Cancelled!");
      }
    });
  };

  return (
    <>
      {/* <div className='col-md-8 '> */}
      <div class="card ">
        {historyData.map((h, index) => (
          <Accordion>
            <Accordion.Item eventKey="0" className="mt-3">
              <Accordion.Header>
                {h.location} - {h.date}{" "}
                <div className="text-center mt-2 mx-5">
                  {h.status === "Cancelled" ? (
                    <p className="text-danger text-capitalize">Cancelled</p>
                  ) : (
                    <p className="text-info text-capitalize">{h.journey_status}ed</p>
                  )}
                </div>
             
              </Accordion.Header>
              <Accordion.Body>
                <div class="col">
                  <div
                    class="card card-stepper"
                    style={{ borderRadius: "10px" }}
                  >
                    <div class="card-body p-4">
                      <div class="d-flex justify-content-between align-items-center">
                        <div class="d-flex flex-column">
                          <span class="lead fw-normal">
                            {h.date} - {h.state}, {h.country}
                          </span>
                          <span class="text-muted small">{h.time}</span>
                          <span class="text-muted small">
                            {h.transaction_id}
                          </span>
                          <span class="text-muted small">
                            Paid via {h.payment_mode}
                          </span>
                          <span class="text-muted small mb-2">
                            {" "}
                            Amount:{h.total_amount} <br />
                            Total Persons: {h.total_peoples}
                          </span>
                        </div>
                        <div
                          className="row mx-0 p-1"
                          style={{ width: "11rem" }}
                        >
                          <span class="text-muted small mb-2">
                            {" "}
                            Guide Name:{h.guide_name}
                          </span>

                          {h.journey_status === "start" ? (
                            <div>
                              <p className="text-success"> Journey started</p>
                              <button
                                className="btn btn-outline-danger"
                                onClick={() => {
                                  handleEndJourney(h.id);
                                }}
                              >
                                End Journey
                              </button>
                            </div>
                          ) : h.journey_status === "end" ? (
                            <p className="text-success">Trip completed!!</p>
                          ) : h.status == "Cancelled" ? (
                            <p className="text-danger">Journey Cancelled</p>
                          ) : (
                            <button
                              class="btn btn-outline-danger"
                              type="button"
                              onClick={() => {
                                cancelBooking(h.id, h.user);
                              }}
                            >
                              Cancel Booking
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        ))}
      </div>
      {/* </div> */}
    </>
  );
};

export default BookingHistory;
