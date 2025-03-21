import React from "react";
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
      <h1>📅 Spending Summary</h1>
      <div className="spending-stats">
        <SpendingSummary transactions={formattedTransactions} />
      </div>
      <div className="chart-container">
        <MonthlySpendingChart transactions={formattedTransactions} />
      </div>
    </div>
  );
};

export default SpendingSummaryPage;
