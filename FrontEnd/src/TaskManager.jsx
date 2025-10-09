import React, { useEffect, useState } from "react";
import axios from "axios";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const token = localStorage.getItem("token"); // JWT from login
  const username = localStorage.getItem("username");

  // ✅ Load tasks when user logs in
  useEffect(() => {
    axios
      .get("http://localhost:4000/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setTasks(res.data))
      .catch((err) => console.error(err));
  }, [token]);

  // ✅ Add new task
  const handleSubmit = async (e) => {
    e.preventDefault();
    

    try {
      const res = await axios.post(
        "http://localhost:4000/tasks",
        { text: taskInput },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks([...tasks, res.data]);
      setTaskInput("");
    } catch (err) {
      console.error(err);
    }
  };
  const toggleComplete = async (id) => {
    try {
      const res = await axios.put(
        `http://localhost:4000/tasks/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks(
        tasks.map((task) =>
          task._id === id ? { ...task, completed: res.data.completed } : task
        )
      );
    } catch (err) {
      console.error(err);
    }
  };
  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "400px" }}>
      <h2 className="text-center mb-3">Welcome {username}</h2>

      <form onSubmit={handleSubmit} className="d-flex mb-3">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Enter Task"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
        />
        <button className="btn btn-primary" type="submit">
          Add
        </button>
      </form>

      <ul className="list-group">
        {tasks.length === 0 ? (
          <p className="text-center text-muted">No tasks </p>
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
                  checked={task.completed}
                  onChange={() => toggleComplete(task._id)}
                />
                <span
                  style={{
                    textDecoration: task.completed ? "line-through" : "none",
                  }}
                >
                  {task.text}
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
  );
};

export default TaskManager;
