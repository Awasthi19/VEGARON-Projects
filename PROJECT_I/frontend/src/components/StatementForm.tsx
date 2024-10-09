import "./form.css";
import "./billing.css"
import { useState } from "react";

function MasikBillingForm() {
  const [customerName, setCustomerName] = useState("");
  const [customerID, setCustomerID] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  interface statement {
    date: string;
    particulars: string;
    enteredBy: string;
    debit: number | null;
    credit: number | null;
    balance: number;
    remarks: string;
    remarksLink: string;
  }
  
  const statement: statement[] = [
    {
      date: '12/12/2022',
      particulars: 'Administrative Fee of 2080-Kartik',
      enteredBy: 'SYSTEM',
      debit: 15,
      credit: null,
      balance: 15,
      remarks: '',
      remarksLink: '',
    },
    {
      date: '12/12/2022',
      particulars: 'Watta Brddhi 600-1000w of 2080-Mangsir',
      enteredBy: 'SYSTEM',
      debit: 4,
      credit: null,
      balance: 19,
      remarks: '',
      remarksLink: '',
    },
    {
      date: '12/12/2022',
      particulars: 'Bill Payment for 2080/Poush - 2080/Falgun',
      enteredBy: 'RAM PRASAD AWASTHI',
      debit: null,
      credit: 430,
      balance: -2,
      remarks: 'C1536',
      remarksLink: '#C1536',
    },
    {
      date: '12/12/2022',
      particulars: 'Bill Payment for 2080/Chaitra - 2081/Baisakh',
      enteredBy: 'CHANDRA BAHADUR BOHARA',
      debit: null,
      credit: 500,
      balance: -5,
      remarks: 'C2202',
      remarksLink: '#C2202',
    },
    {
      date: '12/12/2022',
      particulars: 'Bill Payment for 2081/Jestha',
      enteredBy: 'CHANDRA BAHADUR BOHARA',
      debit: null,
      credit: 540,
      balance: -1,
      remarks: 'C2948',
      remarksLink: '#C2948',
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
    const results = [{}];

    setSearchResults(results);
  };

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const totalAmount = statement.reduce((acc, curr) => {
    if (curr.credit) {
      return acc + curr.credit;
    }
    return acc;
  }, 0);


  return (
    <div className="form-container">
      <h2>Statement</h2>
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
                    <button onClick={() => Pay(result)} className="disconnect">Statement</button>
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
            <h2>Statement</h2>
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
                        <th>Date</th>
                        <th>Particulars</th>
                        <th>Entered By</th>
                        <th>Debit</th>
                        <th>Credit</th>
                        <th>Balance</th>
                        <th>Remarks</th>
                    </tr>
                </thead>
                <tbody>
                    {statement.length === 0 ? (
                        <tr>
                            <td colSpan={7} style={{ textAlign: "center", padding: "20px" }}>
                                No results found.
                            </td>
                        </tr>
                    ) : (
                        statement
                           
                            .map((result, index) => (
                                <tr key={index}>
                                    <td>{result.date}</td>
                                    <td>{result.particulars}</td>
                                    <td>{result.enteredBy}</td>
                                    <td>{result.debit}</td>
                                    <td>{result.credit}</td>
                                    <td>{result.balance}</td>
                                    <td>
                                        <a href={result.remarksLink} className="remarks-link">
                                            {result.remarks}
                                        </a>
                                    </td>
                                </tr>
                            ))
                    )}
                    <tr className="total-row">
                        <td colSpan={6}>Total</td>
                        <td>{totalAmount}</td>
                    </tr>
                </tbody>
            </table>
        </form>
    </div>
)}



      </div>
    </div>
  );
}

export default MasikBillingForm;
