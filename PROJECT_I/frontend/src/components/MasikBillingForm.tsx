import "./form.css";
import "./billing.css"
import { useState } from "react";

function MasikBillingForm() {
  const [customerName, setCustomerName] = useState("");
  const [customerID, setCustomerID] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const [amountReceived, setAmountReceived] = useState<string>("");
    

    const [payer, setPayer] = useState<any>(null);
    const Pay = (customer: any) => {
        setPayer(customer); 
    };

    const [field, setfield] = useState<any>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
            setfield({ ...field, [name]: value });
    };

  const [charges, setCharges] = useState<string>("");
  const [remarks, setRemarks] = useState<string>("");


  const handlePay = () => {
    // Handle payment logic here
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Mock data for search results
    const results = [
      {
        sn: 1,
        name: "Kalawati Tiruwa",
        customerNo: "626-21",
        osNo: "21",
        mobile: "",
        address: "Krishnapur-2, Bank",
        feeder: "2",
        loadCenter: "1",
        type: "Private",
        status: "Meter Connection Active",
        advance: "2.00",
      },
    ];

    setSearchResults(results);
  };




  return (
    <div className="form-container">
      <h2>Masik Billing</h2>
      <form onSubmit={handleSubmit} className="registration-form">
        <div className="form-group">
          <label htmlFor="customerName">Customer Name</label>
          <input
            type="text"
            id="customerName"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="customerID">Customer ID</label>
          <input
            type="text"
            id="customerID"
            value={customerID}
            onChange={(e) => setCustomerID(e.target.value)}
          />
        </div>
        <button className="relative -top-4 ml-[100px]" type="submit">Search</button>
      </form>

      <div className="search-results">
        <table>
          <thead>
            <tr>
              <th>Action</th>
              <th>S.N.</th>
              <th>Name</th>
              <th>Customer No.</th>
              <th>O.S. No.</th>
              <th>Mobile Number</th>
              <th>Address(Tole)</th>
              <th>Feeder</th>
              <th>Load Center</th>
              <th>Type</th>
              <th>Status</th>
              <th>Advance</th>
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
                    <button onClick={() => Pay(result)} className="disconnect">Pay</button>
                  </td>
                  <td>{result.sn}</td>
                  <td>{result.name}</td>
                  <td>{result.customerNo}</td>
                  <td>{result.osNo}</td>
                  <td>{result.mobile}</td>
                  <td>{result.address}</td>
                  <td>{result.feeder}</td>
                  <td>{result.loadCenter}</td>
                  <td>{result.type}</td>
                  <td>{result.status}</td>
                  <td>{result.advance}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {payer && (
    <form onSubmit={handlePay} className="billing-container">
        <div className="customer-info">
            <p><strong>Customer No.:</strong> {payer.customerNo}</p>
            <p><strong>Customers Name:</strong> {payer.name}</p>
            <p><strong>Area:</strong> {payer.feeder} / {payer.loadCenter}</p>
            <p><strong>Address(Tole):</strong> {payer.address}</p>
            <p><strong>Contact Number:</strong> {payer.mobile}</p>
        </div>



        <div className="payment-summary">

            <div className="text-white bg-[#661919] p-2 rounded-lg border-gray-600 shadow-md font-bold flex ">
              <div className="flex-1 flex">
                <div className="flex-1">Total Amount:</div>  
                <div className="flex-1">{payer.advance}</div>
              </div>
              <div className="flex-1 flex">
                <div className="flex-1">Advance Amount:</div>  
                <div className="flex-1">{payer.advance}</div>
              </div>
            </div>
           
            <div className="p-4 my-2 bg-gray-800 text-white rounded-lg text-center">
        <p className="text-lg font-semibold">To Pay Amount:</p>
        <p className="text-2xl font-bold">{Number(payer.advance) - Number(charges)}</p>
    </div>

            <label htmlFor="receivedAmount">Received Amount:</label>
            <input id="receivedAmount" name="receivedAmount" value={amountReceived} onChange={(e) => setAmountReceived(e.target.value)} />

            <div className="text-white bg-[rgb(38,59,18)] p-2 rounded-lg border-gray-600 shadow-md font-bold flex mt-4">
              <div className="flex-1 flex">
                <div className="flex-1">Total Amount:</div>  
                <div className="flex-1">{payer.advance}</div>
              </div>
              <div className="flex-1 flex">
                <div className="flex-1">Advance Amount:</div>  
                <div className="flex-1">{payer.advance}</div>
              </div>
            </div>

            <button type="submit" className="pay-btn">Pay</button>
        </div>

        <div className="charge-section">
            <label htmlFor="otherCharges">Other Charges:</label>
            <select id="otherCharges" name="otherCharges" onChange={handleChange}>
                <option value="">Select one</option>
                {/* Add options as needed */}
            </select>

            <label htmlFor="amount">Amount:</label>
            <input  id="amount" name="amount" value={charges} onChange={(e) => setCharges(e.target.value)} />

            <label htmlFor="remarks">Remarks:</label>
            <input type="text" id="remarks" name="remarks" value={remarks} onChange={(e) => setRemarks(e.target.value)} />

            <button type="submit" className="apply-btn">Apply</button>
        </div>

    </form>
)}

      </div>
    </div>
  );
}

export default MasikBillingForm;
