import React, { useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import Multiselect from "multiselect-react-dropdown";
import { createTaskAPI, featchAllUser, featctAllTicket } from "../Api/api";
import { toastSuccess } from "../../../servers/toastr.service";
import { TailSpin } from "react-loader-spinner";
import {
  CLEAR_CASHE,
  GET_CASHE,
  getFirstAndLastLatterOfName,
} from "../../../utils/helper";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../Context/UserContext";
import "quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { quillFormats, quillModules } from "../../../constant/constant";

const Navbar = ({ fetchTicket }) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [description, setdescription] = useState();

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
      // Append other fields to formData
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", data?.title);
      formData.append("assignedTo", data?.assignedTo);
      formData.append("priority", data?.priority);
      formData.append("status", data?.status);
      formData.append("dueDate", data?.dueDate);
      formData.append("description", description);
      formData.append("collaborators", JSON.stringify(data?.collaborator)); // Stringify array or object if needed

      setIsLoading(false);

      const response = await createTaskAPI(formData);
      if (response?.success) {
        setIsLoading(false);
        toastSuccess(response?.message);
        // await featchTicketData();
        await getTask();
        await fetchTicket();

        handleCloseModal();
        setCollaboratorSelect([]);

        reset();
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  const navigate = useNavigate();

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
  const { setUserLogin } = useContext(UserContext);

  const handleProcedureContentChange = (content) => {
    console.log("content----==========", content);
    setdescription(content);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    console.log("event.target.files[0]: ", event.target.files[0]);
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
                          {...register("title", {
                            required: "Task name is required",
                          })}
                        />
                        {errors.title && (
                          <span className="text-danger">
                            {errors.title.message}
                          </span>
                        )}
                      </div>

                      <div className="form-group">
                        <label htmlFor="assginee">Assginee</label>
                        <select
                          className="form-control"
                          id="assginee"
                          {...register("assignedTo", {
                            required: "Assigne is required",
                          })}
                        >
                          <option value="">Choose...</option>
                          {TaskData.map((option, index) => (
                            <option key={index} value={option?._id}>
                              {option?.name}
                            </option>
                          ))}
                        </select>
                        {errors.assignedTo && (
                          <span className="text-danger">
                            {errors.assignedTo.message}
                          </span>
                        )}
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

                      <div className="form-group">
                        <ReactQuill
                          theme="snow"
                          modules={quillModules}
                          formats={quillFormats}
                          placeholder="write your content ...."
                          onChange={handleProcedureContentChange}
                          style={{ height: "220px" }}
                        ></ReactQuill>
                      </div>

                      {/* Collaborator MultiSelect */}
                      <div className="form-group mt-5">
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
                      <div className="from-group mb-2">
                        <label htmlFor="file">Upload File:</label>
                        <input
                          type="file"
                          className="form-control"
                          {...register("file")}
                          onChange={handleFileChange}
                        />
                      </div>

                      <div className="text-center">
                        <button
                          className="btn btn-primary"
                          type="submit"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <TailSpin color="#fff" height={20} width={20} />
                          ) : (
                            "Submit"
                          )}
                        </button>
                      </div>
                    </form>
                  </Modal.Body>
                </Modal>
              </div>
            </div>
            <ul className="navbar-nav justify-content-end">
              <li className="nav-item d-flex align-items-center">
                <a
                  className="btn btn-outline-primary btn-sm mb-0 me-3"
                  onClick={() => {
                    CLEAR_CASHE();
                    navigate("/");
                    setUserLogin(null);
                  }}
                >
                  logout
                </a>
              </li>

              <li className="nav-item d-flex align-items-center">
                <div className="profile-dev bg-gradient-dark shadow mb-0 me-3 text-uppercase">
                  {getFirstAndLastLatterOfName(GET_CASHE("name"))
                    ? getFirstAndLastLatterOfName(GET_CASHE("name"))
                    : "NA"}
                </div>
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
