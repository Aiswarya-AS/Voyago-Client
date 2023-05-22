import React from "react";
import { useState, useEffect } from "react";

import axios from "../../../utilis/axios";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { resetPasswordPatch } from "../../../utilis/constants";
import { toast } from "react-hot-toast";

const Profile = (props) => {
  console.log(props.user.id);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    axios.patch(`${resetPasswordPatch}/${props.user.id}`, data).then((res) => {
      if (res.data.status === "true") {
        toast.success("Your password changed successfully..");
        reset();
      } else {
        toast.error(res.data.status);
      }
    });
  };
  return (
    <>
      {/* <div class="col-md-8"> */}
      <div class="card mb-3">
        <div class="card-body">
          <div class="row">
            <div class="col-sm-3">
              <h6 class="mb-0">Full Name</h6>
            </div>
            <div class="col-sm-9 text-secondary">
              {props.user.firstname} {props.user.lastname}
            </div>
          </div>
          <hr />
          <div class="row">
            <div class="col-sm-3">
              <h6 class="mb-0">Email</h6>
            </div>
            <div class="col-sm-9 text-secondary">{props.user.email}</div>
          </div>
          <hr />
          <div class="row">
            <div class="col-sm-3">
              <h6 class="mb-0">Phone</h6>
            </div>
            <div class="col-sm-9 text-secondary">{props.user.phone}</div>
          </div>

          <hr />
          <div class="row">
            <div class="col-sm-12">
              <Link to="/profileUpdate">
                <a class="btn btn-info ">Edit</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* section 2 */}
      <div class="card mb-3 mt-2">
        <div class="card-body">
          <div class="panel-body col-12 col-md-12">
            <div class="row ">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div
                  style={{ marginTop: "80px;" }}
                  class="col-xs-6 col-sm-6 col-md-6 login-box "
                >
                  <div class="form-group mt-2">
                    {errors.currentPassword && (
                      <p className="text-danger " style={{ fontSize: ".7rem" }}>
                        Required
                      </p>
                    )}
                    <div class="input-group ">
                      {/* <div class="input-group-addon"><span class="glyphicon glyphicon-lock"></span></div> */}
                      <input
                        class="form-control"
                        type="password"
                        {...register("currentPassword", {
                          required: true,
                          message: "Enter your current password",
                        })}
                        placeholder="Current Password"
                      />
                    </div>
                  </div>
                  <div class="form-group mt-3">
                    {errors.newPassword && (
                      <p
                        className="text-danger   "
                        style={{ fontSize: ".7rem" }}
                      >
                        Required
                      </p>
                    )}
                    <div class="input-group">
                      {/* <div class="input-group-addon"><span class="glyphicon glyphicon-log-in"></span></div> */}

                      <input
                        class="form-control"
                        type="password"
                        {...register("newPassword", {
                          required: true,
                          message: "New Password is required",
                        })}
                        placeholder="New Password"
                      />

                      <button className="btn btn-success" type="submit">
                        Reset
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          {/* <div class="panel-footer">
                    <div class="row mt-1">
                        <div class="col-xs-6 col-sm-6 col-md-6"></div>
                        <div class="col-xs-6 col-sm-6 col-md-6">
                            <button class="btn icon-btn-save btn-success" type="submit">
                            <span class="btn-save-label"><i class="glyphicon glyphicon-floppy-disk"></i></span>save</button>
                        </div>
                    </div>
                </div> */}
        </div>
      </div>

      {/* </div> */}
    </>
  );
};

export default Profile;
