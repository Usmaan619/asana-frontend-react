import React, { useEffect, useState } from "react";
import { getAllNotificationsAPI } from "../../common/Api/api";

import "../../page/notification/notify.css";
import Sidebar from "../../common/sidebar/Sidebar";
import Navbar from "../../common/navbar/Navbar";

// const Notifications = () => {
//   const [notifications, setNotifications] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchNotifications = async () => {
//     try {
//       setLoading(true);

//       const response = await getAllNotificationsAPI(false, 10, 0);
//       setNotifications(response?.data);
//     } catch (error) {
//       console.error("Error fetching notifications:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchNotifications();
//   }, []);

//   return (
//     <div>
//       <h1>Notifications</h1>
//       {loading ? (
//         <p>Loading...</p>
//       ) : notifications?.length === 0 ? (
//         <p>No notifications available.</p>
//       ) : (
//         <ul>
//           {notifications?.map((notification) => (
//             <li key={notification._id}>
//               <p>
//                 <strong>{notification?.userId?.name}</strong>:{" "}
//                 {notification?.message}
//               </p>
//               <p>
//                 <small>
//                   {new Date(notification?.createdAt).toLocaleString()}
//                 </small>
//               </p>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default Notifications;

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);

  // Fetch notifications
  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const { data, pagination } = await getAllNotificationsAPI(
        false,
        limit,
        offset
      );
      setNotifications(data);
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

  return (
    <>
      <Sidebar />

      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
        <Navbar />
        <div className="container-fluid py-4">
          <div className="row">
            <div className="container-fluid py-4 ">
              <div className="notifications-container">
                <h2>Notifications</h2>
                {loading ? (
                  <p className="loading">Loading...</p>
                ) : notifications.length === 0 ? (
                  <p className="no-notifications">No notifications found.</p>
                ) : (
                  <ul className="notifications-list">
                    {notifications.map((notification) => (
                      <li key={notification._id} className="notification-item">
                        <div className="notification-content">
                          <strong>
                            {notification.userId?.name || "Unknown User"}
                          </strong>
                          <p>{notification.message}</p>
                          <small>
                            {new Date(notification.createdAt).toLocaleString()}
                          </small>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="pagination-controls">
                  <button onClick={handlePrevious} disabled={offset === 0}>
                    Previous
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={offset + limit >= total}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Notifications;
