import React, { useEffect, useState } from "react";
import {
  getAllNotificationsAPI,
  updateAllNotificationsAPI,
} from "../../common/Api/api";

import "../../page/notification/notify.css";
import Sidebar from "../../common/sidebar/Sidebar";
import Navbar from "../../common/navbar/Navbar";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [dailyTask, setDailyTask] = useState([]);
  const [offset, setOffset] = useState(0);
  const [limit] = useState(9);
  const [total, setTotal] = useState(0);
  // const itemsPerPage = 10;
  // Fetch notifications
  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const { data, pagination } = await getAllNotificationsAPI(
        false,
        limit,
        offset
      );
      setNotifications(data || []);
      console.log('data: ', data);
      setTotal(pagination.total);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [offset]);


  const handleNext = () => {
    if (offset + limit < total) {
      setOffset(offset + limit);
    }
  };

  const handlePrevious = () => {
    if (offset > 0) {
      setOffset(offset - limit);
    }
  };
  const readNotification = async (n) => {
    try {
      const res = await updateAllNotificationsAPI({ _id: n?._id });
      if (res?.success) {
        fetchNotifications();
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
    }
  };

  const totalPages = Math.ceil(total / limit);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => {
    setOffset((pageNumber - 1) * limit);
  };
  return (
    <>
      <Sidebar />

      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
        <Navbar />
        {/* <div className="container-fluid"> */}
        {/* <div className="row"> */}
        <div className="container-fluid">
          <div className="">
            <div className="d-flex gap-4 align-items-end justify-content-end">
              {/* <h2 className="">NOTIFICATIONS</h2> */}
              <div className="d-flex flex-column mb-3">
                <label htmlFor="startDate" className="">
                  Start Date
                </label>
                <input
                  type="date"
                  id="startDate"
                  className="form-control shadow"
                />
              </div>
              <button
                className="btn btn-primary"
              >
                Filter
              </button>
              <button
                className="btn btn-secondary"
              >
                Reset
              </button>
            </div>
            {loading ? (
              <p className="loading">Loading...</p>
            ) : notifications?.length === 0 ? (
              <p className="no-notifications">No notifications found.</p>
            ) : (
              <ul className="notifications-list row gap-3 d-flex justify-content-evenly">
                {notifications?.map((notification) => (
                  <li key={notification?._id} className="notification-item col-lg-3 shadow">
                    <div className="notification-content">
                      <div className="d-flex justify-content-between align-item-center mb-1">
                        <strong className="text-uppercase">
                          {notification?.userId?.name || "Unknown User"}
                        </strong>

                        <button
                          disabled={notification?.seen}
                          onClick={() => {
                            readNotification(notification);
                          }}
                          className={`btn ${notification?.seen
                            ? "btn-secondary"
                            : "btn-primary"
                            }  m-0 w-auto px-2 py-1 `}
                          // btn-secondary
                          type="button"
                        >
                          {notification?.seen ? "Read" : "Un-Read"}
                        </button>
                      </div>
                      <hr className="my-2 border-primary border" />
                      <p>{notification?.message}</p>
                      <small>
                        {new Date(notification?.createdAt).toLocaleString()}
                      </small>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <div className="pagination-controls mt-2">
              <button className="btn" onClick={handlePrevious} disabled={offset === 0}>
                Previous
              </button>
              <nav aria-label="Page navigation" className="m-auto">
                <ul className="pagination justify-centent-center">
                  {pageNumbers?.map((number) => (
                    <li key={number} className="page-item mx-1">
                      <a 
                        onClick={() => paginate(number)}
                        className="page-link"
                      >
                        {number}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              <button
              className="btn"
                onClick={handleNext}
                disabled={offset + limit >= total}
              >
                Next
              </button>
            </div>
          </div>
        </div>
        {/* </div> */}

        {/* </div> */}
      </main>
    </>
  );
};

export default Notifications;
