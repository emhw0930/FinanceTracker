import React, { useState, useEffect, useCallback } from "react";

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

  // Keyword mappings for automatic category suggestion
  const categoryKeywords = {
    food: [
      "restaurant", "food", "grocery", "dinner", "lunch", "breakfast",
      "cafe", "coffee", "takeout", "meal", "snack", "drink",
      "burger", "pizza", "sushi", "Wee", "supermarket"
    ],
    transportation: [
      "gas", "fuel", "parking", "uber", "lyft", "taxi", "bus",
      "train", "subway", "metro", "car", "vehicle", "maintenance",
      "repair", "oil change", "tire"
    ],
    shopping: [
      "amazon", "walmart", "target", "store", "mall", "clothes",
      "shoes", "clothing", "electronics", "phone", "computer",
      "laptop", "accessory", "gift"
    ],
    entertainment: [
      "movie", "theatre", "concert", "show", "game", "netflix",
      "spotify", "music", "subscription", "disney+", "hulu",
      "ticket", "event", "festival"
    ],
    utilities: [
      "rent", "electricity", "water", "gas bill", "internet",
      "phone bill", "wifi", "utility", "cable", "mortgage",
      "insurance", "maintenance"
    ],
    healthcare: [
      "doctor", "medical", "hospital", "pharmacy", "medicine",
      "dental", "dentist", "health", "clinic", "prescription",
      "therapy", "insurance"
    ],
    salary: [
      "salary", "paycheck", "wage", "income", "payment",
      "bonus", "commission", "overtime", "reimbursement"
    ],
    investment: [
      "stock", "bond", "dividend", "investment", "crypto",
      "bitcoin", "eth", "mutual fund", "trading", "interest",
      "return", "profit"
    ]
  };

  // Function to suggest category based on transaction name
  const suggestCategory = useCallback((transactionName) => {
    const lowercaseName = transactionName.toLowerCase();
    
    // Check each category's keywords
    for (const [category, keywords] of Object.entries(categoryKeywords)) {
      if (keywords.some(keyword => lowercaseName.includes(keyword.toLowerCase()))) {
        return category;
      }
    }
    
    return "other"; // Default category if no match found
  }, [categoryKeywords]);

  // Update category when transaction name changes
  useEffect(() => {
    if (name.trim()) {
      const suggestedCategory = suggestCategory(name);
      setCategory(suggestedCategory);
    }
  }, [name, suggestCategory]);

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
    setCategory("other");
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
