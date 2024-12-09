import React from "react";
import { Link } from "react-router-dom"; // Import Link for client-side navigation
import Logo from "../../../assets/logo/siw-logo.svg";
import { HiHome } from "react-icons/hi";

const Sidebar = () => {
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
      icon: <HiHome />,
      label: "Update",
      isActive: window?.location?.pathname === "/update" ? true : false,
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
        <Link to="/" className="navbar-brand m-0">
          <img src={Logo} className="navbar-brand-img h-100" alt="main_logo" />
          <span className="ms-1 font-weight-bold">SIW Management</span>
        </Link>
      </div>
      <hr className="horizontal dark mt-0" />

      <div
        className="collapse navbar-collapse w-auto"
        id="sidenav-collapse-main"
      >
        <ul className="navbar-nav">
          {navItems.map((item, index) => (
            <li key={index} className="nav-item">
              <Link
                className={`nav-link ${item.isActive ? "active" : ""}`}
                to={item.path}
              >
                <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                  {item.icon}
                </div>
                <span className="nav-link-text ms-1">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer Section (optional, uncomment if needed) */}
      {/* <div className="sidenav-footer mx-3">
        <div className="card card-background shadow-none card-background-mask-secondary" id="sidenavCard">
          <div className="full-background" style={{ backgroundImage: "url('../assets/img/curved-images/white-curved.jpg')" }}></div>
          <div className="card-body text-start p-3 w-100">
            <div className="icon icon-shape icon-sm bg-white shadow text-center mb-3 d-flex align-items-center justify-content-center border-radius-md">
              <i className="ni ni-diamond text-dark text-gradient text-lg top-0" aria-hidden="true" id="sidenavCardIcon"></i>
            </div>
            <div className="docs-info">
              <h6 className="text-white up mb-0">Need help?</h6>
              <p className="text-xs font-weight-bold">Please check our docs</p>
              <a href="https://www.creative-tim.com/learning-lab/bootstrap/license/soft-ui-dashboard" target="_blank" className="btn btn-white btn-sm w-100 mb-0">
                Documentation
              </a>
            </div>
          </div>
        </div>
        <a className="btn bg-gradient-primary mt-3 w-100" href="https://www.creative-tim.com/product/soft-ui-dashboard-pro?ref=sidebarfree">
          Upgrade to pro
        </a>
      </div> */}
    </aside>
  );
};

export default Sidebar;
