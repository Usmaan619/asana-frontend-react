import React from "react";
import "./App.css";
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
import "./assets/css/soft-ui-dashboard.css?v=1.0.7";
import Dashboard from "./component/page/dashboard/Dashboard";
import { AuthProvider } from "./authContext/AuthContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./component/page/signup/signUp";
import Login from "./component/page/login/login";
import { PrivateRoute } from "./authContext/PrivateRoute";
import Sidebar from "./component/common/sidebar/Sidebar";
import { get } from "react-hook-form";
import { GET_CASHE } from "./utils/helper";

function Layout() {
  const showSidebar =
    !["/", "/signup"].includes(window?.location?.pathname) &&
    GET_CASHE("token");
  return (
    <>
      {showSidebar && <Sidebar />}
      <RouterProvider router={router} />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/dashboard",
    element: <PrivateRoute element={<Dashboard />} />,
  },
]);

function App() {
  return (
    <React.Fragment>
      <AuthProvider>
        <Layout />
      </AuthProvider>
    </React.Fragment>
  );
}

export default App;
