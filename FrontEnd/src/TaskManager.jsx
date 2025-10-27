import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import image from "./assets/task1.jpg";
import { useNavigate } from "react-router-dom";

const styles = {
  navbar: {
    position: "absolute",
    top: "20px",
    right: "30px",
    zIndex: 1000,
  },
  logoutButton: {
    backgroundColor: "#e63946",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
    transition: "0.3s ease",
  },
};

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;
    axios
      .get("http://localhost:4000/task/get", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setTasks(res.data))
      .catch((err) => console.error(err));
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:4000/task/add",
        { task: taskInput },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTaskInput("");

      const updated = await axios.get("http://localhost:4000/task/get", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(updated.data);
    } catch (err) {
      console.error(err);
    }
  };

  const toggleComplete = async (id) => {
    try {
      await axios.put(
        `http://localhost:4000/task/update/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks((prev) =>
        prev.map((t) => (t._id === id ? { ...t, Done: !t.Done } : t))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged out successfully");
    navigate("/login");
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/task/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url(${image})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* ✅ Logout Button */}
      <div style={styles.navbar}>
        <button style={styles.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="container mt-5" style={{ maxWidth: "600px" }}>
        <h2 className="text-center text-primary mb-4">Task Manager</h2>

        <form onSubmit={handleSubmit} className="d-flex mb-3">
          <input
            type="text"
            className="form-control me-2"
            placeholder="Enter new task"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            required
          />
          <button className="btn btn-success" type="submit">
            Add
          </button>
        </form>

        <ul className="list-group">
          {tasks.length === 0 ? (
            <p className="text-center text-muted">No tasks found</p>
          ) : (
            tasks.map((task) => (
              <li
                key={task._id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <input
                    type="checkbox"
                    className="form-check-input me-2"
                    checked={task.Done}
                    onChange={() => toggleComplete(task._id)}
                  />
                  <span
                    style={{
                      textDecoration: task.Done ? "line-through" : "none",
                    }}
                  >
                    {task.task}
                  </span>
                </div>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteTask(task._id)}
                >
                  Delete
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default TaskManager;
