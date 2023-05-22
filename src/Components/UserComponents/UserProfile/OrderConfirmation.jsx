import React from "react";
import { Link } from "react-router-dom";
const OrderConfirmation = () => {
  return (
    <>
      <div
        class="d-flex bg-light justify-content-center align-items-center"
        style={{
          marginTop: "15rem",
          width: "40rem",
          height: "20rem",
          marginLeft: "27rem",
        }}
      >
        <div>
          <h1>Thank You!</h1>
        </div>
        <div>
          <Link to="/history">
            <p>Go to Payment History Page..</p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default OrderConfirmation;
