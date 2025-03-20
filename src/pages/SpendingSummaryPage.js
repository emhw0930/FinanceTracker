import React from "react";
import { Link } from "react-router-dom";
import SpendingSummary from "../components/SpendingSummary";
import MonthlySpendingChart from "../components/MonthlySpendingChart";

const SpendingSummaryPage = ({ transactions }) => {
  // Ensure all transactions have a valid Date object
  const formattedTransactions = transactions.map(transaction => ({
    ...transaction,
    date: new Date(transaction.date), // Convert date string to Date object
  }));

  return (
    <div className="spending-summary-page">
      <h2>Spending Summary</h2>

      {/* Spending Summary */}
      <SpendingSummary transactions={formattedTransactions} />

      {/* Monthly Spending Bar Graph */}
      <MonthlySpendingChart transactions={formattedTransactions} />

      {/* Back to Home Button */}
      <Link to="/" style={{ marginTop: "40px", textDecoration: "none", color: "#007bff" }}>
        ← Back to Home
      </Link>
    </div>
  );
};

export default SpendingSummaryPage;
