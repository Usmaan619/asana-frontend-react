import React from "react";

import "./App.css";
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
import "./assets/css/soft-ui-dashboard.css?v=1.0.7";
import AuthRoutes from "./routes/AuthRoutes";
import { UserProvider } from "./Context/UserContext";

function App() {
  return (
    <div className="App">
    <UserProvider>
        <AuthRoutes />
    </UserProvider>
  </div>
  );
}

export default App;
