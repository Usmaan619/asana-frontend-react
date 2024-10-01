import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import Multiselect from "multiselect-react-dropdown";
import { createTaskAPI, featchAllUser, featctAllTicket } from "../Api/api";
import { toastSuccess } from "../../../servers/toastr.service";

const Navbar = ({ fetchTicket }) => {
  const { register, handleSubmit, setValue, reset } = useForm();

  useEffect(() => {
    featchTicketData();
  }, []);

  const [TaskData, setTaskData] = useState([]);

  const featchTicketData = async () => {
    try {
      const res = await featchAllUser();
      if (res) setTaskData(res);
    } catch (error) {}
  };
  const getTask = async () => await featctAllTicket();

  const [show, setShow] = useState(false);

  const handleOpenModal = () => setShow(true);

  const handleCloseModal = () => setShow(false);

  const onSubmit = async (data) => {
    try {
      const payload = {
        title: data?.title,
        assignedTo: data?.assignedTo,
        priority: data?.priority,
        status: data?.status,
        dueDate: data?.dueDate,
        description: data?.description,
        collaborators: data?.collaborator,
      };
      const response = await createTaskAPI(payload);
      if (response?.success) {
        toastSuccess(response?.message)
        // await featchTicketData();
        await getTask();
        await fetchTicket();

        handleCloseModal();
        setCollaboratorSelect([]);

        reset();
      }
    } catch (error) {}
  };

  const notifications = [
    {
      imgSrc: "../assets/img/team-2.jpg",
      title: "New message",
      description: "from Laur",
      timeAgo: "13 minutes ago",
      icon: "fa fa-clock",
    },
    {
      imgSrc: "../assets/img/small-logos/logo-spotify.svg",
      title: "New album",
      description: "by Travis Scott",
      timeAgo: "1 day",
      icon: "fa fa-clock",
    },
    {
      imgSrc: "",
      title: "Payment successfully completed",
      description: "",
      timeAgo: "2 days",
      icon: "fa fa-clock",
      svg: (
        <svg
          width="12px"
          height="12px"
          viewBox="0 0 43 36"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <title>credit-card</title>
          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g
              transform="translate(-2169.000000, -745.000000)"
              fill="#FFFFFF"
              fillRule="nonzero"
            >
              <g transform="translate(1716.000000, 291.000000)">
                <g transform="translate(453.000000, 454.000000)">
                  <path
                    className="color-background"
                    d="M43,10.7482083 L43,3.58333333 C43,1.60354167 41.3964583,0 39.4166667,0 L3.58333333,0 C1.60354167,0 0,1.60354167 0,3.58333333 L0,10.7482083 L43,10.7482083 Z"
                    opacity="0.593633743"
                  ></path>
                  <path
                    className="color-background"
                    d="M0,16.125 L0,32.25 C0,34.2297917 1.60354167,35.8333333 3.58333333,35.8333333 L39.4166667,35.8333333 C41.3964583,35.8333333 43,34.2297917 43,32.25 L43,16.125 L0,16.125 Z M19.7083333,26.875 L7.16666667,26.875 L7.16666667,23.2916667 L19.7083333,23.2916667 L19.7083333,26.875 Z M35.8333333,26.875 L28.6666667,26.875 L28.6666667,23.2916667 L35.8333333,23.2916667 L35.8333333,26.875 Z"
                  ></path>
                </g>
              </g>
            </g>
          </g>
        </svg>
      ),
    },
  ];

  // multi option selector
  // States for each MultiSelect
  const [collaboratorSelect, setCollaboratorSelect] = useState([]);

  // Event handler for Collaborator MultiSelect
  const onCollaboratorSelect = (selectedList) => {
    setCollaboratorSelect(selectedList);
    setValue("collaborator", selectedList);
  };

  const onCollaboratorRemove = (selectedList) => {
    setCollaboratorSelect(selectedList);
    setValue("collaborator", selectedList);
  };

  const [breadcrumb, setBreadcrumb] = useState("");
  useEffect(() => {
    getRoutes();
  }, [breadcrumb]);

  const getRoutes = () => {
    switch (window?.location?.pathname) {
      case "/dashboard":
        setBreadcrumb("Dashboard");
        break;

      case "/update":
        setBreadcrumb("Task Reports");

        break;

      default:
        break;
    }
  };

  return (
    <React.Fragment>
      {/* <!-- Navbar --> */}
      <nav
        className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl"
        id="navbarBlur"
        navbar-scroll="true"
      >
        <div className="container-fluid py-1 px-3">
          <nav aria-label="breadcrumb">
            <h6 className="font-weight-bolder mb-0">{breadcrumb}</h6>
          </nav>
          <div
            className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4"
            id="navbar"
          >
            <div className="ms-md-auto pe-md-3 d-flex align-items-center">
              <div className="add-task w-100">
                <button
                  className="btn btn-primary m-0 w-auto"
                  onClick={() => handleOpenModal(true)}
                  type="button"
                >
                  Add Task
                </button>
                <Modal
                  size="lg"
                  show={show}
                  onHide={() => handleCloseModal(false)}
                  aria-labelledby="example-modal-sizes-title-sm"
                >
                  <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">
                      ADD TASK
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="form-group">
                        <label htmlFor="task_name">Task Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="task_name"
                          placeholder="Enter Task"
                          {...register("title")}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="assginee">Assginee</label>
                        <select
                          className="form-control"
                          id="assginee"
                          {...register("assignedTo")}
                        >
                          <option value="">Choose...</option>
                          {TaskData.map((option, index) => (
                            <option key={index} value={option?._id}>
                              {option?.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Priority MultiSelect */}
                      <div className="form-group">
                        <label htmlFor="priority">Priority</label>
                        <select
                          className="form-control"
                          id="priority"
                          {...register("priority")}
                        >
                          <option value="medium">medium</option>
                          <option value="low">low</option>
                          <option value="high">high</option>
                        </select>
                      </div>

                      {/* Status Dropdown */}
                      <div className="form-group">
                        <label htmlFor="status">Status</label>
                        <select
                          className="form-control"
                          id="status"
                          {...register("status")}
                        >
                          <option value="open">open</option>
                          <option value="pending">pending</option>
                          <option value="in-progress">in-progress</option>
                          <option value="testing">testing</option>
                          <option value="completed">completed</option>
                        </select>
                      </div>

                      {/* Date Picker */}
                      <div className="form-group">
                        <label htmlFor="date">Date</label>
                        <input
                          className="form-control"
                          type="date"
                          id="date"
                          {...register("dueDate")}
                        />
                      </div>

                      {/* Description Textarea */}
                      <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                          className="form-control"
                          id="description"
                          rows="4"
                          {...register("description")}
                        />
                      </div>

                      {/* Collaborator MultiSelect */}
                      <div className="form-group">
                        <label htmlFor="collaborator">Collaborator</label>
                        <Multiselect
                          placeholder="Collaborator"
                          options={TaskData}
                          selectedValues={collaboratorSelect}
                          onSelect={onCollaboratorSelect}
                          onRemove={onCollaboratorRemove}
                          displayValue="name"
                        />
                      </div>

                      <div className="text-center">
                        <button className="btn btn-primary" type="submit">
                          Submit
                        </button>
                      </div>
                    </form>
                  </Modal.Body>
                </Modal>
              </div>
              <div className="input-group">
                <span className="input-group-text text-body">
                  <i className="fas fa-search" aria-hidden="true"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Type here..."
                />
              </div>
            </div>
            <ul className="navbar-nav justify-content-end">
              <li className="nav-item d-flex align-items-center">
                <a
                  className="btn btn-outline-primary btn-sm mb-0 me-3"
                  target="_blank"
                  href="#/"
                >
                  Online Builder
                </a>
              </li>
              <li className="nav-item d-flex align-items-center">
                <a
                  href="#/"
                  className="nav-link text-body font-weight-bold px-0"
                >
                  <i className="fa fa-user me-sm-1"></i>
                  <span className="d-sm-inline d-none">Sign In</span>
                </a>
              </li>
              <li className="nav-item d-xl-none ps-3 d-flex align-items-center">
                <a
                  href="#/"
                  className="nav-link text-body p-0"
                  id="iconNavbarSidenav"
                >
                  <div className="sidenav-toggler-inner">
                    <i className="sidenav-toggler-line"></i>
                    <i className="sidenav-toggler-line"></i>
                    <i className="sidenav-toggler-line"></i>
                  </div>
                </a>
              </li>
              <li className="nav-item px-3 d-flex align-items-center">
                <a href="#/" className="nav-link text-body p-0">
                  <i className="fa fa-cog fixed-plugin-button-nav cursor-pointer"></i>
                </a>
              </li>
              <li className="nav-item dropdown pe-2 d-flex align-items-center">
                <a
                  href="#/"
                  className="nav-link text-body p-0"
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fa fa-bell cursor-pointer"></i>
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end px-2 py-3 me-sm-n4"
                  aria-labelledby="dropdownMenuButton"
                >
                  {notifications.map((notification, index) => (
                    <li className="mb-2" key={index}>
                      <a className="dropdown-item border-radius-md" href="#/">
                        <div className="d-flex py-1">
                          <div className="my-auto">
                            {notification.imgSrc ? (
                              <img
                                src={notification.imgSrc}
                                className="avatar avatar-sm me-3"
                                alt="notification"
                              />
                            ) : (
                              <div className="avatar avatar-sm bg-gradient-secondary me-3 my-auto">
                                {notification.svg}
                              </div>
                            )}
                          </div>
                          <div className="d-flex flex-column justify-content-center">
                            <h6 className="text-sm font-weight-normal mb-1">
                              <span className="font-weight-bold">
                                {notification.title}
                              </span>{" "}
                              {notification.description}
                            </h6>
                            <p className="text-xs text-secondary mb-0">
                              <i className={notification.icon + " me-1"}></i>{" "}
                              {notification.timeAgo}
                            </p>
                          </div>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* <!-- End Navbar --> */}
    </React.Fragment>
  );
};

export default Navbar;
