import React from "react";

interface LcarsBarProps {
  color: string;
  height?: string;
  width?: string;
  className?: string;
}

const LcarsBar: React.FC<LcarsBarProps> = ({
  color,
  height = "1rem",
  width = "100%",
  className,
}) => {
  return (
    <div
      className={`rounded ${className}`}
      style={{ backgroundColor: color, height, width }}
    />
  );
};

export default LcarsBar;
