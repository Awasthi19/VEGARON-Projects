"use client";

import React, { useState,useEffect, ChangeEvent, FormEvent, useRef } from "react";
import "./form.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import "nepali-datepicker-reactjs/dist/index.css";
import axios from "axios";
import { register } from "module";
import ChargesTable from "@/components/chargestable";
import '../../../public/nepalidatepicker/nepali.datepicker.v4.0.4.min.css';
import '../../../public/nepalidatepicker/nepali.datepicker.v4.0.4.min.js';


interface RegCharge {
  description: string;
  charge: number;
}

interface FormData {
  customerNumber: string;
  registrationDate: string;
  meterConnectedDate: string;
  customerNameEnglish: string;
  customerNameNepali: string;
  citizenshipNumber: string;
  citizenshipIssueDate: string;
  citizenshipIssueDistrict: string;
  addressEnglish: string;
  addressNepali: string;
  marga: string;
  mobileNumber: string;
  meterStatus: string;
  customerType: string;
  ampereRating: string;
  meterSerial: string;
  meterInitialReading: string;
  readingEffectiveDate: string;
  numberOfConsumers: string;
  receivedAmount: string;
  registration_charges: RegCharge[];
  gender: string;
  spouseName: string;
  fatherName: string;
  grandFatherName: string;
  nibedanDartaNUmber: string;
  dob: string;
  transformer: string;
}
function CustomerRegistrationForm() {
  const [formData, setFormData] = useState<FormData>({
    customerNumber: "",
    registrationDate: "",
    meterConnectedDate: "",
    customerNameEnglish: "",
    customerNameNepali: "",
    citizenshipNumber: "",
    citizenshipIssueDate: "",
    citizenshipIssueDistrict: "",
    addressEnglish: "",
    addressNepali: "",
    marga: "",
    mobileNumber: "",
    meterStatus: "",
    customerType: "",
    ampereRating: "",
    meterSerial: "",
    meterInitialReading: "",
    readingEffectiveDate: "",
    numberOfConsumers: "",
    receivedAmount: "",
    registration_charges: [],
    gender: "",
    spouseName: "",
    fatherName: "",
    grandFatherName: "",
    nibedanDartaNUmber: "",
    dob: "",
    transformer: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "meterInitialReading" || name === "numberOfConsumers"
          ? parseFloat(value)
          : value,
    });
  };

  const handleDateChange = (date: string, field: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: date, // dynamically update the corresponding date field
    }));
  };
  
  
  const [charges, setCharges] = useState<Charge[]>([
    { id: 1, type: "sifaris sulka", amount: 150, paid: 150, checked: true },
    {
      id: 2,
      type: "bidhut deposit (16amp)",
      amount: 1500,
      paid: 1500,
      checked: true,
    },
    {
      id: 3,
      type: "new meter registration",
      amount: 500,
      paid: 500,
      checked: true,
    },
    { id: 4, type: "nibedan sulka", amount: 100, paid: 100, checked: true },
  ]);

  const handleRegistration = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      charges
        .filter((charge) => charge.checked)
        .forEach((charge) => {
          // Check if the charge already exists in the array
          if (
            !formData.registration_charges.some(
              (existingCharge) => existingCharge.description === charge.type
            )
          ) {
            formData.registration_charges.push({
              description: charge.type,
              charge: charge.amount,
            });
          }
        });

      const response = await axios.post(
        process.env.NEXT_PUBLIC_REGISTER_URL!,
        formData
      );
      console.log("response", response.data);
      if (response.data.success) {
        toast.success("Registration successful", { theme: "colored" });
        console.log("Registration successful");
        try {
          const response = await axios.post(
            process.env.NEXT_PUBLIC_ADMINISTRATIVECHARGEPAYMENT_URL!,
            formData
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
      } else {
        console.log("Registration failed");
        toast.error("Registration failed", { theme: "colored" });
      }
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  interface Charge {
    id: number;
    type: string;
    amount: number;
    paid: number;
    checked: boolean;
  }

  const [isFormEditable, setIsFormEditable] = useState(true);
  const [showCharges, setShowCharges] = useState(false);
  const tableRef = useRef<HTMLDivElement>(null);

  const handleContinue = () => {
    console.log(formData);
    setIsFormEditable(false);
    setShowCharges(true);
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

  const handleEdit = () => {
    setIsFormEditable(true);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Handle form submission logic
  };

  const handleCancel = () => {
    // Handle cancel logic, maybe reset the form or navigate away
  };


  useEffect(() => {
    const mainInput = document.getElementById('registrationDate') as any;
    if (mainInput) {
      mainInput.nepaliDatePicker({
        ndpTriggerButton: true,
      });
    }
  }, []);
  

  return (
    <div className=" form-container dark:bg-custom-dark bg-custom-light">
      <h2 className="text-custom-light dark:text-custom-dark">
        Customer Registration
      </h2>
      <form
        onSubmit={handleSubmit}
        className="registration-form text-custom-light dark:text-custom-dark dark:bg-custom-dark bg-custom-light "
      >
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
              value={formData.customerNumber}
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
              value={formData.customerNameEnglish}
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
              value={formData.customerNameNepali}
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
              value={formData.gender}
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
              value={formData.citizenshipNumber}
              onChange={handleChange}
              disabled={!isFormEditable}
            />
          </div>

          <div className="form-group">
            <label htmlFor="citizenshipIssueDate">Citizenship Issue Date</label>
            <NepaliDatePicker
              inputClassName="form-control"
              className=""
              value={formData.citizenshipIssueDate}
              onChange={(date) => handleDateChange(date, "citizenshipIssueDate")}
              options={{ calenderLocale: "ne", valueLocale: "en" }}
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
              value={formData.citizenshipIssueDistrict}
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
              value={formData.addressEnglish}
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
              value={formData.addressNepali}
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
              value={formData.marga}
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
              value={formData.mobileNumber}
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
              value={formData.spouseName}
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
              value={formData.fatherName}
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
              value={formData.grandFatherName}
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
              value={formData.meterStatus}
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
              value={formData.customerType}
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
              value={formData.ampereRating}
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
              value={formData.meterSerial}
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
              value={formData.meterInitialReading}
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
              value={formData.transformer}
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
              value={formData.nibedanDartaNUmber}
              onChange={handleChange}
              disabled={!isFormEditable}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="registrationDate">
              Registration Date <span className="required-dot"></span>{" "}
            </label>
            <div className="">
            <NepaliDatePicker
              inputClassName="form-control"
              className=""
              value={formData.registrationDate}
              onChange={(date) => handleDateChange(date, "registrationDate")}
              options={{ calenderLocale: "ne", valueLocale: "en" }}
            />
                  <input
                    type="date"
                    id="registrationDate"
                    name="registrationDate"
                    value={formData.registrationDate}
                    onChange={handleChange}
                    disabled={!isFormEditable}
                    required
                  />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="meterConnectedDate">
              Meter Connection Date <span className="required-dot"></span>{" "}
            </label>
            <NepaliDatePicker
              inputClassName="form-control"
              className=""
              value={formData.meterConnectedDate}
              onChange={(date) => handleDateChange(date, "meterConnectedDate")}
              options={{ calenderLocale: "ne", valueLocale: "en" }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="readingEffectiveDate">
              Reading Effective Date
              <span className="required-dot"></span>
            </label>
            <NepaliDatePicker
              inputClassName="form-control"
              className=""
              value={formData.readingEffectiveDate}
              onChange={(date) => handleDateChange(date, "readingEffectiveDate")}
              options={{ calenderLocale: "ne", valueLocale: "en" }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="numberOfConsumers">Number of Consumers</label>
            <input
              type="number"
              id="numberOfConsumers"
              name="numberOfConsumers"
              value={formData.numberOfConsumers}
              onChange={handleChange}
              disabled={!isFormEditable}
            />
          </div>

          <div className="form-group">
            <label htmlFor="dob">Date of Birth</label>
            <NepaliDatePicker
              inputClassName="form-control"
              className=""
              value={formData.dob}
              onChange={(date) => handleDateChange(date, "dob")}
              options={{ calenderLocale: "ne", valueLocale: "en" }}
            />
          </div>
        </div>
      </form>

      {showCharges && (
        <div className="pt-7" ref={tableRef}>
          <ChargesTable
            charges={charges}
            setCharges={setCharges}
            formData={formData}
            handleChange={handleChange}
          />
        </div>
      )}

      <div className="py-4">
        {isFormEditable ? (
          <div className="flex space-x-20">
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
            <div className="flex space-x-20">
              <button
                onClick={handleEdit}
                className="px-12 py-4 rounded-full bg-[#d71e1e]  font-bold text-white tracking-widest uppercase transform hover:scale-105 hover:bg-[#d71e1ec4] transition-colors duration-200"
              >
                Previous
              </button>
              <button
                onClick={handleRegistration}
                className="px-12 py-4 rounded-full bg-[#1ED760] font-bold text-white tracking-widest uppercase transform hover:scale-105 hover:bg-[#1ed75fc5] transition-colors duration-200"
              >
                Save
              </button>
            </div>
          </>
        )}
      </div>
      <ToastContainer theme="colored" closeButton={false} />
    </div>
  );
}

export default CustomerRegistrationForm;
