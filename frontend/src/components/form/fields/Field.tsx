// TextField.tsx
import React from "react";

interface Props {
  label: string;
  required?: boolean;
  error?: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export const TextField: React.FC<Props> = ({
  label,
  required,
  error,
  value,
  onChange,
  placeholder,
}) => (
  <div className="flex flex-col gap-1">
    <label className="font-medium text-black">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    <input
      className="border rounded px-3 py-2"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
    {error && <p className="text-sm text-red-500">{error}</p>}
  </div>
);
