import React, { useEffect, useCallback } from "react";
import "@/styles/datepicker.css";

interface NepaliDatePickerProps {
  name: string;
  value: string;
  onChange: (name: string, value: string) => void;
}

const NepaliDatePicker: React.FC<NepaliDatePickerProps> = ({
  name,
  value,
  onChange,
}) => {
  // Callback to initialize the datepicker
  const initializeDatePicker = useCallback(() => {
    const datepicker = document.getElementById(name) as any;
    if (!datepicker) return;

    try {
      datepicker.nepaliDatePicker({
        ndpYear: true,
        ndpMonth: true,
        ndpYearCount: 10,
        onChange: () => onChange(name, datepicker.value),
      });
    } catch (error) {
      console.warn(`Nepali datepicker initialization failed for ${name}:`, error);
    }
  }, [name, onChange]);

  // Load the Nepali datepicker script if not already loaded
  useEffect(() => {
    if (window.nepaliDatePicker) {
      initializeDatePicker();
      return;
    }

    const script = document.createElement("script");
    script.src = "/nepalidatepicker/nepali.datepicker.transpiled.js";
    script.async = true;
    script.onload = () => {
      window.nepaliDatePicker = true;
      initializeDatePicker();
    };
    script.onerror = () => console.error("Failed to load Nepali datepicker script.");
    document.body.appendChild(script);

    return () => {
      // Optional cleanup: Remove the script if needed (rare scenario)
      script.remove();
    };
  }, [initializeDatePicker]);

  return (
    <input
      type="text"
      id={name}
      name={name}
      value={value}
      onChange={(e) => onChange(name, e.target.value)}
    />
  );
};

export default NepaliDatePicker;
