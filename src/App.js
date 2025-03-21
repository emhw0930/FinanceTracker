import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import FinancialReport from "./pages/FinancialReport";
import SpendingSummaryPage from "./pages/SpendingSummaryPage";
import CategoryStats from "./pages/CategoryStats";
import "./styles.css";

const App = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const savedTransactions = JSON.parse(localStorage.getItem("transactions")) || [];
    setTransactions(savedTransactions);
  }, []);

  const addTransaction = (newTransaction) => {
    setTransactions([...transactions, newTransaction]);
    localStorage.setItem("transactions", JSON.stringify([...transactions, newTransaction]));
  };

  const deleteTransaction = (index) => {
    const updatedTransactions = transactions.filter((_, i) => i !== index);
    setTransactions(updatedTransactions);
    localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
  };

  return (
    <Router basename="/FinanceTracker"> {/* ✅ Fix for GitHub Pages */}
      <div className="container">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home transactions={transactions} addTransaction={addTransaction} deleteTransaction={deleteTransaction} />}/>
          <Route path="/report" element={<FinancialReport transactions={transactions} />} />
          <Route path="/spending-summary" element={<SpendingSummaryPage transactions={transactions} />} />
          <Route path="/category-stats" element={<CategoryStats transactions={transactions} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
