import React from "react";
import Logo from "../../../assets/img/logo-ct-dark.png";
import { HiHome } from "react-icons/hi";

const Sidebar = () => {
  const navItems = [
    {
      href: "/dashboard",
      iconViewBox: "0 0 45 40",
      title: "shop",
      // paths: [
      //   {
      //     className: "color-background opacity-6",
      //     d: "M46.7199583,10.7414583 L40.8449583,0.949791667 ...", // truncated for readability
      //   },
      //   {
      //     className: "color-background",
      //     d: "M39.198,22.4912623 C37.3776246,22.4928106 ...", // truncated for readability
      //   },
      // ],
      icon: <HiHome />,
      label: "Dashboard",
      isActive: true,
    },
    {
      href: "../pages/tables.html",
      iconViewBox: "0 0 42 42",
      title: "office",
      paths: [
        {
          className: "color-background opacity-6",
          d: "M12.25,17.5 L8.75,17.5 L8.75,1.75 C8.75,0.78225 ...", // truncated
        },
        {
          className: "color-background",
          d: "M40.25,14 L24.5,14 C23.53225,14 22.75,14.78225 ...", // truncated
        },
      ],
      label: "Board",
      isActive: false,
    },
    {
      href: "/update",
      iconViewBox: "0 0 43 36",
      title: "credit-card",
      paths: [
        {
          className: "color-background opacity-6",
          d: "M43,10.7482083 L43,3.58333333 C43,1.60354167 ...", // truncated
        },
        {
          className: "color-background",
          d: "M0,16.125 L0,32.25 C0,34.2297917 1.60354167 ...", // truncated
        },
      ],
      label: "Update",
      isActive: false,
    },
    {
      href: "../pages/virtual-reality.html",
      iconViewBox: "0 0 42 42",
      title: "box-3d-50",
      paths: [
        {
          className: "color-background",
          d: "M22.7597136,19.3090182 L38.8987031,11.2395234 ...", // truncated
        },
        {
          className: "color-background opacity-6",
          d: "M23.625,22.429159 L23.625,39.8805372 ...", // truncated
        },
        {
          className: "color-background opacity-6",
          d: "M20.4472136,21.5347318 L1.4472136,12.0347318 ...", // truncated
        },
      ],
      label: "Virtual Reality",
      isActive: false,
    },
  ];

  return (
    <React.Fragment>
      <aside
        class="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 "
        id="sidenav-main"
      >
        <div class="sidenav-header">
          <i
            class="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none"
            aria-hidden="true"
            id="iconSidenav"
          ></i>
          <a
            class="navbar-brand m-0"
            href=" https://demos.creative-tim.com/soft-ui-dashboard/pages/dashboard.html "
            target="_blank"
          >
            <img src={Logo} class="navbar-brand-img h-100" alt="main_logo" />
            <span class="ms-1 font-weight-bold">ASANA LITE Dashboard</span>
          </a>
        </div>
        <hr class="horizontal dark mt-0" />

        <div
          className="collapse navbar-collapse w-auto"
          id="sidenav-collapse-main"
        >
          <ul className="navbar-nav">
            {navItems.map((item, index) => (
              <li key={index} className="nav-item">
                <a
                  className={`nav-link ${item.isActive ? "active" : ""}`}
                  href={item.href}
                >
                  <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                    {/* <svg
                      width="12px"
                      height="12px"
                      viewBox={item.iconViewBox}
                      version="1.1"
                    > */}
                    <title>{item.title}</title>
                    {/* <g
                        stroke="none"
                        strokeWidth="1"
                        fill="none"
                        fillRule="evenodd"
                      > */}
                    {/* {item.paths.map((path, i) => (
                          <path
                            key={i}
                            className={path.className}
                            d={path.d}
                          ></path>
                        ))} */}
                    {item.icon}
                    {/* </g> */}
                    {/* </svg> */}
                  </div>
                  <span className="nav-link-text ms-1">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        {/* <div class="sidenav-footer mx-3 ">
          <div
            class="card card-background shadow-none card-background-mask-secondary"
            id="sidenavCard"
          >
            <div
              class="full-background"
              style={{
                backgroundImage:
                  "url('../assets/img/curved-images/white-curved.jpg')",
              }}
            ></div>
            <div class="card-body text-start p-3 w-100">
              <div class="icon icon-shape icon-sm bg-white shadow text-center mb-3 d-flex align-items-center justify-content-center border-radius-md">
                <i
                  class="ni ni-diamond text-dark text-gradient text-lg top-0"
                  aria-hidden="true"
                  id="sidenavCardIcon"
                ></i>
              </div>
              <div class="docs-info">
                <h6 class="text-white up mb-0">Need help?</h6>
                <p class="text-xs font-weight-bold">Please check our docs</p>
                <a
                  href="https://www.creative-tim.com/learning-lab/bootstrap/license/soft-ui-dashboard"
                  target="_blank"
                  class="btn btn-white btn-sm w-100 mb-0"
                >
                  Documentation
                </a>
              </div>
            </div>
          </div>
          <a
            class="btn bg-gradient-primary mt-3 w-100"
            href="https://www.creative-tim.com/product/soft-ui-dashboard-pro?ref=sidebarfree"
          >
            Upgrade to pro
          </a>
        </div> */}
      </aside>
    </React.Fragment>
  );
};

export default Sidebar;
