import "./form.css";
import "./billing.css"
import { useState } from "react";

function LoadMeterReadingForm() {
  const [customerName, setCustomerName] = useState("");
  const [customerID, setCustomerID] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  interface Reading {
    sn: number;
    year: string;
    month: string;
    preUnit: number;
    curUnit: number;
    conUnit: number;
    uploadDate: string;
    readDate: string;
    tariff: string;
    meterStatus: string;
    receipt: string;
    status: string;
  }

  const Reading: Reading[] = [
    {
      sn: 1,
      year: "2080",
      month: "Kartik",
      preUnit: 200,
      curUnit: 250,
      conUnit: 50,
      uploadDate: "12/12/2022",
      readDate: "12/12/2022",
      tariff: "Regular",
      meterStatus: "Active",
      receipt: "C1536",
      status: "Paid",
    },
    {
      sn: 2,
      year: "2080",
      month: "Mangsir",
      preUnit: 250,
      curUnit: 300,
      conUnit: 50,
      uploadDate: "12/12/2022",
      readDate: "12/12/2022",
      tariff: "Regular",
      meterStatus: "Active",
      receipt: "C2202",
      status: "Paid",
    },
    {
      sn: 3,
      year: "2081",
      month: "Poush",
      preUnit: 300,
      curUnit: 340,
      conUnit: 40,
      uploadDate: "12/12/2022",
      readDate: "12/12/2022",
      tariff: "Regular",
      meterStatus: "Active",
      receipt: "C2948",
      status: "Paid",
    },
    // Add more rows as needed
  ];

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

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");




  return (
    <div className="form-container">
      <h2>Load Meter Reading</h2>
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
                    <button onClick={() => Pay(result)} className="disconnect">reading</button>
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
          <div className="statement-result">
            <div className="statement-header">
              <h2>Meter Reading</h2>
              <div className="customer-details">
                <div>Customer Name: {customerName}</div>
                <div>Customer ID: {customerID}</div>
                <div>Address: bank</div>
                <div>Mobile Number: 9862466900</div>
              </div>
            </div>
            <div className="date-range">
              <label htmlFor="startDate">Start Date:</label>
              <input 
                type="date" 
                id="startDate" 
                value={startDate} 
                onChange={(e) => setStartDate(e.target.value)} 
              />
              <label htmlFor="endDate">End Date:</label>
              <input 
                type="date" 
                id="endDate" 
                value={endDate} 
                onChange={(e) => setEndDate(e.target.value)} 
              />
            </div>

            <form onSubmit={handlePay} className="billing-container">
              <table>
                <thead>
                  <tr>
                    <th>S.N.</th>
                    <th>Year</th>
                    <th>Month</th>
                    <th>Pre Unit</th>
                    <th>Cur Unit</th>
                    <th>Con Unit</th>
                    <th>Upload Date</th>
                    <th>Read Date</th>
                    <th>Tariff</th>
                    <th>Meter Status</th>
                    <th>Receipt</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {Reading.length === 0 ? (
                    <tr>
                      <td colSpan={12} style={{ textAlign: "center", padding: "20px" }}>
                        No results found.
                      </td>
                    </tr>
                  ) : (
                    Reading.map((result, index) => (
                      <tr key={index}>
                        <td>{result.sn}</td>
                        <td>{result.year}</td>
                        <td>{result.month}</td>
                        <td>{result.preUnit}</td>
                        <td>{result.curUnit}</td>
                        <td>{result.conUnit}</td>
                        <td>{result.uploadDate}</td>
                        <td>{result.readDate}</td>
                        <td>{result.tariff}</td>
                        <td>{result.meterStatus}</td>
                        <td>{result.receipt}</td>
                        <td>{result.status}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </form>
          </div>
        )}


      </div>
    </div>
  );
}

export default LoadMeterReadingForm;
