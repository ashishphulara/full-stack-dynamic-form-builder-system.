import React from "react";

interface Props {
  label: string;
  required?: boolean;
  error?: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  fieldName?: string; // Add this
  clearError?: () => void; // Add this
}

const TextareaField: React.FC<Props> = ({
  label,
  required,
  error,
  value,
  onChange,
  placeholder,
  fieldName,
  clearError,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    onChange(newValue);

    // ✅ Clear error when user types
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

      <textarea
        className={`w-full border px-3 py-2 rounded-md bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[100px] ${
          error
            ? "border-red-300 focus:border-red-500 focus:ring-red-500"
            : "border-slate-300"
        }`}
        rows={4}
        placeholder={placeholder}
        value={value ?? ""}
        onChange={handleChange}
      />

      {error && <p className="text-xs text-red-500 mt-0.5">{error}</p>}
    </div>
  );
};

export default TextareaField;
