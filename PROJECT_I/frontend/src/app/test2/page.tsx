"use client";
import React, { useState, useEffect } from "react";
import FiscalMonthSelector from "@/components/month-year-picker";
import "./test.css";

// Days of the week are the same for all months
const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]; // Sunday to Saturday

const NepaliCalendarTable: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [monthlyDate, setMonthlyDate] = useState<{ month: string; year: string }>({
    month: "Ashwin", // Default to the first month
    year: "2081",
  });
  const [calendarData, setCalendarData] = useState<(number | null)[][]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const dummyCalendarData = [
    [null, null, null, 1, 2, 3, 4],
    [5, 6, 7, 8, 9, 10, 11],
    [12, 13, 14, 15, 16, 17, 18],
    [19, 20, 21, 22, 23, 24, 25],
    [26, 27, 28, 29, 30, 31, 32],
  ];

  // Map your Nepali month names to corresponding month numbers
  const monthMapping: { [key: string]: number } = {
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
    return monthMapping[monthName] || 1; // Default to month 1 if not found
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
  }, [monthlyDate]); // Fetch data when month or year changes

  const handleSelect = (month: string, year: string) => {
    setMonthlyDate({ month, year });
  };

  const handleDateClick = (date: number | null) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  return (
    <div className="calendar-container">
      <FiscalMonthSelector onSelect={handleSelect} />

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
  );
};

export default NepaliCalendarTable;
