"use client";

import "./form.css";

import React, { useState, ChangeEvent, useRef } from "react";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChargesTable from "@/components/chargestable";

function EditCustomerForm() {
  const placeholder1 = ["Search by Customer Name"];
  const placeholder2 = ["Search by Customer ID"];

  const [customerNameQuery, setCustomerNameQuery] = useState("");
  const [customerIDQuery, setCustomerIDQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

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

  const handleEdit = () => {
    setIsFormEditable(true);
    setCharges([]);
    setShowCharges(false);
  };

  const [EditCustomer, setEditCustomer] = useState<any>(null);
  const [BeforeEditCustomer, setBeforeEditCustomer] = useState<any>(null);

  const edit = (customer: any) => {
    setBeforeEditCustomer(customer);
    setEditCustomer(customer);
    setTimeout(() => {
      if (editCustomerRef.current) {
        const tablePosition =
          editCustomerRef.current.getBoundingClientRect().top + window.scrollY; // Get table's position
        const offset = 100; // Adjust this value to control where the scroll stops (higher = scrolls less)

        window.scrollTo({
          top: tablePosition - offset,
          behavior: "smooth",
        });
      }
    }, 100); // Ensure the table renders first
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditCustomer({ ...EditCustomer, [name]: value });
  };

  interface Charge {
    id: number;
    type: string;
    amount: number;
    paid: number;
    checked: boolean;
  }

  const [charges, setCharges] = useState<Charge[]>([]);
  const [receivedAmount, setReceivedAmount] = useState(0);

  const handleReceivedAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setReceivedAmount(Number(value));
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const chargeData = charges
      .filter((charge) => charge.checked)
      .map((charge) => ({
        description: charge.type,
        charge: charge.amount,
      }));
    try {
      const response = await axios.patch(process.env.NEXT_PUBLIC_EDIT_URL!, {
        customerNumber: EditCustomer.customerNumber,
        registrationDate: EditCustomer.registrationDate,
        meterConnectedDate: EditCustomer.meterConnectedDate,
        customerNameEnglish: EditCustomer.customerNameEnglish,
        customerNameNepali: EditCustomer.customerNameNepali,
        citizenshipNumber: EditCustomer.citizenshipNumber,
        addressEnglish: EditCustomer.addressEnglish,
        addressNepali: EditCustomer.addressNepali,
        politicalWard: EditCustomer.politicalWard,
        marga: EditCustomer.marga,
        areaNumber: EditCustomer.areaNumber,
        mobileNumber: EditCustomer.mobileNumber,
        meterStatus: EditCustomer.meterStatus,
        customerType: EditCustomer.customerType,
        meterType: EditCustomer.meterType,
        meterSerial: EditCustomer.meterSerial,
        todMeter: EditCustomer.todMeter,
        meterInitialReading: EditCustomer.meterInitialReading,
        readingEffectiveDate: EditCustomer.readingEffectiveDate,
        numberOfConsumers: EditCustomer.numberOfConsumers,
        wireType: EditCustomer.wireType,
        wireSize: EditCustomer.wireSize,
        transformer: EditCustomer.transformer,
        editCharges: chargeData,
        recerivedAmount: EditCustomer.receivedAmount,
        Boolean: EditCustomer.yourBooleanValue,
      });

      console.log("response", response.data);
      if (response.data.success) {
        toast.success("Edited successfully", { theme: "colored" });
        try {
          const receivedAmountData = new FormData();
          receivedAmountData.append(
            "customerNumber",
            EditCustomer.customerNumber
          );
          receivedAmountData.append(
            "receivedAmount",
            receivedAmount.toString()
          );
          const response = await axios.post(
            process.env.NEXT_PUBLIC_ADMINISTRATIVECHARGEPAYMENT_URL!,
            receivedAmountData
          );
          console.log("response", response.data);
          if (response.data.success) {
            toast.success("Payment Recorded", { theme: "colored" });
            console.log("Payment Recorded");
          } else {
            console.log("Payment failed");
            toast.error("Payment failed", { theme: "colored" });
          }
        } catch (error: any) {
          console.log(error.message);
          toast.error(error.message);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [isFormEditable, setIsFormEditable] = useState(true);
  const [showCharges, setShowCharges] = useState(false);
  const tableRef = useRef<HTMLDivElement>(null);

  const handleContinue = () => {
    setIsFormEditable(false);
    const appliedCharges = [...charges];

    const addChargeIfNotExists = (newCharge: any) => {
      const chargeExists = appliedCharges.some(
        (charge) => charge.id === newCharge.id
      );
      if (!chargeExists) {
        appliedCharges.push(newCharge);
      }
    };

    if (
      EditCustomer.customerNameEnglish !==
      BeforeEditCustomer.customerNameEnglish
    ) {
      addChargeIfNotExists({
        id: 1,
        type: "Naamsari sulka",
        amount: 150,
        paid: 150,
        checked: true,
      });
    }

    if (EditCustomer.addressEnglish !== BeforeEditCustomer.addressEnglish) {
      addChargeIfNotExists({
        id: 2,
        type: "Thausari sulka",
        amount: 1500,
        paid: 1500,
        checked: true,
      });
    }

    if (EditCustomer.meterSerial !== BeforeEditCustomer.meterSerial) {
      addChargeIfNotExists({
        id: 3,
        type: "Change meter",
        amount: 500,
        paid: 500,
        checked: true,
      });
    }

    if (appliedCharges.length > 0) {
      console.log("appliedCharges", appliedCharges);
      setCharges(appliedCharges);
      setShowCharges(true);
    }

    setTimeout(() => {
      if (tableRef.current) {
        const tablePosition =
          tableRef.current.getBoundingClientRect().top + window.scrollY; // Get table's position
        const offset = 100; // Adjust this value to control where the scroll stops (higher = scrolls less)

        window.scrollTo({
          top: tablePosition - offset,
          behavior: "smooth",
        });
      }
    }, 100); // Ensure the table renders first
  };

  const handleCancel = () => {};

  const editCustomerRef = useRef<HTMLDivElement>(null);

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
                      onClick={() => edit(result)}
                      className="  px-8 py-2 rounded-md bg-teal-500 text-white font-bold transition duration-200  border-2 border-transparent "
                    >
                      Edit
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

      {EditCustomer && (
        <>
          <div className="form-container" ref={editCustomerRef}>
            <h2>Edit Customer</h2>
            <form className="registration-form text-custom-light dark:text-custom-dark dark:bg-custom-dark bg-custom-light ">
              <div className="form-section">
                <h3>Basic Information</h3>

                <div className="form-group">
                  <label htmlFor="customerNumber">
                    Customer No. <span className="required-dot"></span>
                  </label>
                  <input
                    type="text"
                    id="customerNumber"
                    name="customerNumber"
                    value={EditCustomer.customerNumber}
                    onChange={handleChange}
                    disabled={!isFormEditable}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="customerNameEnglish">
                    Customers Name (English)
                    <span className="required-dot"></span>
                  </label>
                  <input
                    type="text"
                    id="customerNameEnglish"
                    name="customerNameEnglish"
                    value={EditCustomer.customerNameEnglish}
                    onChange={handleChange}
                    disabled={!isFormEditable}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="customerNameNepali">
                    Customers Name (Nepali)
                    <span className="required-dot"></span>
                  </label>
                  <input
                    type="text"
                    id="customerNameNepali"
                    name="customerNameNepali"
                    value={EditCustomer.customerNameNepali}
                    onChange={handleChange}
                    disabled={!isFormEditable}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="gender">
                    Gender <span className="required-dot"></span>{" "}
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    value={EditCustomer.gender}
                    onChange={handleChange}
                    disabled={!isFormEditable}
                    required
                  >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="citizenshipNumber">Citizenship No.</label>
                  <input
                    type="text"
                    id="citizenshipNumber"
                    name="citizenshipNumber"
                    value={EditCustomer.citizenshipNumber}
                    onChange={handleChange}
                    disabled={!isFormEditable}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="citizenshipIssueDate">
                    Citizenship Issue Date
                  </label>
                  <input
                    type="date"
                    id="citizenshipIssueDate"
                    name="citizenshipIssueDate"
                    value={EditCustomer.citizenshipIssueDate}
                    onChange={handleChange}
                    disabled={!isFormEditable}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="citizenshipIssueDistrict">
                    Citizenship Issue District
                  </label>
                  <input
                    type="text"
                    id="citizenshipIssueDistrict"
                    name="citizenshipIssueDistrict"
                    value={EditCustomer.citizenshipIssueDistrict}
                    onChange={handleChange}
                    disabled={!isFormEditable}
                  />
                </div>
              </div>

              <div className="form-section text-custom-light dark:text-custom-dark">
                <h3>Address Information</h3>

                <div className="form-group text-custom-light dark:text-custom-dark  ">
                  <label htmlFor="addressEnglish">
                    Address (English) <span className="required-dot"></span>{" "}
                  </label>
                  <input
                    type="text"
                    id="addressEnglish"
                    name="addressEnglish"
                    value={EditCustomer.addressEnglish}
                    onChange={handleChange}
                    disabled={!isFormEditable}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="addressNepali">
                    Address (Nepali) <span className="required-dot"></span>{" "}
                  </label>
                  <input
                    type="text"
                    id="addressNepali"
                    name="addressNepali"
                    value={EditCustomer.addressNepali}
                    onChange={handleChange}
                    disabled={!isFormEditable}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="marga">Marga</label>
                  <input
                    type="text"
                    id="marga"
                    name="marga"
                    value={EditCustomer.marga}
                    onChange={handleChange}
                    disabled={!isFormEditable}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="mobileNumber">Mobile Number </label>
                  <input
                    type="text"
                    id="mobileNumber"
                    name="mobileNumber"
                    value={EditCustomer.mobileNumber}
                    onChange={handleChange}
                    disabled={!isFormEditable}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="spouseName">Spouse Name </label>
                  <input
                    type="text"
                    id="spouseName"
                    name="spouseName"
                    value={EditCustomer.spouseName}
                    onChange={handleChange}
                    disabled={!isFormEditable}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="fatherName">Father Name </label>
                  <input
                    type="text"
                    id="fatherName"
                    name="fatherName"
                    value={EditCustomer.fatherName}
                    onChange={handleChange}
                    disabled={!isFormEditable}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="grandFatherName">Grandfather Name </label>
                  <input
                    type="text"
                    id="grandFatherName"
                    name="grandFatherName"
                    value={EditCustomer.grandFatherName}
                    onChange={handleChange}
                    disabled={!isFormEditable}
                    required
                  />
                </div>
              </div>

              <div className="form-section">
                <h3>Meter Information</h3>

                <div className="form-group">
                  <label htmlFor="meterStatus">
                    Meter Status <span className="required-dot"></span>
                  </label>
                  <select
                    id="meterStatus"
                    name="meterStatus"
                    value={EditCustomer.meterStatus}
                    onChange={handleChange}
                    disabled={!isFormEditable}
                    required
                  >
                    <option value="">Select</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="customerType">
                    Customer Type <span className="required-dot"></span>{" "}
                  </label>
                  <select
                    id="customerType"
                    name="customerType"
                    value={EditCustomer.customerType}
                    onChange={handleChange}
                    disabled={!isFormEditable}
                    required
                  >
                    <option value="">Select</option>
                    <option value="Private">Private</option>
                    <option value="Agriculture">Agriculture</option>
                    <option value="Udhyog">Udhyog</option>
                    <option value="School">School</option>
                    <option value="Temple">Temple</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="ampereRating">
                    Meter Ampere Rating <span className="required-dot"></span>
                  </label>
                  <select
                    id="ampereRating"
                    name="ampereRating"
                    value={EditCustomer.ampereRating}
                    onChange={handleChange}
                    disabled={!isFormEditable}
                    required
                  >
                    <option value="">Select</option>
                    <option value="0.5 AMP"></option>
                    <option value="1 AMP"></option>
                    <option value="1.6 AMP"></option>
                    <option value="2 AMP"></option>
                    <option value="3 AMP"></option>
                    <option value="6 AMP"></option>
                    <option value="10 AMP"></option>
                    <option value="16 AMP"></option>
                    <option value="32 AMP"></option>
                    <option value="3 HP"></option>
                    <option value="24 HP"></option>
                    <option value="25 HP"></option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="meterSerial">
                    Meter Serial <span className="required-dot"></span>{" "}
                  </label>
                  <input
                    type="text"
                    id="meterSerial"
                    name="meterSerial"
                    value={EditCustomer.meterSerial}
                    onChange={handleChange}
                    disabled={!isFormEditable}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="meterInitialReading">
                    Meter Initial Reading <span className="required-dot"></span>{" "}
                  </label>
                  <input
                    type="number"
                    id="meterInitialReading"
                    name="meterInitialReading"
                    value={EditCustomer.meterInitialReading}
                    onChange={handleChange}
                    disabled={!isFormEditable}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="transformer">Transformer </label>
                  <select
                    id="transformer"
                    name="transformer"
                    value={EditCustomer.transformer}
                    onChange={handleChange}
                    disabled={!isFormEditable}
                    required
                  >
                    <option value="">Select</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                </div>
              </div>

              <div className="form-section">
                <h3>Additional Information</h3>

                <div className="form-group">
                  <label htmlFor="nibedanDartaNUmber">
                    Nibedan Darta Number <span className="required-dot"></span>{" "}
                  </label>
                  <input
                    type="number"
                    id="nibedanDartaNUmber"
                    name="nibedanDartaNUmber"
                    value={EditCustomer.nibedanDartaNUmber}
                    onChange={handleChange}
                    disabled={!isFormEditable}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="registrationDate">
                    Registration Date <span className="required-dot"></span>{" "}
                  </label>
                  <input
                    type="date"
                    id="registrationDate"
                    name="registrationDate"
                    value={EditCustomer.registrationDate}
                    onChange={handleChange}
                    disabled={!isFormEditable}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="meterConnectedDate">
                    Meter Connection Date <span className="required-dot"></span>{" "}
                  </label>
                  <input
                    type="date"
                    id="meterConnectedDate"
                    name="meterConnectedDate"
                    value={EditCustomer.meterConnectedDate}
                    onChange={handleChange}
                    disabled={!isFormEditable}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="readingEffectiveDate">
                    Reading Effective Date
                    <span className="required-dot"></span>
                  </label>
                  <input
                    type="date"
                    id="readingEffectiveDate"
                    name="readingEffectiveDate"
                    value={EditCustomer.readingEffectiveDate}
                    onChange={handleChange}
                    disabled={!isFormEditable}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="numberOfConsumers">Number of Consumers</label>
                  <input
                    type="number"
                    id="numberOfConsumers"
                    name="numberOfConsumers"
                    value={EditCustomer.numberOfConsumers}
                    onChange={handleChange}
                    disabled={!isFormEditable}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="dob">Date of Birth</label>
                  <input
                    type="date"
                    id="dob"
                    name="dob"
                    value={EditCustomer.dob}
                    onChange={handleChange}
                    disabled={!isFormEditable}
                  />
                </div>
              </div>
            </form>
          </div>

          <div className="py-4">
            {isFormEditable ? (
              <div className="flex space-x-20 items-center justify-center">
                <button
                  onClick={handleContinue}
                  className="px-12 py-4 rounded-full bg-[#d71e1e]  font-bold text-white tracking-widest uppercase transform hover:scale-105 hover:bg-[#d71e1ec4] transition-colors duration-200"
                >
                  Clear
                </button>
                <button
                  onClick={handleContinue}
                  className="px-12 py-4 rounded-full bg-[#1ED760] font-bold text-white tracking-widest uppercase transform hover:scale-105 hover:bg-[#1ed75fc5] transition-colors duration-200"
                >
                  Continue
                </button>
              </div>
            ) : (
              <>
                <div className="flex space-x-20 items-center justify-center">
                  <button
                    onClick={handleEdit}
                    className="px-12 py-4 rounded-full bg-[#d71e1e]  font-bold text-white tracking-widest uppercase transform hover:scale-105 hover:bg-[#d71e1ec4] transition-colors duration-200"
                  >
                    Previous
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="px-12 py-4 rounded-full bg-[#1ED760] font-bold text-white tracking-widest uppercase transform hover:scale-105 hover:bg-[#1ed75fc5] transition-colors duration-200"
                  >
                    Save
                  </button>
                </div>
              </>
            )}
          </div>
        </>
      )}

      {showCharges && (
        <div className="pt-7" ref={tableRef}>
          <ChargesTable
            charges={charges}
            setCharges={setCharges}
            formData={EditCustomer}
            handleChange={handleChange}
          />
        </div>
      )}

      <ToastContainer theme="colored" closeButton={false} />
    </div>
  );
}

export default EditCustomerForm;
