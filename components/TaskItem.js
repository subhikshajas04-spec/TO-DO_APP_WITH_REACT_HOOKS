import React from "react";
import { motion } from "framer-motion";

const TaskItem = ({ task, index, nextStatus, editTask, deleteTask, statusColors }) => (
  <motion.li
    layout
    className="task-item"
    style={{ borderLeft: `5px solid ${statusColors[task.status]}` }}
    whileHover={{ scale: 1.03 }}
  >
    <div className="task-info">
      <strong>{task.text}</strong>
      <span style={{ color: statusColors[task.status] }}>{task.status}</span>
      <small>{task.date}</small>
    </div>
    <div className="task-actions">
      <button onClick={() => nextStatus(index)}>Next →</button>
      <button onClick={() => editTask(index)}>✏️</button>
      <button onClick={() => deleteTask(index)}>❌</button>
    </div>
  </motion.li>
);
export default TaskItem;