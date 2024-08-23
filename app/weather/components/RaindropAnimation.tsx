import React from "react";
import "./RaindropAnimation.css"; // Assuming the CSS is in the same directory or adjust the path accordingly

const RaindropAnimation: React.FC = () => {
  return (
    <div className="rain">
      {Array.from({ length: 50 }).map((_, i) => (
        <div key={i} className="raindrop"></div>
      ))}
    </div>
  );
};

export default RaindropAnimation;
