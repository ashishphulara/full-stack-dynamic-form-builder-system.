import React from "react";

interface Props {
  label: string;
  required?: boolean;
  error?: string;
  value: boolean;
  onChange: (val: boolean) => void;
  // fieldName?: string; // Add this
  clearError?: () => void; // Add this
}

const SwitchField: React.FC<Props> = ({
  label,
  required,
  error,
  value,
  onChange,
  // fieldName,
  clearError,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.checked;
    onChange(newValue);

    // ✅ Clear error when user toggles switch
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

      <label
        className={`flex items-center gap-2 cursor-pointer text-sm p-2 rounded-md transition-all ${
          error ? "bg-red-50 border border-red-200" : "text-slate-900"
        }`}
      >
        <input
          type="checkbox"
          checked={value ?? false}
          onChange={handleChange}
          className={`h-4 w-4 rounded focus:ring-2 ${
            error
              ? "text-red-600 focus:ring-red-500 border-red-300"
              : "text-blue-600 focus:ring-blue-500 border-slate-300"
          }`}
        />
        <span>{value ? "Enabled" : "Disabled"}</span>
      </label>

      {error && <p className="text-xs text-red-500 mt-0.5">{error}</p>}
    </div>
  );
};

export default SwitchField;
