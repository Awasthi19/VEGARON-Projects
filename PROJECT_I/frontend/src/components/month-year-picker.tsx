"use client";

import React, { useState, useEffect, useRef } from "react";
import NepaliDate from "nepali-date-converter";

// Define the array of Nepali months
const months = [
  "Baisakh",
  "Jeth",
  "Asar",
  "Shrawan",
  "Bhadra",
  "Ashwin",
  "Kartik",
  "Mangsir",
  "Poush",
  "Magh",
  "Falgun",
  "Chaitra",
];


// Utility to get current fiscal year in BS (assuming fiscal year starts in Shrawan)
const getCurrentBSFiscalYear = () => {
  const currentDate = new NepaliDate();
  const currentMonth = currentDate.getMonth() + 1; // 0-based index for Gregorian months
  const currentFiscalYear =
    currentMonth >= 4 ? currentDate.getYear() : currentDate.getYear() - 1;
  return currentFiscalYear;
};

type FiscalMonthSelectorProps = {
  onSelect: (month: string, fiscalYear: string) => void;
  className?: string;
};

const FiscalMonthSelector: React.FC<FiscalMonthSelectorProps> = ({
  onSelect,
  className,
}) => {
  const currentFiscalYear = getCurrentBSFiscalYear();

  // State for selected month and fiscal year
  const [selectedMonth, setSelectedMonth] = useState(5); // Default: Ashwin
  const [selectedFiscalYear, setSelectedFiscalYear] = useState(
    `${currentFiscalYear}`
  );

  // State to store the fiscal years to be displayed
  const [fiscalYearRange, setFiscalYearRange] = useState<string[]>([]);

  // State to track how many fiscal years are loaded (starts at 5)
  const [yearsLoaded, setYearsLoaded] = useState(5);

  // State for dropdown open/close
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  // Function to load more fiscal years
  const loadFiscalYears = (additionalYears: number) => {
    const newRange = Array.from(
      { length: additionalYears },
      (_, i) => {
        const year = currentFiscalYear - (yearsLoaded + i);
        return `${year}`;
      }
    );
    setFiscalYearRange((prevRange) => [...prevRange, ...newRange]);
    setYearsLoaded((prev) => prev + additionalYears);
  };

  // Load initial 5 fiscal years on component mount
  useEffect(() => {
    const initialRange = Array.from(
      { length: 5 },
      (_, i) => {
        const year = currentFiscalYear - i;
        return `${year}`;
      }
    );
    setFiscalYearRange(initialRange);
  }, [currentFiscalYear]);

  // Close the dropdown when clicked outside
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

    // Handle default selection when the component mounts
    useEffect(() => {
      handleSelect(selectedMonth, selectedFiscalYear); // Trigger the default selection on mount
    }, []);

  const handleSelect = (month: number, year: string) => {
    setSelectedMonth(month);
    setSelectedFiscalYear(year);
    onSelect(months[month], year);
    console.log("Selected month and year:", { month: months[month], year });
  };

  return (
    <div className="flex flex-col ">
      {/* Month Selector */}
      <div className=" flex items-center justify-between px-[15px] ">
        <div className="mr-4">
          <select
            value={selectedMonth}
            onChange={(e) => handleSelect(parseInt(e.target.value), selectedFiscalYear)} // Use handleSelect
            className={`${className} bg-white border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400`}
          >
            {months.map((month, index) => (
              <option key={index} value={index}>
                {month}
              </option>
            ))}
          </select>
        </div>

        {/* Custom Fiscal Year Dropdown */}
        <div ref={dropdownRef} className="relative">
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className={`${className} bg-white border border-gray-300 rounded-md  text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400`}
          >
            {selectedFiscalYear}
          </button>

          {isDropdownOpen && (
            <div className="absolute z-10 mt-1 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
              <div className="max-h-60 overflow-y-auto">
                {fiscalYearRange.map((year) => (
                  <div
                    key={year}
                    onClick={() => {
                      handleSelect(selectedMonth, year)
                      setDropdownOpen(false); // Close after selection
                    }}
                    className={`${className} cursor-pointer hover:bg-blue-100 ${
                      selectedFiscalYear === year ? "bg-blue-200" : ""
                    }`}
                  >
                    {year}
                  </div>
                ))}
                <div
                  onClick={() => loadFiscalYears(5)}
                  className={`${className}cursor-pointer px-4 py-2 hover:bg-blue-100`}
                >
                  Load More
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FiscalMonthSelector;
