import React from "react";

interface Props {
  label: string;
  required?: boolean;
  error?: string;
  value: string[];
  onChange: (val: string[]) => void;
  options: { label: string; value: string }[];
}

const MultiSelectField: React.FC<Props> = ({
  label,
  required,
  error,
  value,
  onChange,
  options,
}) => {
  const toggleValue = (selected: string) => {
    if (value.includes(selected)) {
      onChange(value.filter((v) => v !== selected));
    } else {
      onChange([...value, selected]);
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-slate-900 text-black">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <div className="flex flex-col gap-2 border border-slate-300 rounded-md p-3 bg-white text-slate-900">
        {options.map((o) => (
          <label key={o.value} className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={value.includes(o.value)}
              onChange={() => toggleValue(o.value)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
            />
            {o.label}
          </label>
        ))}
      </div>

      {error && <p className="text-xs text-red-500 mt-0.5">{error}</p>}
    </div>
  );
};

export default MultiSelectField;
