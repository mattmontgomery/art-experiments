export type LCARSTextInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

const LCARSTextInput: React.FC<LCARSTextInputProps> = ({
  value,
  onChange,
  placeholder,
}) => {
  return (
    <input
      className="bg-black text-yellow-400 placeholder-yellow-400 placeholder-opacity-60 p-2 m-2 rounded-sm focus:outline-none"
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default LCARSTextInput;
