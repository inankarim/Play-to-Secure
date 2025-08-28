import React from 'react';

// Progress bar component to show quiz completion
const ProgressBar = ({ completed, total }) => {
  // Calculate the percentage of completion
  const percentage = (completed / total) * 100;

  return (
    <div className="progress-bar">
      <div className="progress" style={{ width: `${percentage}%` }}></div>
    </div>
  );
};

export default ProgressBar;
