"use client"
// pages/test-datepicker.tsx
import React, { useState } from "react";
import NepaliDatePicker from "@/components/nepali-date-picker"; // Adjust the import path according to your project structure

const TestDatePicker: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>("");

  const handleDateChange = (name: string, value: string) => {
    console.log(`Date selected for ${name}: ${value}`);
    setSelectedDate(value); // Update the state when a new date is selected
  };

  return (
    <div className=" mt-[120x] p-[20px] bg-red-300">
      <h1>Nepali Date Picker Test</h1>
      <div>
        <label htmlFor="nepali-datepicker-1">Select a Nepali Date: </label>
        <NepaliDatePicker
          name="nepali-datepicker-1"
          value={selectedDate}
          onChange={handleDateChange}
        />
      </div>
      {selectedDate && (
        <div style={{ marginTop: "20px" }}>
          <strong>Selected Date: </strong> {selectedDate}
        </div>
      )}
    </div>
  );
};

export default TestDatePicker;
