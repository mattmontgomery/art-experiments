"use client";

import React, { useState, useEffect } from "react";

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

const getRandomElement = <T,>(arr: T[], random: () => number): T => {
  return arr[getRandomInt(random, 0, arr.length - 1)];
};

const generateRandomShapes = (count: number, seed: number) => {
  const random = mulberry32(seed);

  const colors = [
    "bg-cyan-500",
    "bg-amber-500",
    "bg-fuchsia-500",
    "bg-lime-500",
    "bg-violet-500",
    "bg-teal-500",
    "bg-rose-500",
    "bg-indigo-500",
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-orange-500",
    "bg-pink-500",
    "bg-purple-500",
    "bg-gray-500",
  ];

  const rotationClasses = [
    "animate-move-0",
    "animate-move-30",
    "animate-move-60",
    "animate-move-90",
    "animate-move-120",
    "animate-move-150",
    "animate-move-180",
    "animate-move-210",
    "animate-move-240",
    "animate-move-270",
    "animate-move-300",
    "animate-move-330",
  ];

  const shapes: JSX.Element[] = [];

  // Generate random shapes with a bias towards smaller sizes
  for (let i = 0; i < count; i++) {
    const isLine = getRandomInt(random, 0, 3) === 0; // 33% chance to be a line
    const isDoubleCircle = getRandomInt(random, 0, 4) === 0; // 25% chance to be a double-circle

    // Size logic: smaller elements are more common, with large elements being rarer
    let size;
    const sizeChance = getRandomInt(random, 1, 100);
    if (sizeChance <= 60) {
      size = getRandomInt(random, 20, 50); // Smaller elements (60% chance)
    } else if (sizeChance <= 90) {
      size = getRandomInt(random, 51, 100); // Medium elements (30% chance)
    } else {
      size = getRandomInt(random, 101, 300); // Large elements (10% chance)
    }

    const length = isLine ? getRandomInt(random, 100, 400) : size;
    const top = getRandomInt(random, 0, 80);
    const left = getRandomInt(random, 0, 80);
    const rotationClass = getRandomElement(rotationClasses, random); // Randomly select one of the 12 animation classes
    const color = getRandomElement(colors, random);

    const animationDuration = getRandomInt(random, 10, 120);

    if (isLine) {
      shapes.push(
        <div
          key={`line-${i}`}
          className={`${color} absolute ${rotationClass}`}
          style={{
            width: `${length}px`,
            height: `${size}px`,
            top: `${top}%`,
            left: `${left}%`,
            animationDuration: `${animationDuration}s`,
          }}
        ></div>
      );
    } else if (isDoubleCircle) {
      const innerColor = getRandomElement(colors, random);
      shapes.push(
        <div
          key={`double-circle-${i}`}
          className={`absolute ${rotationClass} flex items-center justify-center`}
          style={{
            width: `${size}px`,
            height: `${size}px`,
            top: `${top}%`,
            left: `${left}%`,
            borderRadius: "50%",
            backgroundColor: color.replace("bg-", ""),
            animationDuration: `${animationDuration}s`,
          }}
        >
          <div
            className={`absolute`}
            style={{
              width: `${size / 2}px`,
              height: `${size / 2}px`,
              borderRadius: "50%",
              backgroundColor: innerColor.replace("bg-", ""),
            }}
          ></div>
        </div>
      );
    } else {
      const shapeType = getRandomInt(random, 0, 2);
      shapes.push(
        <div
          key={`shape-${i}`}
          className={`${color} absolute ${rotationClass}`}
          style={{
            width: `${size}px`,
            height: `${size}px`,
            top: `${top}%`,
            left: `${left}%`,
            borderRadius:
              shapeType === 0 ? "50%" : shapeType === 1 ? "0%" : "10%",
            animationDuration: `${animationDuration}s`,
          }}
        ></div>
      );
    }
  }

  return shapes;
};

const PicassoStyle: React.FC = () => {
  const [seed, setSeed] = useState<number>(0);
  const [backgroundColor, setBackgroundColor] = useState<string>("bg-white");

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 100000));

    const backgroundColors = [
      "bg-blue-100",
      "bg-green-100",
      "bg-yellow-100",
      "bg-pink-100",
      "bg-purple-100",
    ];
    const randomBackgroundColor =
      backgroundColors[Math.floor(Math.random() * backgroundColors.length)];
    setBackgroundColor(randomBackgroundColor);
  }, []);

  const shapeCount = 100; // Increased the number of shapes and lines for more complexity
  const shapes = generateRandomShapes(shapeCount, seed);

  return (
    <div
      className={`relative w-full h-screen ${backgroundColor} p-4 overflow-hidden`}
    >
      {shapes}
    </div>
  );
};

export default PicassoStyle;
