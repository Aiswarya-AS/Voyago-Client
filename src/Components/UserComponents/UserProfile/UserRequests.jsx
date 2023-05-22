import React, { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import axios from "axios";
import { Link } from "react-router-dom";
const UserRequests = (props) => {
  const user_id = props.user_id;
  const [requests, setRequests] = useState([]);
  useEffect(() => {
    axios
      .get(`${"http://127.0.0.1:8000/user/user_requests"}/${user_id}`)
      .then((res) => {
        setRequests(res.data);
      });
  }, [user_id]);
  return (
    <>
      {/* <div className='col-md-8 '> */}
      <div class="card">
        {requests.map((r, index) => (
          <Accordion>
            <Accordion.Item eventKey="0" className="mt-3">
              <Accordion.Header>
                Location &nbsp; Status:{r.status}
              </Accordion.Header>
              <Accordion.Body>
                <div className="row col-md-12">
                  <div className="col-md-6">
                    <ul className="list-unstyled">
                      <li>Guide Name:{r.guide_name}</li>
                      <li>
                        State:{r.state},Country:{r.country}
                      </li>
                      <li>Time:{r.time}</li>
                      <li>Date:{r.date}</li>
                      <li>Toatl Persons:{r.total_peoples}</li>
                    </ul>
                  </div>
                  <div className="col-md-3 mt-5">
                    <p>Status:{r.status}</p>
                  </div>
                  <div className="col-md-3 text-center mt-5">
                    {r.status === "Accepted" ? (
                      <Link to={`/checkout/${r.id}`}>
                        {" "}
                        <button className="btn btn-outline-success">
                          Pay Now
                        </button>
                      </Link>
                    ) : (
                      <button className="btn btn-outline-danger">
                        Cancel Request
                      </button>
                    )}
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

export default UserRequests;
