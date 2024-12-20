import React, { useState } from "react";
import { useForm } from "react-hook-form";
// import axios from "axios";
import { signUpAPI } from "../../common/Api/api";
import { Link, useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import { toastError } from "../../../servers/toastr.service";

const Signup = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await signUpAPI(data);

      if (response?.data?.success) {
        navigate("/");
        setIsLoading(false);
      }

      if (!response?.data?.success) setIsLoading(false);
    } catch (error) {
      if (!error?.data?.success) toastError(error?.data?.message);
      setIsLoading(false);
    }
  };

  return (
    <>
      <main className="main-content  mt-0">
        <section className="min-vh-100 mb-8">
          <div className="signup-img page-header align-items-start min-vh-50 pt-5 pb-11 m-3 border-radius-lg">
            <span className="mask bg-gradient-dark opacity-6"></span>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-5 text-center mx-auto">
                  <h1 className="text-white mb-2 mt-5">Welcome!</h1>
                  <p className="text-lead text-white">
                    Use these awesome forms to login or create a new account in
                    your project for free.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row mt-lg-n10 mt-md-n11 mt-n10">
              <div className="col-xl-4 col-lg-5 col-md-7 mx-auto">
                <div className="card z-index-0">
                  <div className="card-header text-center pt-4">
                    <h5>Register with</h5>
                  </div>
                  <div className="card-body">
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      role="form text-left"
                    >
                      <div className="mb-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Name"
                          {...register("name", { required: true })}
                        />
                        {errors.name && (
                          <p className="text-danger">Name is required</p>
                        )}
                      </div>
                      <div className="mb-3">
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Email"
                          {...register("email", { required: true })}
                        />
                        {errors.email && (
                          <p className="text-danger">Email is required</p>
                        )}
                      </div>
                      <div className="mb-3">
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Password"
                          {...register("password", { required: true })}
                        />
                        {errors.password && (
                          <p className="text-danger">Password is required</p>
                        )}
                      </div>
                      <div className="form-check form-check-info text-left">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="flexCheckDefault"
                          {...register("terms", { required: true })}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefault"
                        >
                          I agree to the{" "}
                          <a href="/" className="text-dark font-weight-bolder">
                            Terms and Conditions
                          </a>
                        </label>
                        {errors.terms && (
                          <p className="text-danger">
                            You must agree to the terms and conditions
                          </p>
                        )}
                      </div>
                      <div className="text-center">
                        <button
                          type="submit"
                          className="btn bg-gradient-dark w-100 my-4 mb-2"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <TailSpin color="#fff" height={20} width={20} />
                          ) : (
                            "Sign Up"
                          )}
                        </button>
                      </div>
                    </form>
                    {errorMessage && (
                      <div className="alert alert-danger mt-3">
                        {errorMessage}
                      </div>
                    )}
                    {successMessage && (
                      <div className="alert alert-success mt-3">
                        {successMessage}
                      </div>
                    )}
                    <p className="text-sm mt-3 mb-0">
                      Already have an account?{" "}
                      <Link to="/" className="text-dark font-weight-bolder">
                        Sign in
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Signup;
