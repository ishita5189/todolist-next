import React from 'react';

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="w-full bg-gray-200 rounded-full overflow-hidden h-4 mt-4">
      <div
        className="bg-green-500 h-full"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ProgressBar;
