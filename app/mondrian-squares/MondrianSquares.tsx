"use client";

import React, { useState } from "react";

// A seed-based random number generator
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const getRandomInt = (
  random: () => number,
  min: number,
  max: number
): number => {
  return Math.floor(random() * (max - min + 1)) + min;
};

const generateMondrianGrid = (cols: number, rows: number, seed: number) => {
  const grid = Array(rows)
    .fill(0)
    .map(() => Array(cols).fill(null));

  const colors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-yellow-500",
    "bg-black",
    "bg-white",
  ];
  const random = mulberry32(seed);

  for (let r = 0; r < rows; ) {
    for (let c = 0; c < cols; ) {
      if (grid[r][c] !== null) {
        c++;
        continue;
      }

      const color = colors[getRandomInt(random, 0, colors.length - 1)];
      const colSpan = getRandomInt(random, 1, cols - c);
      const rowSpan = getRandomInt(random, 1, rows - r);

      for (let i = 0; i < rowSpan; i++) {
        for (let j = 0; j < colSpan; j++) {
          if (r + i < rows && c + j < cols) {
            grid[r + i][c + j] = null;
          }
        }
      }

      grid[r][c] = (
        <div
          className={`${color} col-span-${colSpan} row-span-${rowSpan} border ${
            color === "bg-white" ? "border-black" : ""
          }`}
          key={`${r}-${c}`}
        ></div>
      );

      c += colSpan;
    }
    r++;
  }

  return grid.flat().filter((cell) => cell !== null);
};

interface MondrianGridProps {
  seed: number;
}

const MondrianGrid: React.FC<MondrianGridProps> = ({ seed }) => {
  const cols = 6;
  const rows = 6;
  const [_seed, setSeed] = useState<number>(seed ?? Math.random());
  console.log({ _seed });
  const gridItems = generateMondrianGrid(cols, rows, _seed);

  return (
    <div>
      <button onClick={() => setSeed(Math.random())}>generate</button>
      <div
        className={`grid grid-cols-${cols} grid-rows-${rows} gap-1 w-full h-screen p-4`}
      >
        {gridItems}
      </div>
    </div>
  );
};

export default MondrianGrid;
