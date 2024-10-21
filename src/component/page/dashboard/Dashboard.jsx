import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../common/navbar/Navbar";
import { toast } from "react-toastify";
import {
  featctAllTicket,
  fetchTicketData,
  getAllTasksCountAPI,
  getTaskByStatusAndIdAPI,
  updateTaskAPI,
} from "../../common/Api/api";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import Multiselect from "multiselect-react-dropdown";
import Sidebar from "../../common/sidebar/Sidebar";
import { toastError, toastSuccess } from "../../../servers/toastr.service";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// Task Card Component
const TaskCard = ({ task, index, onClick }) => {
  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="my-2"
          onClick={onClick}
        >
          <div className="card task-card">
            <div className="card-body">
              <span className="card-text">Task No.{task?.ticketNo}</span>
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
      )}
    </Draggable>
  );
};

// Task Board with Drag-and-Drop
const AsanaStyleBoard = ({ tasks, handleModal, onDragEnd }) => {
  const getStatusTasks = (status) =>
    tasks.filter((task) => task.status === status);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="">
        <div className="row">
          {/* Open Tickets */}
          <div className="col-lg-3">
            <h5 className="text-uppercase text-secondary">Open</h5>
            <div className=" fiexd-h overflow-y-auto">
              <Droppable droppableId="open">
                {(provided) => (
                  <div
                    className="task-column task-column-overflow overflow-auto fiexd-h "
                    ref={provided?.innerRef}
                    {...provided?.droppableProps}
                  >
                    {getStatusTasks("open").length === 0 && (
                      <div style={{ minHeight: "50px" }}>No tasks</div>
                    )}
                    {getStatusTasks("open").map((task, index) => (
                      <TaskCard
                        key={task._id}
                        task={task}
                        index={index}
                        onClick={() => handleModal(task)}
                      />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </div>

          {/* In-Progress Tickets */}
          <div className="col-lg-3">
            <h5 className="text-uppercase text-secondary">In-Progress</h5>
            <div className=" fiexd-h overflow-y-auto">
              <Droppable droppableId="in-progress">
                {(provided) => {
                  return (
                    <div
                      className="task-column task-column-overflow overflow-auto fiexd-h"
                      ref={provided?.innerRef}
                      {...provided?.droppableProps}
                    >
                      {getStatusTasks("in-progress").length === 0 && (
                        <div style={{ minHeight: "50px" }}>No tasks</div>
                      )}
                      {getStatusTasks("in-progress").map((task, index) => (
                        <TaskCard
                          key={task._id}
                          task={task}
                          index={index}
                          onClick={() => handleModal(task)}
                        />
                      ))}
                      {provided.placeholder}
                    </div>
                  );
                }}
              </Droppable>
            </div>
          </div>

          {/* Completed Tickets */}
          <div className="col-lg-3">
            <h5 className="text-uppercase text-secondary">Completed</h5>
            <div className=" fiexd-h overflow-y-auto">
              <Droppable droppableId="completed">
                {(provided) => (
                  <div
                    className="task-column task-column-overflow overflow-auto fiexd-h"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {getStatusTasks("completed").length === 0 && (
                      <div style={{ minHeight: "50px" }}>No tasks</div>
                    )}
                    {getStatusTasks("completed").map((task, index) => (
                      <TaskCard
                        key={task._id}
                        task={task}
                        index={index}
                        onClick={() => handleModal(task)}
                      />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </div>

          {/* Done Tickets */}
          <div className="col-lg-3">
            <h5 className="text-uppercase text-secondary">Done</h5>
            <div className=" fiexd-h overflow-y-auto">
              <Droppable droppableId="done">
                {(provided) => (
                  <div
                    className="task-column task-column-overflow overflow-auto fiexd-h"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {getStatusTasks("done").length === 0 && (
                      <div style={{ minHeight: "50px" }}>No tasks</div>
                    )}
                    {getStatusTasks("done").map((task, index) => (
                      <TaskCard
                        key={task._id}
                        task={task}
                        index={index}
                        onClick={() => handleModal(task)}
                      />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </div>
        </div>
      </div>
    </DragDropContext>
  );
};

// Main Dashboard Component
const Dashboard = () => {
  const { register, handleSubmit, setValue } = useForm();
  const [tasks, setTasks] = useState([]);
  const [allTasks, setAllTasks] = useState([]);

  const [show, setShow] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [TaskData, setTaskData] = useState([]);

  useEffect(() => {
    fetchTicket();
  }, []);

  const fetchTicket = async () => {
    const data = await featctAllTicket();
    const user = await fetchTicketData();
    setTasks(data);
    setAllTasks(data);
    setTaskData(user);
  };

  const handleCloseModal = () => setShow(false);

  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const updatedTasks = tasks.map((task) =>
        task._id === result.draggableId
          ? { ...task, status: destination.droppableId }
          : task
      );
      setTasks(updatedTasks);
      try {
        const updatedTask = tasks.find(
          (task) => task._id === result.draggableId
        );
        await updateTaskAPI(updatedTask._id, {
          status: destination.droppableId,
        });
        toastSuccess("Task status updated successfully!");
      } catch (error) {
        toast.error("Error updating task status");
      }
    }
  };

  const [ticket, setticket] = useState([]);
  const [comments, setComments] = useState();
  const [taskTicketNo, settaskTicketNo] = useState();
  const [collaboratorSelect, setCollaboratorSelect] = useState([]);

  const handleOpenModal = () => setShow(true);

  // Handle modal and set the form values
  const handleModal = (index) => {
    //
    setCurrentTask(index);
    setTaskValues(index);
    handleOpenModal();
  };

  // Set form values using setValue
  const setTaskValues = (task) => {
    if (task?.comments) setComments(task?.comments);
    settaskTicketNo(task?.ticketNo);
    setValue("title", task?.title || "");
    setValue("assignedTo", task?.assignedTo?._id || "");
    setValue("assignedTo", task?.assignedTo?._id || "");
    setValue("priority", task?.priority || "medium");
    setValue("status", task?.status || "open");
    setValue("comment", task?.comment || "");
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

      if (response?.success) {
        toastSuccess();
        fetchTicket();
        handleCloseModal();
      }
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

  /**
   *  Reference to the div you want to copy
   * */
  const divRef = React.useRef(null);

  const copyDivToClipboard = () => {
    if (divRef.current) {
      const range = document.createRange();
      range.selectNode(divRef.current);
      window.getSelection().removeAllRanges(); // Clear current selection
      window.getSelection().addRange(range); // Select the text
      document.execCommand("copy"); // Copy the selected text to clipboard
      window.getSelection().removeAllRanges(); // Deselect
      toast.success("Copied!"); // Display a success message
    }
  };

  const [getAllTasksCount, setGetAllTasksCount] = useState();

  React.useEffect(() => {
    new Promise(async (resolve, reject) => {
      const res = await getAllTasksCountAPI();

      setGetAllTasksCount(res);
      resolve(1);
    });
  }, []);

  const CARDDATA = [
    {
      title: "Total Tasks",
      value: getAllTasksCount?.totalTasks,
      // percentage: "+55%",
      icon: "ni ni-money-coins",
      iconColor: "bg-gradient-primary",
      percentageColor: "text-success",
    },
    {
      title: "In progress Tasks",
      value: getAllTasksCount?.inCompeleteTask,
      // percentage: "+3%",
      icon: "ni ni-world",
      iconColor: "bg-gradient-primary",
      percentageColor: "text-success",
    },
    {
      title: "Completed Tasks",
      value: getAllTasksCount?.compeletedTask,
      // percentage: "+3%",
      icon: "ni ni-world",
      iconColor: "bg-gradient-primary",
      percentageColor: "text-success",
    },
    {
      title: "Panding Tasks",
      value: getAllTasksCount?.pandingTask,
      // percentage: "+3%",
      icon: "ni ni-world",
      iconColor: "bg-gradient-primary",
      percentageColor: "text-success",
    },
  ];

  const [dropdownOpen, setDropdownOpen] = useState(false); // To toggle dropdown visibility
  const [selectedAssignee, setSelectedAssignee] = useState(""); // To store the selected value
  const [selectedStatus, setSelectedStatus] = useState(""); // To store the selected value
  const dropdownRef = React.useRef(null); // Reference to the dropdown
  const buttonRef = React.useRef(null); // Reference to the toggle button

  // Toggle dropdown visibility
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  // Handle selection from dropdown
  const handleSelectChangeAssignee = (e) => {
    setSelectedAssignee(e.target.value);
  };

  const handleSelectChangeStatus = (e) => {
    setSelectedStatus(e.target.value);
  };

  const handleFilterTask = async () => {
    try {
      const payload = {
        assignedTo: selectedAssignee,
        status: selectedStatus,
      };

      const res = await getTaskByStatusAndIdAPI(payload);
      if (res.success) {
        if (res?.tasks?.length) setTasks(res?.tasks);
        if (!res?.tasks?.length) toastError("No Task Found");
      }
    } catch (error) {}
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      // Close dropdown if click happens outside the dropdown and button
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [dropdownOpen]);

  const resetTaskFilter = () => setTasks(allTasks);

  return (
    <React.Fragment>
      <Sidebar />
      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
        <Navbar fetchTicket={fetchTicket} />
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
          <div className="mt-3 w-100">
            {/* filter modal */}
            <div className=" mt-5  w-100 d-flex justify-content-end">
              <button
                className="btn btn-primary"
                onClick={toggleDropdown}
                ref={buttonRef}
              >
                Filter Task
              </button>

              {dropdownOpen && (
                <div
                  className="dropdown-menu p-4 show mt-6 w-25"
                  ref={dropdownRef}
                >
                  <div className="mb-3">
                    <label htmlFor="assginee">Assignee</label>
                    <select
                      className="form-select"
                      onChange={handleSelectChangeAssignee}
                      value={selectedAssignee}
                    >
                      {TaskData?.map((option, index) => (
                        <option key={index} value={option._id}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <label htmlFor="assginee">Status</label>
                  <div className="d-flex justify-content-between">
                    <select
                      className="form-control"
                      onChange={handleSelectChangeStatus}
                      value={selectedStatus}
                    >
                      <option value="">Select Status</option>
                      <option value="open">open</option>
                      <option value="pending">pending</option>
                      <option value="in-progress">in-progress</option>
                      <option value="testing">testing</option>
                      <option value="completed">completed</option>
                    </select>
                  </div>
                  <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-primary mt-3"
                      onClick={handleFilterTask}
                    >
                      Filter
                    </button>
                    <button
                      className="btn btn-primary mt-3"
                      onClick={resetTaskFilter}
                    >
                      Reset
                    </button>
                  </div>
                </div>
              )}
            </div>
            {/* filter modal end */}
          </div>
          <div className="my-1">
            <AsanaStyleBoard
              tasks={tasks}
              handleModal={handleModal}
              onDragEnd={onDragEnd}
            />
          </div>
          {/* Task Modal */}
          <div className="row my-5">
            <Modal
              size="lg"
              show={show}
              onHide={handleCloseModal}
              aria-labelledby="example-modal-sizes-title-sm"
            >
              <Modal.Header>
                <Modal.Title id="example-modal-sizes-title-sm">
                  {currentTask ? "Edit Task" : "Add Task"}
                </Modal.Title>
                <div className="ms-auto d-flex align-items-center border border-black rounded-pill">
                  <div ref={divRef} className="mx-2 my-0 h6">
                    {taskTicketNo}
                  </div>
                  <button
                    onClick={copyDivToClipboard}
                    className="rounded-pill px-3 pb-1 pt-1 bg-gradient-primary text-white border border-none"
                  >
                    Copy
                  </button>
                </div>
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

                  <button type="submit" className="btn btn-primary mt-3">
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
