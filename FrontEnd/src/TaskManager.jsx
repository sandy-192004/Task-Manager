import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import image from "./assets/task1.jpg"


const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const token = localStorage.getItem("token");


  useEffect(() => {
    if (!token) return;
    axios.get("http://localhost:4000/task/get", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setTasks(res.data))
      .catch((err) => console.error(err));
  }, [token]);

  // Add new task
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:4000/task/add",
        { task: taskInput },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTaskInput("");
      // fetch all task again
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
      const res = await axios.put(
        `http://localhost:4000/task/update/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks((prev) =>
        prev.map((t) =>
          t._id === id ? { ...t, Done: !t.Done } : t
        )
      );
    } catch (err) {
      console.error(err);
    }
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
    <div  className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
      style={{  backgroundImage: `url(${image})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "100vh",       
        width: "100vw",        
        display: "flex",       
        justifyContent: "center",
        alignItems: "center", }}>
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <h2 className="text-center text-primary mb-4"> Task Manager</h2>

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
