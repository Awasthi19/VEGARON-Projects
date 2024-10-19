"use client";

import React from "react";
import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import "./form.css";
import axios from "axios";
import FiscalMonthSelector from "@/components/month-year-picker";
import NepaliCalendarTable from "@/components/day-month-year-picker";

function BillingReport() {
  const [billingReportDetails, setBillingReportDetails] = useState<any[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<string>("Monthly"); // Default to Current Month
  const [dailyDate, setDailyDate] = useState<string>(""); // For Daily
  const [monthlyDate, setMonthlyDate] = useState<{
    month: string;
    year: string;
  }>({
    month: "",
    year: "",
  }); // For Date Range
  const [dateRange, setDateRange] = useState<{
    startDate: string;
    endDate: string;

  }>({
    startDate: "",
    endDate: "",

  });

  const handlePeriodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newPeriod = event.target.value;
    setSelectedPeriod(newPeriod);
  };

  const [total, setTotal] = useState<{
    total_consumptions: number;
    total_charges: number;
  }>({
    total_consumptions: 0,
    total_charges: 0,
  });

  const LoadBillingReport = async () => {
    console.log(JSON.stringify(dateRange));
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_BILLINGREPORT_URL!,
        {
          params: {
            date_range: dateRange,
          },
        }
      );
      console.log("response", JSON.stringify(response.data));
      setBillingReportDetails(response.data.meter_readings);
      setTotal({
        total_consumptions: response.data.total_consumption,
        total_charges: response.data.total_charges,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    LoadBillingReport();
  }, [dateRange]);

  // Function to handle date changes
  const handleDateChange = (name: string, value: string) => {
    if (name === "startDate") {
      setDateRange((prevRange) => ({ ...prevRange, startDate: value }));
    } else if (name === "endDate") {
      setDateRange((prevRange) => ({ ...prevRange, endDate: value }));
    } else if (name === "monthDate") {
      setDailyDate(value);
    }
  };
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

  const handleSelect = (month: string, year: string) => {
    console.log("Selected month and year:", { month, year });
    setDateRange((prevRange) => ({ ...prevRange, startDate: `${year}-${getMonthNumber(month)}` }));
  };
  return (
    <div>
      <div className="relative search-results !mt-[190px]">
        <div className="flex space-x-6 w-full absolute -top-[90px] bg-gradient-to-r from-gray-50 to-gray-100 p-3 rounded-lg shadow-sm">
          <div className="flex items-center space-x-4">
            <label
              htmlFor="period"
              className="text-sm font-medium text-gray-700 whitespace-nowrap"
            >
              Transactions:
            </label>
            <select
              id="period"
              value={selectedPeriod}
              onChange={handlePeriodChange}
              className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
            >
              <option value="Monthly">Monthly</option>
              <option value="Daily">Daily</option>
              <option value="Date Range">Date Range</option>
            </select>
          </div>

          <div className="flex justify-center items-center">
            {/* Conditionally render date inputs based on selected period */}
            <div
              className={`flex items-center space-x-4 period-monthly ${
                selectedPeriod === "Monthly" ? "" : "hidden"
              }`}
            >
              <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
                Monthly:
              </label>
              <FiscalMonthSelector
                className="px-4 py-2"
                onSelect={handleSelect}
              />
            </div>

            <div
              className={`flex items-center space-x-4 period-daily ${
                selectedPeriod === "Daily" ? "" : "hidden"
              }`}
            >
              <label className="block text-sm font-medium text-gray-700">
                Select Date:
              </label>
              <NepaliCalendarTable
                uniqueId="startDate"
                onDateChange={handleDateChange}
              />
            </div>

            <div
              className={`flex items-center space-x-4 period-daterange ${
                selectedPeriod === "Date Range" ? "" : "hidden"
              }`}
            >
              {" "}
              <label className="block text-sm font-medium text-gray-700">
                Select Date Range:
              </label>
              <div className="flex space-x-4">
                <div className="flex items-center">
                  <label className="block text-sm text-gray-500 mr-2">
                    Start Date:
                  </label>
                  <NepaliCalendarTable
                    uniqueId="startDate"
                    onDateChange={handleDateChange}
                  />
                </div>
                <div className="flex items-center">
                  <label className="block text-sm text-gray-500 mr-2">
                    End Date:
                  </label>
                  <NepaliCalendarTable
                    uniqueId="endDate"
                    onDateChange={handleDateChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th className="!w-[5%]">S.N.</th>
              <th className="!w-[20%]">Status</th>
              <th className="!w-[12%]">Amount</th>
              <th className="!w-[10%]">Con Unit</th>
              <th className="!w-[15%]">Cust Name</th>
              <th className="!w-[12%]">Cust No</th>

              <th className="!w-[12%]">Read year</th>
              <th className="!w-[12%]">Read month</th>
              <th className="!w-[8%]">Receipt</th>
            </tr>
          </thead>
          <tbody>
            {billingReportDetails.length === 0 ? (
              <tr>
                <td
                  colSpan={12}
                  style={{ textAlign: "center", padding: "20px" }}
                >
                  <div className="flex flex-col items-center justify-center py-10">
                    {/* Magnifying glass icon */}
                    <FaSearch className="text-gray-500 text-6xl" />

                    {/* No results message */}
                    <h2 className="text-2xl font-bold text-gray-800 mt-5">
                      No results found
                    </h2>

                    <p className="text-gray-500 text-lg mt-2">
                      No results match the filter criteria. Remove filter or
                      clear all filters to show results.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              billingReportDetails.map((result: any, index: any) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    {result.payment_status ? (
                      <>
                        Paid on{" "}
                        {new Date(result.paid_date!).toLocaleDateString()}
                      </>
                    ) : result.paid_amount > 0 ? (
                      <>
                        Partially Paid: {result.paid_amount} on{" "}
                        {new Date(result.paid_date!).toLocaleDateString()}
                      </>
                    ) : null}
                  </td>
                  <td>{result.paid_amount}</td>
                  <td>{result.consumption_units}</td>
                  <td>{result.customer_name}</td>
                  <td>{result.customer_number}</td>

                  <td>{result.year}</td>
                  <td>{result.month}</td>
                  <td>{result.receipt_number}</td>
                </tr>
              ))
            )}
          </tbody>
          <tfoot>
            <tr>
              <td className="font-bold">Total</td>
              <td></td>
              <td className="font-bold">{total.total_charges}</td>
              <td className="font-bold">{total.total_consumptions}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

export default BillingReport;
