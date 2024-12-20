import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  loginAPI,
  resetPasswordAPI,
  SendOTPMailAPI,
} from "../../common/Api/api";
import { SET_CASHE } from "../../../utils/helper";
import { UserContext } from "../../../Context/UserContext";
import { toastError, toastSuccess } from "../../../servers/toastr.service";
import { TailSpin } from "react-loader-spinner";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const resetPasswordValidationSchema = yup.object().shape({
  otp: yup
    .string()
    .required("OTP is required")
    .matches(/^\d{4}$/, "OTP must be a 4-digit number"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(/[a-z]/, "Password must include at least one lowercase letter")
    .matches(/[A-Z]/, "Password must include at least one uppercase letter")
    .matches(/\d/, "Password must include at least one number")
    .matches(
      /[!@#$%^&*()\-_"=+{}; :,<.>]/,
      "Password must include at least one special character"
    ),
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
  // agree: yup.boolean().oneOf([true], "You must agree to the Privacy Policy"),
});

const schema = yup.object().shape({
  email: yup
    .string()
    .trim() // Removes unnecessary spaces
    .email("Enter a valid email address (e.g., user@example.com)") // Example format for clarity
    .matches(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "Email must be in a proper format and not contain spaces"
    ) // Ensures no spaces or invalid characters
    .required("Email is required"),
  agree: yup.boolean().oneOf([true], "You must agree to the Privacy Policy"),
});
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
  } = useForm({ resolver: yupResolver(schema) });

  const {
    register: resetPasswordRegister,
    handleSubmit: handleResetPasswordSubmit,
    formState: { errors: resetPasswordError },
  } = useForm({ resolver: yupResolver(resetPasswordValidationSchema) });

  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // login
  const [isLoginPassword, setIsLoginPassword] = useState(true);
  // forgot
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  // reset
  const [isResetPassword, setIsResetPassword] = useState(false);

  const { setUserLogin } = useContext(UserContext);
  console.log("isForgotPassword: ", isForgotPassword);

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
      console.log('response: ', response);

      if (response?.login) {
        SET_CASHE("token", response?.token);
        SET_CASHE("name", response?.name);
        SET_CASHE("email", response?.email);
        setUserLogin(response?.token);
        toastSuccess(response?.message);
        navigate("/dashboard");
      } else if (response?.response?.data?.message) {
        toastError(response?.response?.data?.message);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toastError(error?.data?.message);
    }
  };
  // Handle forgot password form submission
  const onForgotPasswordSubmit = async (data) => {
    try {
      setIsLoading(true);

      const response = await SendOTPMailAPI({ email: data.email });

      if (response?.success) {
        toastSuccess(response?.message);
        setIsLoginPassword(false);
        setIsForgotPassword(false);
        setIsResetPassword(true);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toastError(error?.data?.message);
    }
  };

  // Handle forgotpassword form submission
  const onResetPasswordSubmit = async (data) => {
    try {
      setIsLoading(true);

      const response = await resetPasswordAPI({
        otp: Number(data?.otp),
        password: data?.password,
      });

      if (response?.success) {
        toastSuccess(response?.message);
        setIsLoginPassword(true);
        setIsForgotPassword(false);
        setIsResetPassword(false);
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
                      {isForgotPassword && "Forgot your password"}
                      {isLoginPassword && "Welcome back"}
                      {isResetPassword && "Reset your password"}
                    </h3>
                    <p className="mb-0">
                      {isForgotPassword && "Enter your email"}
                      {isLoginPassword &&
                        "Enter your email and password to sign in"}
                      {isResetPassword &&
                        "Enter your email and new password to reset"}
                    </p>
                  </div>
                  <div className="card-body">
                    {/* login */}
                    {isLoginPassword && (
                      <>
                        <form onSubmit={handleSubmit(onSubmit)}
                        // role="form" 
                        >
                          <label>Email</label>
                          <div className="mb-3">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="example@mail.com"
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
                                onClick={() => {
                                  setIsLoginPassword(false);
                                  setIsForgotPassword(true);
                                }}
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
                      </>
                    )}
                    {/* forgot */}
                    {isForgotPassword && (
                      <form
                        onSubmit={handleForgotSubmit(onForgotPasswordSubmit)}
                        // role="form"
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

                        <div className="text-center">
                          <button
                            type="submit"
                            className="btn bg-gradient-dark w-100 my-4 mb-2"
                            disabled={isLoading}
                          >
                            {isLoading ? (
                              <TailSpin color="#fff" height={20} width={20} />
                            ) : (
                              "Submit"
                            )}
                          </button>
                        </div>
                        <div className="text-center">
                          <label
                            className="form-check-label"
                            onClick={() => {
                              setIsLoginPassword(true);
                              setIsForgotPassword(false);
                            }}
                            style={{ cursor: "pointer", color: "#007bff" }}
                          >
                            Back to Sign in
                          </label>
                        </div>
                      </form>
                    )}
                    {/* reset */}
                    {isResetPassword && (
                      <form
                        onSubmit={handleResetPasswordSubmit(
                          onResetPasswordSubmit
                        )}
                        // role="form"
                      >
                        <label>OTP</label>
                        <div className="mb-3">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="otp"
                            {...resetPasswordRegister("otp", {
                              required: "otp is required",
                            })}
                          />
                          {resetPasswordError.otp && (
                            <p className="text-danger">
                              {resetPasswordError.otp.message}
                            </p>
                          )}
                        </div>
                        <label>Password</label>
                        <div className="mb-3">
                          <input
                            type="password"
                            className="form-control"
                            placeholder="New Password"
                            {...resetPasswordRegister("password", {
                              required: "Password is required",
                            })}
                          />
                          {resetPasswordError.password && (
                            <p className="text-danger">
                              {resetPasswordError.password.message}
                            </p>
                          )}
                        </div>
                        <label>Confirm Password</label>
                        <div className="mb-3">
                          <input
                            type="password"
                            className="form-control"
                            placeholder="New Password"
                            {...resetPasswordRegister("confirmPassword", {
                              required: "Password is required",
                            })}
                          />
                          {resetPasswordError.confirmPassword && (
                            <p className="text-danger">
                              {resetPasswordError.confirmPassword.message}
                            </p>
                          )}
                        </div>
                        <div className="form-check form-switch"></div>
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
