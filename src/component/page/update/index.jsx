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
} from "../../common/Api/api";

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
  }, []);

  const fetchTicket = async () => {
    const user = await fetchTicketData();
    setTaskData(user);
  };

  const [TaskData, setTaskData] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onSubmit = async (data) => {
    try {
      console.log("collaboratorSelect: ", collaboratorSelect);
      console.log("data: ", data);

      const payload = {
        ticketNo: data?.taskNumber,
        about: data?.textarea,
        date: data?.date,
        description: data?.description,
        tags: collaboratorSelect,
      };

      const res = await createTaskDailyUpdateAPI(payload);
      console.log("res:---------createTaskDailyUpdateAPI ", res);

      handleClose();
    } catch (error) {}
  };

  const onCollaboratorSelect = (selectedList) =>
    setCollaboratorSelect(selectedList);

  const onCollaboratorRemove = (selectedList) =>
    setCollaboratorSelect(selectedList);

  const handleInputChange = (e) => e.target.value.replace(/[^0-9]/g, "");

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
                                Author
                              </th>
                              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                Function
                              </th>
                              <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                Status
                              </th>
                              <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                Employed
                              </th>
                              <th class="text-secondary opacity-7"></th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <div class="d-flex px-2 py-1">
                                  <div>
                                    {/* <img src="../assets/img/team-2.jpg" class="avatar avatar-sm me-3" alt="user1"> */}
                                  </div>
                                  <div class="d-flex flex-column justify-content-center">
                                    <h6 class="mb-0 text-sm">John Michael</h6>
                                    <p class="text-xs text-secondary mb-0">
                                      john@creative-tim.com
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <p class="text-xs font-weight-bold mb-0">
                                  Manager
                                </p>
                                <p class="text-xs text-secondary mb-0">
                                  Organization
                                </p>
                              </td>
                              <td class="align-middle text-center text-sm">
                                <span class="badge badge-sm bg-gradient-success">
                                  Online
                                </span>
                              </td>
                              <td class="align-middle text-center">
                                <span class="text-secondary text-xs font-weight-bold">
                                  23/04/18
                                </span>
                              </td>
                              <td class="align-middle">
                                <a
                                  href="javascript:;"
                                  class="text-secondary font-weight-bold text-xs"
                                  data-toggle="tooltip"
                                  data-original-title="Edit user"
                                >
                                  Edit
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div class="d-flex px-2 py-1">
                                  <div>
                                    {/* <img src="../assets/img/team-3.jpg" class="avatar avatar-sm me-3" alt="user2"> */}
                                  </div>
                                  <div class="d-flex flex-column justify-content-center">
                                    <h6 class="mb-0 text-sm">Alexa Liras</h6>
                                    <p class="text-xs text-secondary mb-0">
                                      alexa@creative-tim.com
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <p class="text-xs font-weight-bold mb-0">
                                  Programator
                                </p>
                                <p class="text-xs text-secondary mb-0">
                                  Developer
                                </p>
                              </td>
                              <td class="align-middle text-center text-sm">
                                <span class="badge badge-sm bg-gradient-secondary">
                                  Offline
                                </span>
                              </td>
                              <td class="align-middle text-center">
                                <span class="text-secondary text-xs font-weight-bold">
                                  11/01/19
                                </span>
                              </td>
                              <td class="align-middle">
                                <a
                                  href="javascript:;"
                                  class="text-secondary font-weight-bold text-xs"
                                  data-toggle="tooltip"
                                  data-original-title="Edit user"
                                >
                                  Edit
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div class="d-flex px-2 py-1">
                                  <div>
                                    {/* <img src="../assets/img/team-4.jpg" class="avatar avatar-sm me-3" alt="user3"> */}
                                  </div>
                                  <div class="d-flex flex-column justify-content-center">
                                    <h6 class="mb-0 text-sm">
                                      Laurent Perrier
                                    </h6>
                                    <p class="text-xs text-secondary mb-0">
                                      laurent@creative-tim.com
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <p class="text-xs font-weight-bold mb-0">
                                  Executive
                                </p>
                                <p class="text-xs text-secondary mb-0">
                                  Projects
                                </p>
                              </td>
                              <td class="align-middle text-center text-sm">
                                <span class="badge badge-sm bg-gradient-success">
                                  Online
                                </span>
                              </td>
                              <td class="align-middle text-center">
                                <span class="text-secondary text-xs font-weight-bold">
                                  19/09/17
                                </span>
                              </td>
                              <td class="align-middle">
                                <a
                                  href="javascript:;"
                                  class="text-secondary font-weight-bold text-xs"
                                  data-toggle="tooltip"
                                  data-original-title="Edit user"
                                >
                                  Edit
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div class="d-flex px-2 py-1">
                                  <div>
                                    {/* <img src="../assets/img/team-3.jpg" class="avatar avatar-sm me-3" alt="user4"> */}
                                  </div>
                                  <div class="d-flex flex-column justify-content-center">
                                    <h6 class="mb-0 text-sm">Michael Levi</h6>
                                    <p class="text-xs text-secondary mb-0">
                                      michael@creative-tim.com
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <p class="text-xs font-weight-bold mb-0">
                                  Programator
                                </p>
                                <p class="text-xs text-secondary mb-0">
                                  Developer
                                </p>
                              </td>
                              <td class="align-middle text-center text-sm">
                                <span class="badge badge-sm bg-gradient-success">
                                  Online
                                </span>
                              </td>
                              <td class="align-middle text-center">
                                <span class="text-secondary text-xs font-weight-bold">
                                  24/12/08
                                </span>
                              </td>
                              <td class="align-middle">
                                <a
                                  href="javascript:;"
                                  class="text-secondary font-weight-bold text-xs"
                                  data-toggle="tooltip"
                                  data-original-title="Edit user"
                                >
                                  Edit
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div class="d-flex px-2 py-1">
                                  <div>
                                    {/* <img src="../assets/img/team-2.jpg" class="avatar avatar-sm me-3" alt="user5"> */}
                                  </div>
                                  <div class="d-flex flex-column justify-content-center">
                                    <h6 class="mb-0 text-sm">Richard Gran</h6>
                                    <p class="text-xs text-secondary mb-0">
                                      richard@creative-tim.com
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <p class="text-xs font-weight-bold mb-0">
                                  Manager
                                </p>
                                <p class="text-xs text-secondary mb-0">
                                  Executive
                                </p>
                              </td>
                              <td class="align-middle text-center text-sm">
                                <span class="badge badge-sm bg-gradient-secondary">
                                  Offline
                                </span>
                              </td>
                              <td class="align-middle text-center">
                                <span class="text-secondary text-xs font-weight-bold">
                                  04/10/21
                                </span>
                              </td>
                              <td class="align-middle">
                                <a
                                  href="javascript:;"
                                  class="text-secondary font-weight-bold text-xs"
                                  data-toggle="tooltip"
                                  data-original-title="Edit user"
                                >
                                  Edit
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div class="d-flex px-2 py-1">
                                  <div>
                                    {/* <img src="../assets/img/team-4.jpg" class="avatar avatar-sm me-3" alt="user6"> */}
                                  </div>
                                  <div class="d-flex flex-column justify-content-center">
                                    <h6 class="mb-0 text-sm">Miriam Eric</h6>
                                    <p class="text-xs text-secondary mb-0">
                                      miriam@creative-tim.com
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <p class="text-xs font-weight-bold mb-0">
                                  Programtor
                                </p>
                                <p class="text-xs text-secondary mb-0">
                                  Developer
                                </p>
                              </td>
                              <td class="align-middle text-center text-sm">
                                <span class="badge badge-sm bg-gradient-secondary">
                                  Offline
                                </span>
                              </td>
                              <td class="align-middle text-center">
                                <span class="text-secondary text-xs font-weight-bold">
                                  14/09/20
                                </span>
                              </td>
                              <td class="align-middle">
                                <a
                                  href="javascript:;"
                                  class="text-secondary font-weight-bold text-xs"
                                  data-toggle="tooltip"
                                  data-original-title="Edit user"
                                >
                                  Edit
                                </a>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
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
