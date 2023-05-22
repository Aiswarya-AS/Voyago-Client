import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../utilis/axios";
import { signupPost } from "../../../utilis/constants";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const Signup = () => {
  const {register,handleSubmit,formState: { errors },watch} = useForm();

  const navigate = useNavigate();
  const handleSignup = (data) => {
    console.log(data);
    axios
      .post(signupPost, data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        if (res.data.status === "true") {
          console.log("singup ayada kuttaa...");
          navigate("/login");
        } else {
          console.log("Illa mwonuee ni valarinittaa");
          toast.error(res.data.status)
        }
      });
  };
  const validatePasswordMatch = (value) => {
    const { password, confirmPassword } = watch(["password", "confirmPassword"]);
    return password === confirmPassword || "Passwords must match";
  };
  return (
    <>
      <section class="">
        {/* <!-- Jumbotron --> */}
        <div
          class="px-4 py-5 px-md-5 text-center text-lg-start"
          style={{ backgroundColor: " hsl(0, 0%, 96%)" }}
        >
          <div class="container">
            <div class="row gx-lg-5 align-items-center">
              <div class="col-lg-6 mb-5 mb-lg-0">
                <h1 class="my-5 display-3 fw-bold ls-tight">
                Welcome to <br />
            <span class="text-primary">VOYAGO Sign Up</span>
                </h1>
                <p style={{ color: "hsl(217, 10%, 50.8%)" }}>
                Please enter your credentials to sign in and to create your travel account.
                </p>
              </div>

              <div class="col-lg-6 mb-5 mb-lg-0">
                <h3 className="text-center ">Create account</h3>
                <div class="card">
                  <div class="card-body py-5 px-md-5">
                    <form onSubmit={handleSubmit(handleSignup)}>
                      {/* <!-- 2 column grid layout with text inputs for the first and last names --> */}
                      <div class="row">
                        <div class="col-md-6 mb-4">
                          <div class="form-outline">
                            <label class="form-label" for="form3Example1">
                              First name
                            </label>
                            <input
                              type="text"
                              name="email"
                              {...register("firstname", {
                                required: "First Name is required",

                                pattern: {
                                  value: /^[a-zA-Z]+$/,
                                  message:
                                    "Invalid name. Only alphabets are allowed.",
                                },
                              })}
                              id="form3Example1"
                              class="form-control"
                            />
                            {errors.firstname && (
                              <p
                                className="text-danger  pt-1 px-1  "
                                style={{ fontSize: ".7rem" }}
                              >
                                {errors.firstname.message}
                              </p>
                            )}
                          </div>
                        </div>
                        <div class="col-md-6 mb-4">
                          <div class="form-outline">
                            <label class="form-label" for="form3Example2">
                              Last name
                            </label>
                            <input
                              type="text"
                              {...register("lastname", {
                                required: "Last Name is required",

                                pattern: {
                                  value: /^[a-zA-Z]+$/,
                                  message:
                                    "Invalid name. Only alphabets are allowed.",
                                },
                              })}
                              class="form-control"
                            />
                            {errors.lastname && (
                              <p
                                className="text-danger  pt-1 px-1  "
                                style={{ fontSize: ".7rem" }}
                              >
                                {errors.lastname.message}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* <!-- Email input --> */}
                      <div class="form-outline mb-4">
                        <label class="form-label" for="form3Example3">
                          Email address
                        </label>
                        <input
                          type="email"
                          {...register("email", {
                            required: "Email is required",
                            pattern: {
                              value: /\S+@\S+\.\S+/,
                              message: "Invalid email format",
                            },
                          })}
                          class="form-control"
                        />
                        {errors.email && (
                          <p
                            className="text-danger  pt-1 px-1  "
                            style={{ fontSize: ".7rem" }}
                          >
                            {errors.email.message}
                          </p>
                        )}
                      </div>



                      <div class="form-outline mb-4">
                        <label class="form-label" for="form3Example4">
                          Phone
                        </label>
                        <input
                          type="text"
                          {...register("phone", {
                            required: "Phone number is required",

                            pattern: {
                              value: /^\+(?:[0-9] ?){6,14}[0-9]$/,
                              message:
                                "Invalid phone format.Should only contain numbers. ",
                            },
                          })}
                          class="form-control"
                        />
                        {errors.phone && (
                          <p
                            className="text-danger  pt-1 px-1  "
                            style={{ fontSize: ".7rem" }}
                          >
                            {errors.phone.message}
                          </p>
                        )}
                      </div>



                      <div class="row">
                        <div class="col-md-6 mb-4">
                          <div class="form-outline">
                            <label class="form-label" for="form3Example2">
                              Password
                            </label>
                            <input
                              type="text"
                              
                              {...register("password", {
                                required: "Password is required",
                              })}
                              class="form-control"
                            />
                            {errors.password && (
                              <p
                                className="text-danger  pt-1 px-1  "
                                style={{ fontSize: ".7rem" }}
                              >
                                {errors.password.message}
                              </p>
                            )}
                          </div>
                        </div>
                        <div class="col-md-6 mb-4">
                          <div class="form-outline">
                            <label class="form-label" for="form3Example2">
                              Confirm Password
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              {...register("confirmPassword", {
                                required: "Password is required",
                                validate: validatePasswordMatch
                              })}
                            />
                            {errors.confirmPassword && (
                              <p
                                className="text-danger  pt-1 px-1  "
                                style={{ fontSize: ".7rem" }}
                              >
                                {errors.confirmPassword.message}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* <!-- Submit button --> */}
                      <div className="text-center">
                        <button
                          type="submit"
                          class="btn btn-primary btn-block mb-4 "
                        >
                          Sign up
                        </button>
                      </div>

                      {/* <!-- Register buttons --> */}
                      <div class="text-center">
                        <p>
                          Already Have Account?<Link to="/login">Login</Link>
                        </p>
                      </div>
                      {/* Link to Regsiter */}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Jumbotron --> */}
      </section>
      {/* <!-- Section: Design Block --> */}
    </>
  );
};

export default Signup;
