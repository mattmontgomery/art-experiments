import React from "react";
import MondrianSquares from "./MondrianSquares";

export default function MondrianSquaresPage() {
  return (
    <div>
      <h1>Mondrian Squares</h1>
      <MondrianSquares seed={Math.random()} />
    </div>
  );
}
