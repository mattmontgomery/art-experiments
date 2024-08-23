import React from "react";

interface LcarsPanelProps {
  children: React.ReactNode;
  className?: string;
}

const LcarsPanel: React.FC<LcarsPanelProps> = ({ children, className }) => {
  return <div className={`p-4 ${className}`}>{children}</div>;
};

export default LcarsPanel;
