import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import TransactionList from "./components/TransactionList";
import TransactionForm from "./components/TransactionForm";
import FinancialReport from "./pages/FinancialReport"; // ✅ Pages folder
import SpendingSummaryPage from "./pages/SpendingSummaryPage"; // ✅ Pages folder
import "./styles.css";

const App = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const savedTransactions = JSON.parse(localStorage.getItem("transactions")) || [];
    setTransactions(savedTransactions);
  }, []);

  const addTransaction = (newTransaction) => {
    const updatedTransactions = [newTransaction, ...transactions];
    setTransactions(updatedTransactions);
    localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
  };

  const deleteTransaction = (index) => {
    const updatedTransactions = transactions.filter((_, i) => i !== index);
    setTransactions(updatedTransactions);
    localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
  };

  return (
    <Router>
      <div className="container">
        <Navbar />
        <Routes>
          <Route 
            path="/" 
            element={
              <div>
                <h1>💰 Personal Finance Tracker</h1>
                <TransactionForm addTransaction={addTransaction} />
                <TransactionList transactions={transactions} deleteTransaction={deleteTransaction} />
              </div>
            } 
          />
          <Route path="/report" element={<FinancialReport transactions={transactions} />} />
          <Route path="/spending-summary" element={<SpendingSummaryPage transactions={transactions} />} /> 
        </Routes>
      </div>
    </Router>
  );
};

export default App;
