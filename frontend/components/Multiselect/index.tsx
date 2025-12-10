"use client";

import { useState } from "react";

export type Option = {
  value: string;
  label: string;
};

type Props = {
  options: Option[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
};

export default function MultiSelect({
  options,
  value,
  onChange,
  placeholder = "Select option",
}: Props) {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen((prev) => !prev);

  const handleSelect = (label: string) => {
    if (value.includes(label)) {
      onChange(value.filter((v) => v !== label));
    } else {
      onChange([...value, label]);
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={toggle}
        className="w-full text-left px-3 py-2 border border-gray-300 rounded-md bg-white"
      >
        {value.length ? value.join(", ") : placeholder}
      </button>

      {open && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-auto">
          {options.map((opt) => (
            <div
              key={opt.value}
              className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(opt.label)}
            >
              <input
                type="checkbox"
                checked={value.includes(opt.label)}
                readOnly
                className="mr-2"
              />
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
