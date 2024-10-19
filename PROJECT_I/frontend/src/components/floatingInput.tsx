"use client";

import { useState, ChangeEvent } from "react";

interface FloatingLabelInputProps {
  id: string;
  name: string;
  value: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function FloatingLabelInput({
  id,
  name,
  value,
  placeholder,
  onChange,
}: FloatingLabelInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative w-full max-w-xs mx-auto mt-8">
      <input
        name={name}
        type="text"
        id={id}
        className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 ${
          isFocused || value ? "border-[#e16e28]" : "border-gray-300"
        } appearance-none focus:outline-none focus:ring-0 focus:border-[#e16e28]`}
        placeholder=""
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <label
        htmlFor={id}
        className={`absolute text-[20px] ${
          isFocused || value
            ? "text-[#e16e28] top-2 scale-75"
            : "text-gray-500 top-[31px]"
        } left-2.5 duration-300 transform -translate-y-[22px] scale-75 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-blue-600`}
      >
        {placeholder}
      </label>
    </div>
  );
}
