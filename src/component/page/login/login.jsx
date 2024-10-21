import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { forgotPasswordAPI, loginAPI } from "../../common/Api/api";
import { SET_CASHE } from "../../../utils/helper";
import { UserContext } from "../../../Context/UserContext";
import { toastError, toastSuccess } from "../../../servers/toastr.service";
import { TailSpin } from "react-loader-spinner";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const {
    register: registerForgot,
    handleSubmit: handleForgotSubmit,
    formState: { errors: forgotErrors },
  } = useForm();

  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const { setUserLogin } = useContext(UserContext);

  // Handle login form submission
  const onSubmit = async (data) => {
    try {
      setIsLoading(true);

      const payload = {
        email: data.email,
        password: data.password,
        rememberMe: rememberMe,
      };

      const response = await loginAPI(payload);

      if (response?.login) {
        SET_CASHE("token", response?.token);
        SET_CASHE("name", response?.name);
        setUserLogin(response?.token);
        toastSuccess(response?.message);
        navigate("/dashboard");
      } else if (response?.response?.data?.message) {
        toastError(response?.response?.data?.message);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toastError("An error occurred during login.");
    }
  };
  // Handle forgot password form submission
  const onForgotPasswordSubmit = async (data) => {
    try {
      setIsLoading(true);

      const payload = {
        email: data.email,
        newPassword: data.newPassword,
      };

      const response = await forgotPasswordAPI(payload);

      if (response?.success) {
        toastSuccess("Password has been reset successfully");
        setIsForgotPassword(false);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toastError(error?.data?.message);
    }
  };

  return (
    <main className="main-content mt-0">
      <section>
        <div className="page-header min-vh-100">
          <div className="container">
            <div className="row">
              <div className="col-xl-4 col-lg-5 col-md-6 d-flex flex-column mx-auto">
                <div className="card card-plain mt-8">
                  <div className="card-header pb-0 text-left bg-transparent">
                    <h3 className="font-weight-bolder text-info text-gradient">
                      {isForgotPassword
                        ? "Reset your password"
                        : "Welcome back"}
                    </h3>
                    <p className="mb-0">
                      {isForgotPassword
                        ? "Enter your email and new password to reset"
                        : "Enter your email and password to sign in"}
                    </p>
                  </div>
                  <div className="card-body">
                    {!isForgotPassword ? (
                      <form onSubmit={handleSubmit(onSubmit)} role="form">
                        <label>Email</label>
                        <div className="mb-3">
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            {...register("email", {
                              required: "Email is required",
                            })}
                          />
                          {errors.email && (
                            <p className="text-danger">
                              {errors.email.message}
                            </p>
                          )}
                        </div>
                        <label>Password</label>
                        <div className="mb-3">
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            {...register("password", {
                              required: "Password is required",
                            })}
                          />
                          {errors.password && (
                            <p className="text-danger">
                              {errors.password.message}
                            </p>
                          )}
                        </div>
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="rememberMe"
                            checked={rememberMe}
                            onChange={() => setRememberMe(!rememberMe)}
                          />
                          <div className="d-flex justify-content-between">
                            <label
                              className="form-check-label"
                              htmlFor="rememberMe"
                            >
                              Remember me
                            </label>
                            <label
                              className="form-check-label"
                              onClick={() => setIsForgotPassword(true)}
                              style={{ cursor: "pointer", color: "#007bff" }}
                            >
                              Forgot password?
                            </label>
                          </div>
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
                              "Sign in"
                            )}
                          </button>
                        </div>
                      </form>
                    ) : (
                      <form
                        onSubmit={handleForgotSubmit(onForgotPasswordSubmit)}
                        role="form"
                      >
                        <label>Email</label>
                        <div className="mb-3">
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            {...registerForgot("email", {
                              required: "Email is required",
                            })}
                          />
                          {forgotErrors.email && (
                            <p className="text-danger">
                              {forgotErrors.email.message}
                            </p>
                          )}
                        </div>
                        <label>New Password</label>
                        <div className="mb-3">
                          <input
                            type="password"
                            className="form-control"
                            placeholder="New Password"
                            {...registerForgot("newPassword", {
                              required: "New Password is required",
                            })}
                          />
                          {forgotErrors.newPassword && (
                            <p className="text-danger">
                              {forgotErrors.newPassword.message}
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
                              "Reset Password"
                            )}
                          </button>
                        </div>
                        <div className="text-center">
                          <label
                            className="form-check-label"
                            onClick={() => setIsForgotPassword(false)}
                            style={{ cursor: "pointer", color: "#007bff" }}
                          >
                            Back to Sign in
                          </label>
                        </div>
                      </form>
                    )}
                  </div>
                  <div className="card-footer text-center pt-0 px-lg-2 px-1">
                    {!isForgotPassword && (
                      <p className="mb-4 text-sm mx-auto">
                        Don't have an account?
                        <Link
                          to="/signup"
                          className="text-info text-gradient font-weight-bold"
                        >
                          Sign up
                        </Link>
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="oblique position-absolute top-0 h-100 d-md-block d-none me-n8">
                  <div className="login-image bg-cover position-absolute fixed-top ms-auto h-100 z-index-0 ms-n6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;
