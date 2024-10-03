import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Multiselect from "multiselect-react-dropdown"; // Ensure this package is installed
import { useForm } from "react-hook-form";
import Sidebar from "../../common/sidebar/Sidebar";
import Navbar from "../../common/navbar/Navbar";
import { CARDDATA } from "../../../constant/constant";
import {
  createTaskDailyUpdateAPI,
  fetchTicketData,
  getAllDailyTaskUpdate,
} from "../../common/Api/api";
import moment from "moment";

const Update = () => {
  const [show, setShow] = useState(false);
  const [collaboratorSelect, setCollaboratorSelect] = useState([]);

  const {
    register,
    handleSubmit,
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

  const dailyUpdate = async () => {
    const task = await getAllDailyTaskUpdate();

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
      const payload = {
        ticketNo: data?.taskNumber,
        about: data?.textarea,
        date: data?.date,
        description: data?.description,
        tags: collaboratorSelect,
      };

      const res = await createTaskDailyUpdateAPI(payload);
      if (res.success) {
        dailyUpdate();
        handleClose();
      }
    } catch (error) {}
  };

  const onCollaboratorSelect = (selectedList) =>
    setCollaboratorSelect(selectedList);

  const onCollaboratorRemove = (selectedList) =>
    setCollaboratorSelect(selectedList);

  const handleInputChange = (e) => e.target.value.replace(/[^0-9]/g, "");

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dailyTask.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(dailyTask.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <Sidebar></Sidebar>
      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
        <Navbar />
        <div className="container-fluid py-4">
          <div className="row">
            {CARDDATA.map((card, index) => (
              <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4" key={index}>
                <div className="card">
                  <div className="card-body p-3">
                    <div className="row">
                      <div className="col-8">
                        <div className="numbers">
                          <p className="text-sm mb-0 text-capitalize font-weight-bold">
                            {card.title}
                          </p>
                          <h5 className="font-weight-bolder mb-0">
                            {card.value}
                            <span
                              className={`${card.percentageColor} text-sm font-weight-bolder`}
                            >
                              {card.percentage}
                            </span>
                          </h5>
                        </div>
                      </div>
                      <div className="col-4 text-end">
                        <div
                          className={`icon icon-shape ${card.iconColor} shadow text-center border-radius-md`}
                        >
                          <i
                            className={`${card.icon} text-lg opacity-10`}
                            aria-hidden="true"
                          ></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div class="container-fluid py-4">
              <Button variant="primary" onClick={handleShow} className="mt-3">
                Update
              </Button>
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
                          {currentItems.map((link, index) => (
                            <tbody key={index}>
                              <tr>
                                <td>
                                  <h6 class="font-weight-bold ms-4">
                                    {link.ticketNo ? link.ticketNo : "NA"}
                                  </h6>
                                </td>
                                <td>
                                  <p class="text-xs font-weight-bold mb-0">
                                    {link.about ? link.about : "NA"}
                                  </p>
                                </td>
                                <td class="align-middle text-center text-sm">
                                  {moment(link.date).format("DD MM YYYY")
                                    ? moment(link.date).format("DD MM YYYY")
                                    : "NA"}
                                </td>
                                <td class="align-middle text-center">
                                  <span class="text-xs font-weight-bold">
                                    {link.description ? link.description : "NA"}
                                  </span>
                                </td>
                                <td class="align-middle text-center">
                                  {link.tags.map((item, index) => (
                                    <span
                                      class="text-light bg-gradient-success mx-1 p-1 rounded-pill text-xs text-uppercase font-weight-bold"
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
                        {pageNumbers.map((number) => (
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
                {...register("textarea")}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                className="form-control"
                {...register("date")}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description">Description</label>
              <textarea
                className="form-control"
                rows={3}
                {...register("description")}
              />
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
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Update;
