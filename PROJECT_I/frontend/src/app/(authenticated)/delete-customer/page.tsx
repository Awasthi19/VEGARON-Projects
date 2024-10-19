"use client"
import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import "./form.css";

function DeleteCustomerForm() {
  const placeholder1 = ["Search by Customer Name"];
  const placeholder2 = ["Search by Customer ID"];

  const [customerNameQuery, setCustomerNameQuery] = useState("");
  const [customerIDQuery, setCustomerIDQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

  const handleSearch = async (e: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>) => {
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

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        process.env.NEXT_PUBLIC_DELETECUSTOMER_URL!,
        { data: { customerNumber: selectedCustomer.customerNumber } }
      );
      console.log("response", response.data);
      if (response.data.success) {
        toast.success("Deletion successful", { theme: "colored" });
        // Update search results to remove deleted customer
        setSearchResults(prevResults => prevResults.filter(result => result.customerNumber !== selectedCustomer.customerNumber));
      } else {
        toast.error("Deletion failed", { theme: "colored" });
      }
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
    // Close the modal after deletion attempt
    setShowDeleteModal(false);
  };

  const confirmDelete = (customer: any) => {
    setSelectedCustomer(customer);
    setShowDeleteModal(true); // Open modal
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
                <td colSpan={12} style={{ textAlign: "center", padding: "20px" }}>
                  No results found.
                </td>
              </tr>
            ) : (
              searchResults.map((result, index) => (
                <tr key={index}>
                  <td>
                    <button
                      onClick={() => confirmDelete(result)} // Pass result to confirmDelete
                      className="px-8 py-2 rounded-md bg-teal-500 text-white font-bold transition duration-200  border-2 border-transparent"
                    >
                      Delete
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

      {/* Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div>Are you sure you want to delete <div className="text-[18px] ">{selectedCustomer?.customerNameEnglish}</div> ?</div>
            <div className="modal-actions">
              <button onClick={handleDelete} className="px-8 py-2 rounded-full hover:bg-red-400  bg-red-600 text-white font-bold">
                Confirm Delete
              </button>
              <button onClick={() => setShowDeleteModal(false)} className="px-8 py-2 rounded-full hover:bg-gray-300 bg-gray-400 text-white font-bold">
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

export default DeleteCustomerForm;
