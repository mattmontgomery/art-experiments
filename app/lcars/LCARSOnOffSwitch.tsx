export type LCARSOnOffSwitchProps = {
  isOn: boolean;
  handleToggle: () => void;
  label: string;
};

const LCARSOnOffSwitch: React.FC<LCARSOnOffSwitchProps> = ({
  isOn,
  handleToggle,
  label,
}) => {
  return (
    <div className="flex items-center m-2">
      <span className="text-yellow-400 font-bold mr-3">{label}</span>
      <div
        className={`w-16 h-8 rounded-full ${
          isOn ? "bg-blue-500" : "bg-orange-400"
        } relative cursor-pointer`}
        onClick={handleToggle}
      >
        <div
          className={`w-7 h-7 bg-black rounded-full absolute top-0.5 left-0.5 transition-transform ${
            isOn ? "transform translate-x-8" : ""
          }`}
        ></div>
      </div>
    </div>
  );
};
export default LCARSOnOffSwitch;
