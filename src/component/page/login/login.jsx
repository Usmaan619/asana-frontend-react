import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginAPI } from "../../common/Api/api";
import { SET_CASHE } from "../../../utils/helper";
import { UserContext } from "../../../Context/UserContext";

const Login = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const { setUserLogin } = useContext(UserContext);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      const payload = {
        email,
        password,
        rememberMe,
      };

      const response = await loginAPI(payload);

      if (response?.login) {
        SET_CASHE("token", response?.token);
        setUserLogin(response?.token)
        navigate("/dashboard");
      }
      console.log("Login successful:", response);
    } catch (error) {
      setError(
        error.response ? error.response.data : "Login failed. Please try again."
      );
      console.error("Error:", error);
    }
  };

  return (
    <>
      <main className="main-content mt-0">
        <section>
          <div className="page-header min-vh-100">
            <div className="container">
              <div className="row">
                <div className="col-xl-4 col-lg-5 col-md-6 d-flex flex-column mx-auto">
                  <div className="card card-plain mt-8">
                    <div className="card-header pb-0 text-left bg-transparent">
                      <h3 className="font-weight-bolder text-info text-gradient">
                        Welcome back
                      </h3>
                      <p className="mb-0">
                        Enter your email and password to sign in
                      </p>
                      {error && <p className="text-danger">{error}</p>}
                    </div>
                    <div className="card-body">
                      <form onSubmit={handleSubmit} role="form">
                        <label>Name</label>
                        <div className="mb-3">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Name"
                            aria-label="Name"
                            aria-describedby="name-addon"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                        <label>Email</label>
                        <div className="mb-3">
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            aria-label="Email"
                            aria-describedby="email-addon"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                        <label>Password</label>
                        <div className="mb-3">
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            aria-label="Password"
                            aria-describedby="password-addon"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="rememberMe"
                            checked={rememberMe}
                            onChange={() => setRememberMe(!rememberMe)}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="rememberMe"
                          >
                            Remember me
                          </label>
                        </div>
                        <div className="text-center">
                          <button
                            type="submit"
                            className="btn bg-gradient-info w-100 mt-4 mb-0"
                          >
                            Sign in
                          </button>
                        </div>
                      </form>
                    </div>
                    <div className="card-footer text-center pt-0 px-lg-2 px-1">
                      <p className="mb-4 text-sm mx-auto">
                        Don't have an account?
                        <Link
                          to="/signup"
                          className="text-info text-gradient font-weight-bold"
                        >
                          Sign up
                        </Link>
                      </p>
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
    </>
  );
};

export default Login;
