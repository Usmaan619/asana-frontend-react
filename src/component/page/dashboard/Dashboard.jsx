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
import { Controller, useForm } from "react-hook-form";
import Multiselect from "multiselect-react-dropdown";
import Sidebar from "../../common/sidebar/Sidebar";
import { toastError, toastSuccess } from "../../../servers/toastr.service";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ReactQuill from "react-quill";
import { quillFormats, quillModules } from "../../../constant/constant";
import {
  getFirstAndLastLatterOfName,
  NOTIFICATION,
} from "../../../utils/helper";
import LineChart from "../../common/Charts/LineChart";
import DoughnutChart from "../../common/Charts/PieChart";

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
                <h6 className="card-title text-capitalize">{task.title}</h6>
              </div>
              <div className="d-flex justify-content-between align-items-center text-capitalize">
                <p className="card-text text-warning m-0">{task.priority}</p>
                <p className="card-text text-info m-0">{task.status}</p>
              </div>
              <div className="d-flex justify-content-between align-items-center mt-2">
                <span className="h5 text-danger text-uppercase">
                  {getFirstAndLastLatterOfName(task.assignedTo?.name)}
                </span>
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
      <div className="mx-100">
        <div className="d-flex gap-4 overflow-auto ">
          {/* Open Tickets */}
          <div className="col-lg-3">
            <h5 className="text-uppercase text-dark fw-bolder">Open</h5>
            <div className="fiexd-h overflow-y-auto">
              <Droppable droppableId="open">
                {(provided) => (
                  <div
                    className="task-column task-column-overflow overflow-auto fiexd-h"
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
            <h5 className="text-uppercase text-dark fw-bolder">In-Progress</h5>
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
            <h5 className="text-uppercase text-dark fw-bolder">Completed</h5>
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
            <h5 className="text-uppercase text-dark fw-bolder">Pending</h5>
            <div className=" fiexd-h overflow-y-auto">
              <Droppable droppableId="pending">
                {(provided) => (
                  <div
                    className="task-column task-column-overflow overflow-auto fiexd-h"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {getStatusTasks("pending").length === 0 && (
                      <div style={{ minHeight: "50px" }}>No tasks</div>
                    )}
                    {getStatusTasks("pending").map((task, index) => (
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
            <h5 className="text-uppercase text-dark fw-bolder">Testing</h5>
            <div className=" fiexd-h overflow-y-auto">
              <Droppable droppableId="testing">
                {(provided) => (
                  <div
                    className="task-column task-column-overflow overflow-auto fiexd-h"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {getStatusTasks("testing").length === 0 && (
                      <div style={{ minHeight: "50px" }}>No tasks</div>
                    )}
                    {getStatusTasks("testing").map((task, index) => (
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
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm();
  const [tasks, setTasks] = useState([]);
  const [allTasks, setAllTasks] = useState([]);

  const [show, setShow] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [TaskData, setTaskData] = useState([]);

  const [ticket, setticket] = useState([]);
  const [comments, setComments] = useState();
  const [taskTicketNo, settaskTicketNo] = useState();
  const [collaboratorSelect, setCollaboratorSelect] = useState([]);

  const [dropdownOpen, setDropdownOpen] = useState(false); // To toggle dropdown visibility
  const [selectedAssignee, setSelectedAssignee] = useState(""); // To store the selected value
  const [selectedAssigneeDate, setSelectedAssigneeDate] = useState(); // To store the selected value
  const [selectedAssigneeTicketNo, setSelectedAssigneeTicketNo] = useState(); // To store the selected value
  const [selectedStatus, setSelectedStatus] = useState(""); // To store the selected value
  const dropdownRef = React.useRef(null); // Reference to the dropdown
  const buttonRef = React.useRef(null); // Reference to the toggle button

  useEffect(() => {
    fetchTicket();
  }, []);

  const fetchTicket = async () => {
    try {
      const data = await featctAllTicket();
      const user = await fetchTicketData();

      setTasks(data);
      setAllTasks(data);
      setTaskData(user);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    const intervalCall = setInterval(() => {
      getTask();
    }, 10000);

    return () => {
      clearInterval(intervalCall);
    };
  }, []);

  const getTask = async () => {
    try {
      await featctAllTicket();
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const handleCloseModal = () => setShow(false);

  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const updatedTasks = tasks.map((task) =>
        task._id === result?.draggableId
          ? { ...task, status: destination?.droppableId }
          : task
      );
      setTasks(updatedTasks);
      try {
        const updatedTask = tasks.find(
          (task) => task?._id === result?.draggableId
        );
        const res = await updateTaskAPI(updatedTask._id, {
          status: destination?.droppableId,
        });

        if (res?.success) {
          await statusCount();
        }
        console.log("res:updateTaskAPI ", res);
        toastSuccess("Task status updated successfully!");
      } catch (error) {
        toast.error("Error updating task status");
      }
    }
  };

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
    } catch (error) {
      console.log("error: ", error);
    }
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
  console.log("getAllTasksCount: ", getAllTasksCount);

  React.useEffect(() => {
    statusCount();

    const intervalCall = setInterval(() => {
      statusCount();
    }, 20000);

    return () => {
      clearInterval(intervalCall);
    };
  }, []);

  const statusCount = async () => {
    try {
      setGetAllTasksCount(await getAllTasksCountAPI());
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const CARDDATA = [
    {
      title: "Total Tasks",
      value: getAllTasksCount?.totalTasks,
      data: [0, getAllTasksCount?.totalTasks],
      // percentage: "+55%",
      icon: "ni ni-money-coins",
      iconColor: "bg-gradient-primary",
      percentageColor: "text-success",
    },
    {
      title: "Open ",
      value: getAllTasksCount?.openTask,
      // percentage: "+3%",
      icon: "ni ni-world",
      iconColor: "bg-gradient-primary",
      percentageColor: "text-success",
    },
    {
      title: "In progress ",
      value: getAllTasksCount?.inCompeleteTask,
      // percentage: "+3%",
      icon: "ni ni-world",
      iconColor: "bg-gradient-primary",
      percentageColor: "text-success",
    },
    {
      title: "Completed ",
      value: getAllTasksCount?.compeletedTask,
      data: [0, getAllTasksCount?.compeletedTask],
      // percentage: "+3%",
      icon: "ni ni-world",
      iconColor: "bg-gradient-primary",
      percentageColor: "text-success",
    },
    {
      title: "Pending ",
      value: getAllTasksCount?.pandingTask,
      // percentage: "+3%",
      icon: "ni ni-world",
      iconColor: "bg-gradient-primary",
      percentageColor: "text-success",
    },
    {
      title: "Testing",
      value: getAllTasksCount?.testingTask,
      // percentage: "+3%",
      icon: "ni ni-world",
      iconColor: "bg-gradient-primary",
      percentageColor: "text-success",
    },
  ];

  // Toggle dropdown visibility
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  // Handle selection from dropdown
  const handleSelectChangeAssignee = (e) => setSelectedAssignee(e.target.value);

  const handleSelectChangeStatus = (e) => setSelectedStatus(e.target.value);

  const handleSelectChangeDate = (e) => setSelectedAssigneeDate(e.target.value);

  const handleSelectChangeTicketNo = (e) =>
    setSelectedAssigneeTicketNo(e.target.value);

  const handleFilterTask = async () => {
    try {
      const payload = {
        assignedTo: selectedAssignee,
        status: selectedStatus,
        createdAtDate: selectedAssigneeDate,
        ticketNo: selectedAssigneeTicketNo,
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
      <Sidebar NOTIFICATION={getAllTasksCount} />
      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
        <Navbar fetchTicket={fetchTicket} />
        <div className="container-fluid py-4">
          <div className="row">
            {CARDDATA?.map((card, index) => (
              <div className="col-xl-2 col-sm-6 mb-xl-0 mb-4" key={index}>
                <div className="card">
                  <div className="card-body py-2 px-4">
                    <div className="row">
                      <div className="col-8">
                        <div className="numbers text-center">
                          <p className="text-sm mb-0 text-capitalize font-weight-bold">
                            {card?.title}
                          </p>
                          <h5 className="font-weight-bolder mb-0">
                            {card?.value || 0}
                            <span
                              className={`${card?.percentageColor} text-sm font-weight-bolder`}
                            >
                              {card?.percentage}
                            </span>
                          </h5>
                        </div>
                      </div>
                      <div className="col-4 text-end">
                        <div
                          className={`icon icon-shape ${card?.iconColor} shadow text-center border-radius-md`}
                        >
                          <i
                            className={`${card?.icon} text-lg opacity-10`}
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
          {/* Charts */}
          <div className="container">
            <div className="row">
              <div className="col-lg-6 py-4">
                <LineChart ChartData={getAllTasksCount} />
              </div>
              <div className="col-lg-6 py-4">
                <DoughnutChart ChartData={getAllTasksCount} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </React.Fragment>
  );
};

export default Dashboard;
