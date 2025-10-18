import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TaskItem from "./components/TaskItem";
import ProgressBar from "./components/ProgressBar";
import FooterInfo from "./components/FooterInfo";
import "./App.css";

const STATUS = ["Pending", "In Progress", "Completed"];
const STATUS_COLORS = {
  Pending: "#FFA500",
  "In Progress": "#3498DB",
  Completed: "#2ECC71",
};

export default function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("tasks")) || []);
  const [search, setSearch] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [time, setTime] = useState(new Date());

  // ⏰ live clock for dashboard footer
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // 💾 persist tasks
  useEffect(() => localStorage.setItem("tasks", JSON.stringify(tasks)), [tasks]);

  // ➕ add / update
  const addOrUpdateTask = () => {
    if (!task.trim()) return alert("Task cannot be empty!");
    if (editIndex !== null) {
      const updated = [...tasks];
      updated[editIndex].text = task;
      setTasks(updated);
      setEditIndex(null);
    } else {
      const newTask = {
        id: Date.now(),
        text: task,
        status: "Pending",
        date: new Date().toLocaleString(),
      };
      setTasks([newTask, ...tasks]);
    }
    setTask("");
  };

  // 🗑️ delete
  const deleteTask = (index) => {
    if (window.confirm("Delete this task?"))
      setTasks(tasks.filter((_, i) => i !== index));
  };

  // ✏️ edit
  const editTask = (index) => {
    setTask(tasks[index].text);
    setEditIndex(index);
  };

  // 🔄 next status
  const nextStatus = (index) => {
    const updated = [...tasks];
    const next = (STATUS.indexOf(updated[index].status) + 1) % STATUS.length;
    updated[index].status = STATUS[next];
    setTasks(updated);
  };

  const filtered = tasks.filter((t) =>
    t.text.toLowerCase().includes(search.toLowerCase())
  );

  const done = tasks.filter((t) => t.status === "Completed").length;
  const progress = tasks.length ? (done / tasks.length) * 100 : 0;

  return (
    <div className="container">
      <motion.h1
        className="title"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        To-Do App 🚀
      </motion.h1>

      <div className="input-section">
        <input
          type="text"
          placeholder="Enter task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={addOrUpdateTask}>
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </div>

      <input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      <ProgressBar progress={progress} completed={done} total={tasks.length} />

      <AnimatePresence>
        <motion.ul className="task-list" layout>
          {filtered.length > 0 ? (
            filtered.map((t, i) => (
              <TaskItem
                key={t.id}
                task={t}
                index={i}
                nextStatus={nextStatus}
                editTask={editTask}
                deleteTask={deleteTask}
                statusColors={STATUS_COLORS}
              />
            ))
          ) : (
            <p className="no-task">✨ No tasks found</p>
          )}
        </motion.ul>
      </AnimatePresence>

      <FooterInfo time={time} total={tasks.length} done={done} />
    </div>
  );
}