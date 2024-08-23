import React from "react";

interface LcarsTextProps {
  text: string;
  color: string;
  size?: string;
  className?: string;
}

const LcarsText: React.FC<LcarsTextProps> = ({
  text,
  color,
  size = "text-lg",
  className,
}) => {
  return (
    <span className={`${size} font-bold`} style={{ color }}>
      {text}
    </span>
  );
};

export default LcarsText;
