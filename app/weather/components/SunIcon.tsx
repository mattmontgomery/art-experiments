import React from "react";

const SunIcon: React.FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      className="w-20 h-20 text-yellow-500"
      fill="currentColor"
    >
      <circle cx="32" cy="32" r="14" fill="currentColor" />
      <g stroke="currentColor" strokeWidth="2">
        <line x1="32" y1="4" x2="32" y2="14" />
        <line x1="32" y1="50" x2="32" y2="60" />
        <line x1="4" y1="32" x2="14" y2="32" />
        <line x1="50" y1="32" x2="60" y2="32" />
        <line x1="11.31" y1="11.31" x2="18.36" y2="18.36" />
        <line x1="45.64" y1="45.64" x2="52.69" y2="52.69" />
        <line x1="11.31" y1="52.69" x2="18.36" y2="45.64" />
        <line x1="45.64" y1="18.36" x2="52.69" y2="11.31" />
      </g>
    </svg>
  );
};

export default SunIcon;
