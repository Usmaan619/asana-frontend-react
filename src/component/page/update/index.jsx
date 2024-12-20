import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Multiselect from "multiselect-react-dropdown"; // Ensure this package is installed
import { useForm } from "react-hook-form";
import Sidebar from "../../common/sidebar/Sidebar";
import Navbar from "../../common/navbar/Navbar";
// import { CARDDATA } from "../../../constant/constant";
import { TailSpin } from "react-loader-spinner";
import {
  createTaskDailyUpdateAPI,
  DeleteDailyTaskAPI,
  fetchTicketData,
  getAllDailyTaskUpdate,
  getAllTasksCountAPI,
  getDailyTaskUpdateFilterAPI,
  UpdateTaskDailyUpdateAPI,
} from "../../common/Api/api";
import moment from "moment";
import { toastError, toastSuccess } from "../../../servers/toastr.service";
// import Notifications from "../notification/notification";

const Update = () => {
  const [show, setShow] = useState(false);
  const [collaboratorSelect, setCollaboratorSelect] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetchTicket();
    dailyUpdate();
  }, []);

  const fetchTicket = async () => {
    const user = await fetchTicketData();

    setTaskData(user);
  };

  const [resetFilter, setResetFilter] = useState();

  const dailyUpdate = async () => {
    const task = await getAllDailyTaskUpdate();
    setResetFilter(task);
    setDailyTask(task);
  };

  const [TaskData, setTaskData] = useState([]);
  const [dailyTask, setDailyTask] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [type, setType] = useState();

  const itemsPerPage = 10;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // const onSubmit = async (data) => {
  //   try {
  //     setIsLoading(true);

  //     console.log("type: ", type);
  //     if (type === "edit") {
  //     }
  //     const payload = {
  //       ticketNo: data?.taskNumber,
  //       about: data?.textarea,
  //       date: data?.date,
  //       description: data?.description,
  //       tags: collaboratorSelect,
  //     };

  //     const res = await createTaskDailyUpdateAPI(payload);
  //     console.log("res:createTaskDailyUpdateAPI ", res);
  //     if (res?.success) {
  //       setIsLoading(false);
  //       dailyUpdate();
  //       handleClose();
  //       reset();
  //     }
  //   } catch (error) {
  //     console.log("error:createTaskDailyUpdateAPI ", error);
  //     if (!error?.data?.success) toastError(error?.data?.message);
  //     setIsLoading(false);
  //   }
  // };

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);

      console.log("type: ", type);

      const payload = {
        ticketNo: data?.taskNumber,
        about: data?.textarea,
        date: data?.date,
        description: data?.description,
        tags: collaboratorSelect,
        taskId: type?.taskId,
      };

      let res;
      if (type?.type === "edit") {
        // Call the edit API
        res = await UpdateTaskDailyUpdateAPI(payload);
      } else {
        // Call the create API
        res = await createTaskDailyUpdateAPI(payload);
      }

      if (res?.success) {
        setIsLoading(false);
        dailyUpdate();
        handleClose();
        reset();
      }
    } catch (error) {
      console.log("error: ", error);
      if (!error?.data?.success) toastError(error?.data?.code);
      setIsLoading(false);
    }
  };

  const onCollaboratorSelect = (selectedList) =>
    setCollaboratorSelect(selectedList);

  const onCollaboratorRemove = (selectedList) =>
    setCollaboratorSelect(selectedList);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dailyTask.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(dailyTask.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const [startDate, setStartDate] = useState();

  const handleFilterTask = async () => {
    try {
      console.log("startDate: ", startDate);
      if (!startDate) {
        return toastError(" Please select start date!");
      }
      const res = await getDailyTaskUpdateFilterAPI(startDate);
      console.log("res: ", res?.data);
      if (res?.success) {
        if (res?.data?.length) setDailyTask(res?.data);
        console.log("res?.data?.length: ", res?.data?.length);

        if (!res?.data?.length) toastError("No Task Found");
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const resetTaskFilter = () => {
    setDailyTask(resetFilter);
    setStartDate("");
  };

  const onDeleteTaskUpdate = async (t) => {
    try {
      const res = await DeleteDailyTaskAPI(t?._id);

      if (res?.success) {
        toastSuccess(res?.message);
        await dailyUpdate();
      }
    } catch (error) {
      if (!error?.data?.success) toastError(error?.data?.message);
      console.log("error:DeleteDailyTaskAPI ", error);
    }
  };

  console.log("type: ", type);
  const onEditTaskUpdate = (t, type) => {
    setType({ type, taskId: t?._id });
    console.log("t: ", t);
    populateData(t);
    handleShow();
  };

  const populateData = (d) => {
    setValue("taskNumber", d?.ticketNo);
    setValue("textarea", d?.about);

    setValue(
      "date",
      d?.date ? new Date(d?.date).toISOString().split("T")[0] : ""
    );
    setValue("description", d?.description);
    setCollaboratorSelect(d?.tags);
  };

  const [getAllTasksCount, setGetAllTasksCount] = useState();

  React.useEffect(() => {
    statusCount();

    const intervalCall = setInterval(() => {
      statusCount();
    }, 20000);

    return () => {
      clearInterval(intervalCall);
    };
  }, []);

  const statusCount = async () =>
    setGetAllTasksCount(await getAllTasksCountAPI());
  return (
    <>
      <Sidebar NOTIFICATION={getAllTasksCount} />
      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
        <Navbar />
        <div className="container-fluid">
          <div className="row">
            <div className="container-fluid">
              <div className="d-flex justify-content-between align-items-center">
                <Button
                  variant="primary"
                  onClick={() => {
                    handleShow();
                    reset();
                    setCollaboratorSelect([]);
                    setType("");
                  }}
                  className="my-3"
                >
                  My Task
                </Button>
                <div className="d-flex gap-4 align-items-end">
                  <div className="d-flex flex-column mb-3">
                    <label htmlFor="startDate" className="">
                      Start Date
                    </label>
                    <input
                      type="date"
                      id="startDate"
                      className="form-control shadow"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                  <button
                    className="btn btn-primary"
                    onClick={handleFilterTask}
                  >
                    Filter
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={resetTaskFilter}
                  >
                    Reset
                  </button>
                </div>
              </div>

              <div className="row">
                <div className="col-12">
                  <div className="card mb-4">
                    <div className="card-header pb-0">
                      <h6>Report table</h6>
                    </div>
                    <div className="card-body px-0 pt-0 pb-2">
                      <div className="table-responsive p-0">
                        <table className="table align-items-center mb-0">
                          <thead>
                            <tr>
                              <th className="text-uppercase text-dark text-sm font-weight-bolder opacity-7">
                                Ticket No.
                              </th>
                              <th className="text-uppercase text-dark text-sm font-weight-bolder opacity-7">
                                Ticket Created By
                              </th>
                              <th className="text-uppercase text-dark text-sm font-weight-bolder opacity-7 ps-2">
                                About
                              </th>
                              <th className="text-center text-uppercase text-dark text-sm font-weight-bolder opacity-7">
                                Date
                              </th>
                              <th className="text-center text-uppercase text-dark text-sm font-weight-bolder opacity-7">
                                Description
                              </th>
                              <th className="text-center text-uppercase text-dark text-sm font-weight-bolder opacity-7">
                                Tags
                              </th>
                              <th className="text-center text-uppercase text-dark text-sm font-weight-bolder opacity-7">
                                Action
                              </th>
                              <th className="text-secondary opacity-7"></th>
                            </tr>
                          </thead>
                          {currentItems?.map((link, index) => (
                            <tbody key={index}>
                              <tr>
                                <td>
                                  <h6 className="font-weight-bold ms-4">
                                    {link?.ticketNo ? link?.ticketNo : "NA"}
                                  </h6>
                                </td>
                                <td>
                                  <span className="text-dark mx-1 p-2 pt-1 pb-1  text-xs text-uppercase fw-bolder">
                                    {link?.assignedTo?.name
                                      ? link?.assignedTo?.name
                                      : "NA"}
                                  </span>
                                </td>

                                <td className="">
                                  <p className="text-xs font-weight-bold mb-0 text-truncate table-width">
                                    {link?.about ? link?.about : "NA"}
                                  </p>
                                </td>
                                <td className="align-middle text-center text-sm">
                                  {moment(link.date).format("DD/MM/YYYY")
                                    ? moment(link.date).format("DD/MM/YYYY")
                                    : "NA"}
                                </td>
                                <td className="align-middle">
                                  <p className="text-xs font-weight-bold mb-0 text-truncate table-width">
                                    {link?.description
                                      ? link?.description
                                      : "NA"}
                                  </p>
                                </td>
                                <td className="align-middle ">
                                  {link?.tags?.map((item, index) => (
                                    <span
                                      className="fw-bolder text-dark mx-1  text-xs"
                                      key={index}
                                    >
                                      {item.name ? `${item?.name} ,` : "NA"}
                                    </span>
                                  ))}
                                </td>

                                <td>
                                  {/*  */}
                                  <div className="ms-auto">
                                    <button
                                      onClick={() => {
                                        onDeleteTaskUpdate(link);
                                      }}
                                      className="btn btn-link border mx-1 text-danger text-gradient px-2 py-2 mb-0"
                                    >
                                      <i className="far fa-trash-alt"></i>
                                      Delete
                                    </button>
                                    <button
                                      onClick={() => {
                                        onEditTaskUpdate(link, "edit");
                                      }}
                                      className="btn btn-link border mx-1 text-dark px-2 py-2 mb-0"
                                    >
                                      <i
                                        className="fas fa-pencil-alt text-dark"
                                        aria-hidden="true"
                                      ></i>
                                      Edit
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          ))}
                        </table>
                      </div>
                    </div>
                    <nav aria-label="Page navigation" className="m-auto">
                      <ul className="pagination justify-centent-center">
                        {pageNumbers?.map((number) => (
                          <li key={number} className="page-item mx-1">
                            <button
                              onClick={() => paginate(number)}
                              className="page-link"
                            >
                              {number}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Daily Task Update</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="taskNumber">Task Number</label>
              <input
                type="text"
                disabled={type?.type === "edit"}
                className={`form-control ${
                  errors.taskNumber ? "is-invalid" : ""
                }`}
                id="taskNumber"
                placeholder="Enter task number"
                {...register("taskNumber", {
                  required: true,
                  pattern: /^[0-9]+$/,
                })}
              />
              {errors.taskNumber && errors.taskNumber.type === "required" && (
                <div className="invalid-feedback">Task number is required.</div>
              )}
              {errors.taskNumber && errors.taskNumber.type === "pattern" && (
                <div className="invalid-feedback">
                  Only numeric values are allowed.
                </div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="textarea">About</label>
              <textarea
                className="form-control"
                rows={3}
                {...register("textarea", {
                  required: "About is required",
                })}
              />
              {errors.textarea && (
                <span className="text-danger">{errors.textarea.message}</span>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                className="form-control"
                {...register("date", {
                  required: "Date is required",
                })}
              />
              {errors.date && (
                <span className="text-danger">{errors.date.message}</span>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="description">Description</label>
              <textarea
                className="form-control"
                rows={3}
                {...register("description", {
                  required: "Description is required",
                })}
              />
              {errors.description && (
                <span className="text-danger">
                  {errors.description.message}
                </span>
              )}
            </div>
            <div className="mb-3">
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
            <Button variant="primary" type="submit" disabled={isLoading}>
              {isLoading ? (
                <TailSpin color="#fff" width={20} height={20} />
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Update;
