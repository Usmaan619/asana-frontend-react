import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Multiselect from "multiselect-react-dropdown"; // Ensure this package is installed
import { useForm } from "react-hook-form";
import Sidebar from "../../common/sidebar/Sidebar";
import Navbar from "../../common/navbar/Navbar";
import { CARDDATA } from "../../../constant/constant";
import { TailSpin } from "react-loader-spinner";
import {
  createTaskDailyUpdateAPI,
  fetchTicketData,
  getAllDailyTaskUpdate,
  getDailyTaskUpdateFilterAPI,
} from "../../common/Api/api";
import moment from "moment";
import { toastError } from "../../../servers/toastr.service";

const Update = () => {
  const [show, setShow] = useState(false);
  const [collaboratorSelect, setCollaboratorSelect] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
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
  const itemsPerPage = 10;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const payload = {
        ticketNo: data?.taskNumber,
        about: data?.textarea,
        date: data?.date,
        description: data?.description,
        tags: collaboratorSelect,
      };

      const res = await createTaskDailyUpdateAPI(payload);
      console.log("res:createTaskDailyUpdateAPI ", res);
      if (res?.success) {
        setIsLoading(false);
        dailyUpdate();
        handleClose();
        reset();
      }
    } catch (error) {
      console.log("error:createTaskDailyUpdateAPI ", error);
      if (!error?.data?.success) toastError(error?.data?.message);
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

  return (
    <>
      <Sidebar></Sidebar>
      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
        <Navbar />
        <div className="container-fluid py-4">
          <div className="row">
            <div class="container-fluid py-4 ">
              <div className="d-flex  justify-content-between">
                <Button variant="primary" onClick={handleShow} className="my-3">
                  Update
                </Button>
                <div className="d-flex gap-4">
                  <div className="">
                    <label htmlFor="startDate">Start Date</label>
                    <input
                      type="date"
                      id="startDate"
                      className="form-control mb-2"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>

                  <button
                    className={`btn btn-primary my-3`}
                    onClick={handleFilterTask}
                  >
                    Filter
                  </button>
                  <button
                    className={`btn btn-primary my-3`}
                    onClick={resetTaskFilter}
                  >
                    Reset
                  </button>
                </div>
              </div>

              <div class="row">
                <div class="col-12">
                  <div class="card mb-4">
                    <div class="card-header pb-0">
                      <h6>Report table</h6>
                    </div>
                    <div class="card-body px-0 pt-0 pb-2">
                      <div class="table-responsive p-0">
                        <table class="table align-items-center mb-0">
                          <thead>
                            <tr>
                              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                Ticket No.
                              </th>
                              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                Ticket Created By
                              </th>
                              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                About
                              </th>
                              <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                Date
                              </th>
                              <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                Description
                              </th>
                              <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                Tags
                              </th>
                              <th class="text-secondary opacity-7"></th>
                            </tr>
                          </thead>
                          {currentItems?.map((link, index) => (
                            <tbody key={index}>
                              <tr>
                                <td>
                                  <h6 class="font-weight-bold ms-4">
                                    {link?.ticketNo ? link?.ticketNo : "NA"}
                                  </h6>
                                </td>
                                <td>
                                  <span class="text-light bg-gradient-primary mx-1 p-2 pt-1 pb-1 rounded-pill text-xs text-uppercase font-weight-bold">
                                    {link?.assignedTo?.name
                                      ? link?.assignedTo?.name
                                      : "NA"}
                                  </span>
                                </td>

                                <td>
                                  <p class="text-xs font-weight-bold mb-0">
                                    {link?.about ? link?.about : "NA"}
                                  </p>
                                </td>
                                <td class="align-middle text-center text-sm">
                                  {moment(link.date).format("DD MM YYYY")
                                    ? moment(link.date).format("DD MM YYYY")
                                    : "NA"}
                                </td>
                                <td class="align-middle text-center">
                                  <span class="text-xs font-weight-bold">
                                    {link?.description
                                      ? link?.description
                                      : "NA"}
                                  </span>
                                </td>
                                <td class="align-middle text-center">
                                  {link?.tags?.map((item, index) => (
                                    <span
                                      class="text-light bg-gradient-success mx-1 p-2 pt-1 pb-1 rounded-pill text-xs text-uppercase font-weight-bold"
                                      key={index}
                                    >
                                      {item.name ? item.name : "NA"}
                                    </span>
                                  ))}
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
                            <a
                              onClick={() => paginate(number)}
                              href="#!"
                              className="page-link"
                            >
                              {number}
                            </a>
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
