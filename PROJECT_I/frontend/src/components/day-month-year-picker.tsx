"use client";
import React, { useState, useEffect, useRef } from "react";
import FiscalMonthSelector from "@/components/month-year-picker";
import "./test.css";
import { FaCalendar } from "react-icons/fa";

const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

interface NepaliCalendarTableProps {
  onDateChange: (name: string,date: string) => void;
  uniqueId?: string;
}

const NepaliCalendarTable: React.FC<NepaliCalendarTableProps> = ({ onDateChange, uniqueId }) => {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [monthlyDate, setMonthlyDate] = useState<{ month: string; year: string }>({
    month: "Ashwin",
    year: "2081",
  });
  const [calendarData, setCalendarData] = useState<(number | null)[][]>([]);
  const [calendarVisible, setCalendarVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const calendarRef = useRef<HTMLDivElement | null>(null); // Ref to detect clicks outside

  const dummyCalendarData = [
    [null, null, null, 1, 2, 3, 4],
    [5, 6, 7, 8, 9, 10, 11],
    [12, 13, 14, 15, 16, 17, 18],
    [19, 20, 21, 22, 23, 24, 25],
    [26, 27, 28, 29, 30, 31, 32],
  ];

  const monthMapping : { [key: string]: number } = {
    Baisakh: 1,
    Jeth: 2,
    Asar: 3,
    Shrawan: 4,
    Bhadra: 5,
    Ashwin: 6,
    Kartik: 7,
    Mangsir: 8,
    Poush: 9,
    Magh: 10,
    Falgun: 11,
    Chaitra: 12,
  };

  const getMonthNumber = (monthName: string): number => {
    return monthMapping[monthName] || 1;
  };

  const fetchCalendarData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/calendar/?year=${monthlyDate.year}&month=${getMonthNumber(monthlyDate.month)}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch calendar data");
      }
      const data = await response.json();
      setCalendarData(data);
    } catch (error) {
      console.error("Error fetching calendar data:", error);
      setError("Failed to load calendar data. Please try again.");
      setCalendarData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCalendarData();
  }, [monthlyDate]);

  const handleSelect = (month: string, year: string) => {
    setMonthlyDate({ month, year });
  };

  const handleDateClick = (date: number | null) => {
    if (date) {
      setSelectedDate(date);
      setCalendarVisible(false); // Close the calendar on date select
      onDateChange(uniqueId!,`${monthlyDate.year}-${getMonthNumber(monthlyDate.month)}-${date}`);
    }
  };

  const handleInputClick = () => {
    setCalendarVisible((prev) => !prev); // Toggle visibility
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Input change event");
    console.log(e.target.value);
  };

  // Detect clicks outside the calendar to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setCalendarVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="calendar-wrapper custom-calendar">
      <div className="relative inline-block">
        <FaCalendar className="absolute left-[200px] top-1/2 transform -translate-y-1/2 w-5 h-5"/>
      <input
        type="text"
        value={selectedDate ? `${selectedDate}-${getMonthNumber(monthlyDate.month)}-${monthlyDate.year}` : "Pick a date"}
        onClick={handleInputClick}
        onChange={handleInputChange}
        className="date-input"
        readOnly
      />
      </div>
      {calendarVisible && (
        <div ref={calendarRef} className="calendar-container">
          <FiscalMonthSelector className="px-2 py-1" onSelect={handleSelect} />
          <table className="calendar-table">
            <thead>
              <tr>
                {calendarData.length > 0 ? (
                  daysOfWeek.map((day) => <th key={day}>{day}</th>)
                ) : (
                  <th colSpan={7}>Select dates 1-32</th>
                )}
              </tr>
            </thead>
            <tbody>
              {(calendarData.length > 0 ? calendarData : dummyCalendarData).map(
                (week, weekIndex) => (
                  <tr key={weekIndex}>
                    {week.map((date, dateIndex) => (
                      <td
                        key={dateIndex}
                        className={`calendar-cell ${
                          date === selectedDate ? "selected" : ""
                        }`}
                        onClick={() => handleDateClick(date)}
                      >
                        {date || ""}
                      </td>
                    ))}
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default NepaliCalendarTable;
