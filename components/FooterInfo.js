import React from "react";

export default function FooterInfo({ time, total, done }) {
  return (
    <footer style={{ textAlign: "center", marginTop: 20, opacity: 0.8 }}>
      <p>
        🧠 Total Tasks: {total} | ✅ Completed: {done} | ⏰ {time.toLocaleTimeString()}
      </p>
      <p style={{ fontSize: 12, marginTop: 5 }}>
        © 2025 To-Do App with React Hooks 
      </p>
    </footer>
  );
}