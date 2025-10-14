import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./SignUp.jsx";
import Login from "./Login.jsx";
import TaskManager from "./TaskManager.jsx";
import "bootstrap/dist/css/bootstrap.min.css";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<TaskManager />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
