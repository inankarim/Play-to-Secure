import React from 'react';

// Progress bar component to show quiz completion
const ProgressBar = ({ completed, total }) => {
  // Ensure we don't divide by zero if total is 0
  const percentage = total ? (completed / total) * 100 : 0;

  return (
    <div className="w-full bg-gray-200 rounded-full h-4">
      <div
        className="bg-yellow-400 h-4 rounded-full"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
