import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link for client-side navigation
import Logo from "../../../assets/logo/siw-logo.svg";
import { HiChat, HiClipboardList, HiHome } from "react-icons/hi";
import { CLEAR_CASHE } from "../../../utils/helper";
import { UserContext } from "../../../Context/UserContext";

const Sidebar = ({ NOTIFICATION }) => {
  console.log("NOTIFICATION: ", NOTIFICATION);
  const navigate = useNavigate();

  const { setUserLogin } = useContext(UserContext);

  const navItems = [
    {
      path: "/dashboard",
      icon: <HiHome />,
      label: "Dashboard",
      isActive: window?.location?.pathname === "/dashboard" ? true : false,
    },
    // {
    //   // path: "/tables",
    //   icon: <HiHome />,
    //   label: "Board",
    //   isActive: false,
    // },
    {
      path: "/update",
      icon: <HiClipboardList />,
      label: "Update",
      isActive: window?.location?.pathname === "/update" ? true : false,
    },

    {
      path: "/notification",
      icon: <HiChat />,
      label: "Notification",
      count: NOTIFICATION?.totalNotifications,
      isActive: window?.location?.pathname === "/notification" ? true : false,
    },
    // {
    //   // path: "/virtual-reality",
    //   icon: <HiHome />,
    //   label: "Virtual Reality",
    //   isActive: false,
    // },
  ];

  return (
    <aside
      className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 bg-white"
      id="sidenav-main"
    >
      <div className="sidenav-header">
        <i
          className="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none"
          aria-hidden="true"
          id="iconSidenav"
        ></i>
        <Link className="navbar-brand m-0">
          <img src={Logo} className="navbar-brand-img h-100" alt="main_logo" />
          <span className="ms-1 font-weight-bold">SIW Management</span>
        </Link>
      </div>
      <hr className="horizontal dark mt-0" />
      <div className="d-grid h-100 ">
        <div
          className="collapse navbar-collapse w-auto"
          id="sidenav-collapse-main"
        >
          <ul className="navbar-nav">
            {navItems?.map((item, index) => (
              <li key={index} className="nav-item">
                <Link
                  className={`nav-link ${item.isActive ? "active" : ""}`}
                  to={item.path}
                >
                  <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                    {item.icon}
                  </div>
                  <span className="nav-link-text ms-1">{item.label}</span>
                  {item.count && (
                    <div className="rounded-circle bg-purple px-1 border border-1 border-dark mb-3">
                      {item.count}
                    </div>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer Section (optional, uncomment if needed) */}
        <div className="sidenav-footer mx-3 justify-content-end">
          <a
            className="btn btn-outline-primary btn-sm mb-0 me-3 w-100"
            onClick={() => {
              CLEAR_CASHE();
              navigate("/");
              setUserLogin(null);
            }}
          >
            logout
          </a>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
