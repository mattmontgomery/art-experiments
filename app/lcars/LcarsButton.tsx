import React from "react";

interface LcarsButtonProps {
  label: string;
  color: string;
  className?: string;
}

const LcarsButton: React.FC<LcarsButtonProps> = ({
  label,
  color,
  className,
}) => {
  return (
    <button
      className={`text-black font-bold py-2 px-4 rounded ${className}`}
      style={{ backgroundColor: color }}
    >
      {label}
    </button>
  );
};

export default LcarsButton;
