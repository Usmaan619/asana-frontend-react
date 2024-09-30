import React, { useEffect, useState } from "react";
import Navbar from "../../common/navbar/Navbar";
import {
  featctAllTicket,
  fetchTicketData,
  updateTaskAPI,
} from "../../common/Api/api";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import Multiselect from "multiselect-react-dropdown";
import { CARDDATA } from "../../../constant/constant";
// import "/home/skill/asana-frontend/src/component/page/dashboard/test.css";
import "../dashboard/test.css"

const TaskCard = ({ task, onClick }) => {
  return (
    <div className="my-2" onClick={onClick}>
      <div className="card task-card">
        <div className="card-body">
          <span className="card-text ">Task No.{task?.ticketNo}</span>

          <div className="d-flex">
            <h6 className="card-title">{task.title}</h6>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <p className="card-text text-primary m-0">{task.priority}</p>
            <p className="card-text text-warning m-0">{task.status}</p>
          </div>
          <div className="d-flex justify-content-between align-items-center mt-2">
            <span className="h5 text-danger">{task.assignedTo?.name}</span>
            <span className="h6 text-primary">
              {new Date(task.dueDate).toLocaleDateString("en-IN")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const AsanaStyleBoard = ({ tasks, handleModal }) => {
  const getStatusTasks = (status) =>
    tasks.filter((task) => task.status === status);

  return (
    <div className="asana-board container">
      <div className="row">
        {/* Open Tickets */}
        <div className="col-lg-3">
          <h5 className="text-uppercase text-secondary">Open</h5>
          <div className="task-column">
            {getStatusTasks("open").map((task, index) => {
              return (
                <TaskCard
                  key={task._id}
                  task={task}
                  onClick={() => handleModal(task)}
                />
              );
            })}
          </div>
        </div>

        {/* In-Progress Tickets */}
        <div className="col-lg-3">
          <h5 className="text-uppercase text-secondary">In-Progress</h5>
          <div className="task-column">
            {getStatusTasks("in-progress").map((task, index) => {
              return (
                <TaskCard
                  key={task._id}
                  task={task}
                  onClick={() => handleModal(task)}
                />
              );
            })}
          </div>
        </div>

        {/* Completed Tickets */}
        <div className="col-lg-3">
          <h5 className="text-uppercase text-secondary">Completed</h5>
          <div className="task-column">
            {getStatusTasks("completed").map((task, index) => {
              return (
                <TaskCard
                  key={task._id}
                  task={task}
                  onClick={() => handleModal(task)}
                />
              );
            })}
          </div>
        </div>
        {/* Done Tickets */}
        <div className="col-lg-3">
          <h5 className="text-uppercase text-secondary">Done</h5>
          <div className="task-column">
            {getStatusTasks("done").map((task, index) => (
              <TaskCard
                key={task._id}
                task={task}
                onClick={() => handleModal(task)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const { register, handleSubmit, setValue } = useForm();

  const [TaskData, setTaskData] = useState([]);

  const [ticket, setticket] = useState([]);
  const [show, setShow] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [comments, setComments] = useState();
  const [collaboratorSelect, setCollaboratorSelect] = useState([]);

  const handleOpenModal = () => setShow(true);

  const handleCloseModal = () => setShow(false);

  useEffect(() => {
    fetchTicket();
  }, []);

  const fetchTicket = async () => {
    const data = await featctAllTicket();
    const user = await fetchTicketData();
    setTaskData(user);
    setticket(data);
  };

  // Handle modal and set the form values
  const handleModal = (index) => {
    setCurrentTask(index);
    setTaskValues(index);
    handleOpenModal();
  };

  // Set form values using setValue
  const setTaskValues = (task) => {
    if (task?.comments) setComments(task?.comments);
    setValue("title", task?.title || "");
    setValue("assignedTo", task?.assignedTo?._id || "");
    setValue("priority", task?.priority || "medium");
    setValue("status", task?.status || "open");
    setValue(
      "dueDate",
      task?.dueDate ? new Date(task?.dueDate).toISOString().split("T")[0] : ""
    );
    setValue("description", task?.description || "");
    setCollaboratorSelect(task?.collaborators || []);
  };

  const onSubmit = async (data) => {
    try {
      const payload = {
        title: data?.title,
        assignedTo: data?.assignedTo,
        priority: data?.priority,
        status: data?.status,
        dueDate: data?.dueDate,
        description: data?.description,
        comments: data?.comment,
        collaborators: data?.collaborator,
      };

      const response = await updateTaskAPI(currentTask?._id, payload);

      if (response?.success) fetchTicket();
    } catch (error) {}
  };

  // Multi-select event handlers
  const onCollaboratorSelect = (selectedList) => {
    setCollaboratorSelect(selectedList);
    setValue("collaborator", selectedList);
  };

  const onCollaboratorRemove = (selectedList) => {
    setCollaboratorSelect(selectedList);
    setValue("collaborator", selectedList);
  };

  return (
    <React.Fragment>
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
          </div>

          {/* Task Board */}
          <div className="row my-5">
            <AsanaStyleBoard tasks={ticket} handleModal={handleModal} />

            {/* Task Modal */}
            <Modal
              size="lg"
              show={show}
              onHide={handleCloseModal}
              aria-labelledby="example-modal-sizes-title-sm"
            >
              <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-sm">
                  {currentTask ? "Edit Task" : "Add Task"}
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
                    <label htmlFor="assginee">Assignee</label>
                    <select
                      className="form-control"
                      id="assginee"
                      {...register("assignedTo")}
                    >
                      {TaskData?.map((option, index) => (
                        <option key={index} value={option._id}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Priority Dropdown */}
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

                  {/* Due Date */}
                  <div className="form-group">
                    <label htmlFor="dueDate">Due Date</label>
                    <input
                      type="date"
                      className="form-control"
                      id="dueDate"
                      {...register("dueDate")}
                    />
                  </div>

                  {/* Description */}
                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                      className="form-control"
                      id="description"
                      rows="4"
                      {...register("description")}
                    ></textarea>
                  </div>

                  {/* Collaborators */}
                  <div className="form-group">
                    <label>Collaborator</label>
                    <Multiselect
                      options={TaskData}
                      selectedValues={collaboratorSelect}
                      displayValue="name"
                      onSelect={onCollaboratorSelect}
                      onRemove={onCollaboratorRemove}
                    />
                  </div>

                  {/* Comments */}
                  {comments?.map((comment, index) => (
                    <div key={index}>
                      <h6>
                        {comment.createdBy?.name} at{" "}
                        {new Date(comment.createdAt).toLocaleDateString(
                          "en-IN"
                        )}
                      </h6>
                      <p>{comment.text}</p>
                    </div>
                  ))}

                  <div className="form-group">
                    <label htmlFor="comment">Add Comment</label>
                    <input
                      type="text"
                      className="form-control"
                      id="comment"
                      placeholder="Add comment"
                      {...register("comment")}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary mt-3"
                    onClick={handleCloseModal}
                  >
                    Submit
                  </button>
                </form>
              </Modal.Body>
            </Modal>
          </div>
        </div>
      </main>
    </React.Fragment>
  );
};

export default Dashboard;
