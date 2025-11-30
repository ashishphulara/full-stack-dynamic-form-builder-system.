import React from "react";

interface Props {
  label: string;
  required?: boolean;
  error?: string;
  value: number | undefined;
  onChange: (val: number) => void;
  placeholder?: string;
  // fieldName?: string; // Add this for error clearing
  clearError?: () => void; // Add this for error clearing
}

const NumberField: React.FC<Props> = ({
  label,
  required,
  error,
  value,
  onChange,
  placeholder,
  // fieldName,
  clearError,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    onChange(newValue);

    // Clear error when user types a value
    if (clearError && error) {
      clearError();
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-slate-900">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type="number"
        className={`w-full border px-3 py-2 rounded-md bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
          error
            ? "border-red-300 focus:border-red-500 focus:ring-red-500"
            : "border-slate-300"
        }`}
        value={value ?? ""}
        placeholder={placeholder}
        onChange={handleChange}
      />
      {error && <p className="text-xs text-red-500 mt-0.5">{error}</p>}
    </div>
  );
};

export default NumberField;
