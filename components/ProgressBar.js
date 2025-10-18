import React from "react";

const ProgressBar = ({ progress, completed, total }) => (
  <>
    <div className="progress-bar">
      <div className="progress" style={{ width: `${progress}%` }}></div>
    </div>
    <p className="progress-text">
      ✅ {completed} of {total} tasks completed ({progress.toFixed(1)}%)
    </p>
  </>
);
export default ProgressBar;