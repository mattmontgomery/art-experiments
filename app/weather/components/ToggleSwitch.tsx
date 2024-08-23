import React from "react";

interface ToggleSwitchProps {
  isChecked: boolean;
  onToggle: () => void;
  labelOn: string;
  labelOff: string;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  isChecked,
  onToggle,
  labelOn,
  labelOff,
}) => {
  const handleLabelClick = (checkedState: boolean) => {
    if (isChecked !== checkedState) {
      onToggle();
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <span
        className={`text-lg font-semibold cursor-pointer ${
          !isChecked ? "text-white" : "text-gray-400"
        }`}
        onClick={() => handleLabelClick(false)}
      >
        {labelOff}
      </span>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only"
          checked={isChecked}
          onChange={onToggle}
        />
        <div className="w-14 h-8 bg-gray-300 rounded-full peer-checked:bg-gray-600 peer-focus:ring-4 peer-focus:ring-gray-300">
          <div
            className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${
              isChecked ? "transform translate-x-6" : ""
            }`}
          ></div>
        </div>
      </label>
      <span
        className={`text-lg font-semibold cursor-pointer ${
          isChecked ? "text-white" : "text-gray-400"
        }`}
        onClick={() => handleLabelClick(true)}
      >
        {labelOn}
      </span>
    </div>
  );
};

export default ToggleSwitch;
