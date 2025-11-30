import React from "react";

interface Props {
  label: string;
  required?: boolean;
  error?: string;
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
  // fieldName?: string; 
  clearError?: () => void; 
}

const SelectField: React.FC<Props> = ({
  label,
  required,
  error,
  value,
  onChange,
  options,
  // fieldName,
  clearError,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    onChange(newValue);

    // ✅ Clear error when user selects an option
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

      <select
        className={`w-full border px-3 py-2 rounded-md bg-white text-slate-900 focus:outline-none focus:ring-2 focus:border-blue-500 min-h-[44px] ${
          error
            ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500"
            : "border-slate-300"
        }`}
        value={value ?? ""}
        onChange={handleChange}
      >
        <option value="">Select an option</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>

      {error && <p className="text-xs text-red-500 mt-0.5">{error}</p>}
    </div>
  );
};

export default SelectField;
