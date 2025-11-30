import React from "react";

interface Props {
  label: string;
  required?: boolean;
  error?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  validations?: { minDate?: string };
}

const DateField: React.FC<Props> = ({
  label,
  required,
  error,
  value,
  onChange,
  validations,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-black">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <input
        type="date"
        className="w-full border border-slate-300 rounded-lg px-4 py-3 bg-white text-slate-900 text-base placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        value={value || ""}
        min={validations?.minDate || undefined}
        onChange={(e) => onChange(e.target.value)}
      />

      {error && <p className="text-xs text-red-500 mt-0.5">{error}</p>}
    </div>
  );
};

export default DateField;
