import React, { useEffect, useState } from "react";
import Navbar from "../../common/navbar/Navbar";
import {
  featctAllTicket,
  fetchTicketData,
  getAllTasksCountAPI,
  // getTaskByStatusAndIdAPI,
  // updateTaskAPI,
} from "../../common/Api/api";
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
  const [tasks, setTasks] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  
  const [TaskData, setTaskData] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false); // To toggle dropdown visibility
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
  }
  

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

  // const resetTaskFilter = () => setTasks(allTasks);

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
