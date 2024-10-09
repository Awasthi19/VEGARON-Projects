import React, { ChangeEvent } from "react";

interface Charge {
  id: number;
  type: string;
  amount: number;
  paid: number;
  checked: boolean;
}

interface ChargesTableProps {
  charges: Charge[];
  setCharges: React.Dispatch<React.SetStateAction<Charge[]>>;
  formData: { receivedAmount: string };
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ChargesTable: React.FC<ChargesTableProps> = ({
  charges,
  setCharges,
  formData,
  handleChange,
}) => {
  // Calculate the total amount
  const totalAmount = charges.reduce(
    (acc, charge) => acc + (charge.checked ? charge.amount : 0),
    0
  );

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setCharges((prevCharges) =>
      prevCharges.map((charge) =>
        charge.type === name ? { ...charge, checked } : charge
      )
    );
  };

  return (
    <div className="charges-table dark:bg-custom-dark bg-custom-light text-custom-light dark:text-custom-dark">
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Charge Amount</th>
            <th>Paid Amount</th>
          </tr>
        </thead>
        <tbody>
          {charges.map((charge) => (
            <tr key={charge.id}>
              <td>
                <div className="flex">
                  <input
                    type="checkbox"
                    name={charge.type}
                    checked={charge.checked}
                    onChange={handleCheckboxChange}
                  />
                  <div>{charge.type}</div>
                </div>
              </td>
              <td>{charge.amount}</td>
              <td>
                <input type="number" value={charge.paid} readOnly />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex space-x-10">
        <div className="form-group pt-4 pl-10">
          <label htmlFor="Received Amount">Received Amount</label>
          <input
            type="text"
            id="receivedAmount"
            name="receivedAmount"
            value={formData.receivedAmount}
            onChange={handleChange}
            required
          />
        </div>
        <div className="card dark:bg-custom-dark bg-custom-light text-custom-light dark:text-custom-dark">
          <div className="text">Total amount is</div>
          <div className="flex items-center justify-center">
            <div className="text-green-600 pr-2 text-2xl">NPR </div>
            <div className="amount">{totalAmount}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChargesTable;
