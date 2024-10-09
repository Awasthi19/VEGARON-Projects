"use client";
import React, { useState, useRef } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import "./form.css";

function MasikBillingForm() {
  const placeholder1 = ["Search by Customer Name"];
  const placeholder2 = ["Search by Customer ID"];

  const [customerNameQuery, setCustomerNameQuery] = useState("");
  const [customerIDQuery, setCustomerIDQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showPayModal, setShowPayModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

  const handleSearch = async (
    e: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    try {
      const response = await axios.get(process.env.NEXT_PUBLIC_SEARCH_URL!, {
        params: {
          customerIDQuery: customerIDQuery,
          customerNameQuery: customerNameQuery,
        },
      });
      console.log("response", response.data);
      setSearchResults(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const [payer, setPayer] = useState<any>(null);
  const [amountReceived, setAmountReceived] = useState<string>("");
  const [charges, setCharges] = useState<string>("");
  const [remarks, setRemarks] = useState<string>("");

  const payerCustomerRef = useRef<HTMLDivElement>(null);

  const setPayerCustomer = (customer: any) => {
    setPayer(customer);
    setTimeout(() => {
      if (payerCustomerRef.current) {
        const tablePosition =
          payerCustomerRef.current.getBoundingClientRect().top + window.scrollY; // Get table's position
        const offset = 100; // Adjust this value to control where the scroll stops (higher = scrolls less)

        window.scrollTo({
          top: tablePosition - offset,
          behavior: "smooth",
        });
      }
    }, 100); // Ensure the table renders first
  };

  const handlePay = async () => {
    try {
      const response = await axios.delete(
        process.env.NEXT_PUBLIC_DELETECUSTOMER_URL!,
        { data: { customerNumber: selectedCustomer.customerNumber } }
      );
      console.log("response", response.data);
      if (response.data.success) {
        toast.success("Deletion successful", { theme: "colored" });
        // Update search results to remove deleted customer
        setSearchResults((prevResults) =>
          prevResults.filter(
            (result) =>
              result.customerNumber !== selectedCustomer.customerNumber
          )
        );
      } else {
        toast.error("Deletion failed", { theme: "colored" });
      }
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
    // Close the modal after deletion attempt
    setShowPayModal(false);
  };

  const confirmPay = (customer: any) => {
    setSelectedCustomer(customer);
    setShowPayModal(true); // Open modal
  };

  return (
    <div>
      <div className="form-container dark:bg-custom-dark bg-custom-light">
        <h2>Search Customer</h2>
        <div className="search-form text-custom-light dark:text-custom-dark dark:bg-custom-dark bg-custom-light">
          <div className="search-form-group">
            <label htmlFor="customerNameQuery">Customer Name</label>
            <PlaceholdersAndVanishInput
              placeholders={placeholder1}
              onChange={(e) => setCustomerNameQuery(e.target.value)}
              onSubmit={handleSearch}
            />
          </div>
          <div className="search-form-group">
            <label htmlFor="customerID">Customer ID</label>
            <PlaceholdersAndVanishInput
              placeholders={placeholder2}
              onChange={(e) => setCustomerIDQuery(e.target.value)}
              onSubmit={handleSearch}
            />
          </div>
        </div>
      </div>

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
                  No results found.
                </td>
              </tr>
            ) : (
              searchResults.map((result, index) => (
                <tr key={index}>
                  <td>
                    <button
                      onClick={() => setPayerCustomer(result)} // Pass result to confirmDelete
                      className="px-8 py-2 rounded-md bg-teal-500 text-white font-bold transition duration-200  border-2 border-transparent"
                    >
                      Pay
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

      {payer && (
        <div className="form-container pb-10" ref={payerCustomerRef}>
          <h2>Payment </h2>
          <form className="billing-container text-custom-light dark:text-custom-dark dark:bg-custom-dark bg-custom-light">
            <div className="customer-info">
              <p>
                <strong>Customer No.:</strong> {payer.customerNumber}
              </p>
              <p>
                <strong>Customers Name:</strong> {payer.customerNameEnglish}
              </p>

              <p>
                <strong>Address:</strong> {payer.addressEnglish}
              </p>
              <p>
                <strong>Contact Number:</strong> {payer.mobileNumber}
              </p>
            </div>

            <div className="payment-summary">
              <div className="text-white bg-[#f7f0f0] p-3 rounded-lg border-gray-600 shadow-md font-bold flex ">
                <div className="flex-1 flex items-center">
                  <div className="flex-2 text-[#c44933] text-sm mr-3">
                    Total Amount:
                  </div>
                  <div className="flex-1 text-[#c44933] text-lg">100</div>
                </div>
                <div className="flex-1 flex items-center">
                  <div className="flex-2 text-[#c44933] text-sm mr-3">
                    Advance Amount:
                  </div>
                  <div className="flex-1 text-[#c44933] text-lg">100</div>
                </div>
              </div>

              <div className="w-full bg-[#F1F7F0] rounded-lg shadow-md p-3 flex flex-col items-center my-[24px]">
                <p className="text-lg text-[#666666] mb-2">You are paying</p>
                <p className="text-[#33A938] font-bold mb-2">
                  <span className="text-2xl mr-1">NPR</span>
                  <span className="text-4xl">
                    10.00
                    {Number(payer.advance) - Number(charges)}
                  </span>
                </p>
                <p className="text-sm font-bold text-[#4E5D6D] ">Pay Money</p>
              </div>
              <div className="form-group">
              <label htmlFor="receivedAmount">Received Amount:</label>
              <input
                id="receivedAmount"
                name="receivedAmount"
                value={amountReceived}
                onChange={(e) => setAmountReceived(e.target.value)}
              />
              </div>

              <div className="text-white bg-[#f0f5f7] p-3 rounded-lg border-gray-600 shadow-md font-bold flex ">
                <div className="flex-1 flex items-center">
                  <div className="flex-2 text-[#339bc4] text-sm mr-3">
                    Total Amount:
                  </div>
                  <div className="flex-1 text-[#339bc4] text-lg">100</div>
                </div>
                <div className="flex-1 flex items-center">
                  <div className="flex-2 text-[#339bc4] text-sm mr-3">
                    Advance Amount:
                  </div>
                  <div className="flex-1 text-[#339bc4] text-lg">100</div>
                </div>
              </div>

              <button
                onClick={handlePay}
                type="submit"
                className=" w-full px-12 py-3 mt-[24px] rounded-full bg-[#41cb48] font-bold text-white text-2xl  tracking-widest uppercase transform hover:scale-105 hover:bg-[#46da4d] transition-colors duration-200"
              >
                Pay
              </button>
            </div>
            <div className="form-section">
              <div className="form-group">
                <label htmlFor="otherCharges">Other Charges:</label>
                <select
                  id="otherCharges"
                  name="otherCharges"
                  onChange={(e) => setCharges(e.target.value)}
                >
                  <option value="">Select one</option>
                  {/* Add options as needed */}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="amount">Amount:</label>
                <input
                  id="amount"
                  name="amount"
                  value={charges}
                  onChange={(e) => setCharges(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="remarks">Remarks:</label>
                <input
                  type="text"
                  id="remarks"
                  name="remarks"
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                />
              </div>
              <button type="submit" className="apply-btn">
                Apply
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Confirmation Modal */}
      {showPayModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div>
              Are you sure you want to delete{" "}
              <div className="text-[18px] ">
                {selectedCustomer?.customerNameEnglish}
              </div>{" "}
              ?
            </div>
            <div className="modal-actions">
              <button
                onClick={handlePay}
                className="px-8 py-2 rounded-full hover:bg-red-400  bg-red-600 text-white font-bold"
              >
                Confirm Delete
              </button>
              <button
                onClick={() => setShowPayModal(false)}
                className="px-8 py-2 rounded-full hover:bg-gray-300 bg-gray-400 text-white font-bold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer theme="colored" closeButton={false} />
    </div>
  );
}

export default MasikBillingForm;
