import React, { useState } from "react";

const TransactionForm = ({ addTransaction }) => {
  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // Ensures the correct local date is stored
  };

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(getCurrentDate()); // Default to today's date

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !amount || !date) {
      alert("Please enter name, amount, and date.");
      return;
    }

    // Convert input date to local time
    const localDate = new Date(date + "T00:00:00");

    const newTransaction = {
      name,
      amount: parseFloat(amount),
      date: localDate, // Store it as a proper Date object
    };

    addTransaction(newTransaction);
    setName("");
    setAmount("");
    setDate(getCurrentDate()); // Reset to today's date after submission
  };

  return (
    <div>
      <h2>Add Transaction</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Transaction Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button type="submit">Add Transaction</button>
      </form>
    </div>
  );
};

export default TransactionForm;
