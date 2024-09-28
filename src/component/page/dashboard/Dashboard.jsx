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

const Dashboard = () => {
  const {
    register,
    handleSubmit,
    setValue, // To set form field values
  } = useForm();

  const [TaskData, setTaskData] = useState([]);
  const [ticket, setticket] = useState([]);
  const [show, setShow] = useState(false);
  const [currentTask, setCurrentTask] = useState(null); // To store the selected task data

  const handleOpenModal = () => {
    setShow(true);
  };
  const handleCloseModal = () => {
    setShow(false);
  };

  useEffect(() => {
    fetchTicket();
  }, []);

  const fetchTicket = async () => {
    let data = await featctAllTicket();
    let user = await fetchTicketData();
    setTaskData(user);
    setticket(data);
  };

  // Handle modal and set the form values
  const handleModal = (index) => {
    const task = ticket[index]; // Get the selected task
    setCurrentTask(task); // Store the current task data
    setTaskValues(task); // Call function to set values in the form
    handleOpenModal();
  };

  // Function to set form values using setValue
  const [comments, setCommets] = useState();
  const setTaskValues = (task) => {
    console.log("task: ", task);
    if (task?.comments) setCommets(task?.comments);
    setValue("title", task?.title || "");
    setValue("assignedTo", task?.assignedTo?._id || ""); // Set the assignedTo using _id
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
      console.log("data: ", currentTask);
      const payload = {
        createdBy: "66f507dcee8e0ca206195e9d",
        title: data?.title,
        assignedTo: data?.assignedTo, // This will be the _id of the selected option
        priority: data?.priority,
        status: data?.status,
        dueDate: data?.dueDate,
        description: data?.description,
        comments: data?.comment,
        collaborators: data?.collaborator,
      };
      console.log("payload: ", payload);

      const response = await updateTaskAPI(currentTask?._id, payload);
      console.log("response: ", response);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  // Multi-select states and event handlers
  const [collaboratorSelect, setCollaboratorSelect] = useState([]);

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
          <div className="row my-5">
            {ticket?.map((item, index) => (
              <div
                key={index}
                className="col-lg-3 my-2"
                onClick={() => handleModal(index)}
              >
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{item?.title}</h5>
                    <div className="d-flex justify-content-between align-items-center">
                      <p className="card-text text-primary m-0">
                        {item?.priority}
                      </p>
                      <p className="card-text text-warning m-0">
                        {item?.status}
                      </p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="h5 text-danger">
                        {item?.assignedTo?.name}
                      </span>
                      <span className="h6 text-primary">
                        {new Date(item?.dueDate).toLocaleDateString("en-IN")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
                          {option.name} {/* Display name */}
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
                  {/* Comments Section - separate from the modal */}
                  <div className="comments-section">
                    <h6>Comments</h6>
                    {comments && comments.length > 0 ? (
                      <ul className="list-group">
                        {comments.map((comment) => (
                          <li key={comment._id} className="list-group-item">
                            <strong>{comment.createdBy.name}</strong>:{" "}
                            {comment.text}
                            <span className="text-muted">
                              {" "}
                              - {new Date(comment.createdAt).toLocaleString()}
                            </span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>No comments yet</p>
                    )}
                  </div>

                  {/* Comment Textarea */}
                  <div className="form-group">
                    <label htmlFor="comment">Comment</label>
                    <textarea
                      className="form-control"
                      id="comment"
                      rows="3"
                      {...register("comment")}
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
        </div>
      </main>
    </React.Fragment>
  );
};

export default Dashboard;
