"use client"

import React, { useState, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { CustomerSearch } from "@/components/customerSearch";

function UploadMeterReading() {
  const [searchResults, setSearchResults] = useState<any[]>([]);
    const [selectedCustomer, setSelectedCustomer] = useState<any | null>(null);
    const [currentReading, setCurrentReading] = useState<string>("");
  
    const handleUpload = () => {
      // Handle the upload logic here (e.g., sending the currentReading and selectedCustomer data to an API)
      console.log("Current Reading:", currentReading);
      console.log("Selected Customer:", selectedCustomer);
    };

    const payerCustomerRef = useRef<HTMLDivElement>(null);

    const handle = (customer: any) => {
        setSelectedCustomer(customer);
      setSearchResults([customer]);
      setTimeout(() => {
        if (payerCustomerRef.current) {
          const tablePosition =
            payerCustomerRef.current.getBoundingClientRect().top + window.scrollY; // Get table's position
          const offset = 135; // Adjust this value to control where the scroll stops (higher = scrolls less)
  
          window.scrollTo({
            top: tablePosition - offset,
            behavior: "smooth",
          });
        }
      }, 100); // Ensure the table renders first
    };

  return (
    <div>
      <CustomerSearch setSearchResults={setSearchResults} />
      <div className="search-results ">
        <table>
          <thead>
            <tr>
              <th>Action</th>
              <th>Customer No.</th>
              <th>Customer Name</th>
              <th>Address</th>
              <th>Mobile Number</th>
              <th>Customer Type</th>
              <th>Ampere Rating</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.length === 0 ? (
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
              searchResults.map((result, index) => (
                <tr key={index}>
                  <td>
                    <button
                      onClick={() => handle(result)} // Pass result to confirmDelete
                      className="px-8 py-2 rounded-md bg-teal-500 text-white font-bold transition duration-200  border-2 border-transparent"
                    >
                      Load
                    </button>
                  </td>
                  <td>{result.customerNumber}</td>
                  <td>{result.customerNameEnglish}</td>
                  <td>{result.addressEnglish}</td>
                  <td>{result.mobileNumber}</td>
                  <td>{result.customerType}</td>
                  <td>{result.ampereRating}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

      </div>


        {/* Display the selected customer details below the table */}
  {selectedCustomer && (
     <div className="form-container !pt-5 pb-10 dark:bg-custom-dark bg-custom-light" ref={payerCustomerRef}>
        <div className="relative z-9 search-form text-custom-light dark:text-custom-dark dark:bg-custom-dark bg-custom-light">
          <h2 className="absolute z-10">Upload Reading</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-gray-700">Customer Name:</label>
              <p>{selectedCustomer.customerNameEnglish}</p>
            </div>
            <div>
              <label className="block font-bold text-gray-700">Last Read Date:</label>
              <p>{selectedCustomer.lastReadDate || "N/A"}</p> {/* Placeholder for last read date */}
            </div>
            <div>
              <label className="block font-bold text-gray-700">Reading (Last):</label>
              <p>{selectedCustomer.lastReading || "N/A"}</p> {/* Placeholder for last reading */}
            </div>
            <div>
              <label className="block font-bold text-gray-700">Enter Current Reading:</label>
              <input
                type="text"
                value={currentReading}
                onChange={(e) => setCurrentReading(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                placeholder="Enter current reading"
              />
            </div>
          </div>

          <button
            onClick={handleUpload}
            className="mt-4 px-4 py-2 bg-teal-500 text-white rounded-md font-bold"
          >
            Upload
          </button>
        </div>
        </div>
      )}

    </div>
    
  );
}

export default UploadMeterReading;
