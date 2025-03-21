import React, { useState } from "react";

const TransactionForm = ({ addTransaction }) => {
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(getCurrentDate()); // Default to today's date
  const [category, setCategory] = useState("other");

  const categories = [
    { value: "food", label: "🍽️ Food & Dining" },
    { value: "transportation", label: "🚗 Transportation" },
    { value: "shopping", label: "🛍️ Shopping" },
    { value: "entertainment", label: "🎮 Entertainment" },
    { value: "utilities", label: "🏠 Utilities" },
    { value: "healthcare", label: "🏥 Healthcare" },
    { value: "salary", label: "💰 Salary" },
    { value: "investment", label: "📈 Investment" },
    { value: "other", label: "📌 Other" }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !amount || !date) {
      alert("Please enter name, amount, and date.");
      return;
    }

    const newTransaction = {
      name,
      amount: parseFloat(amount),
      date: new Date(date + "T00:00:00Z"), // Store in UTC
      category
    };

    addTransaction(newTransaction);
    setName("");
    setAmount("");
    setDate(getCurrentDate()); // Reset to today's date after submission
  };

  return (
    <div>
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
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="category-select"
        >
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
        <button type="submit">Add Transaction</button>
      </form>
    </div>
  );
};

export default TransactionForm;
