import React from "react";
import { Bar } from "react-chartjs-2";
import { Link } from "react-router-dom";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import SpendingSummary from "./SpendingSummary.js"; // ✅ Corrected Import

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const FinancialReport = ({ transactions }) => {
  if (!transactions || transactions.length === 0) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <h2>Financial Report</h2>
        <p>No transactions available.</p>
        <Link to="/" style={{ textDecoration: "none", color: "#007bff" }}>
          ← Back to Home
        </Link>
      </div>
    );
  }

  const totalIncome = transactions
    .filter((transaction) => transaction.amount > 0)
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalExpenses = transactions
    .filter((transaction) => transaction.amount < 0)
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const balance = totalIncome + totalExpenses;

  const data = {
    labels: ["Income", "Expenses"],
    datasets: [
      {
        label: "Amount ($)",
        data: [totalIncome, Math.abs(totalExpenses)],
        backgroundColor: ["#4CAF50", "#F44336"],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="financial-report" style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>Financial Report</h2>
      <p><strong>Total Income:</strong> ${totalIncome.toFixed(2)}</p>
      <p><strong>Total Expenses:</strong> ${Math.abs(totalExpenses).toFixed(2)}</p>
      <p><strong>Balance:</strong> ${balance.toFixed(2)}</p>

      {/* ✅ Spending Summary Now Displays Here */}
      <SpendingSummary transactions={transactions} />

      <div style={{ width: "80%", maxWidth: "400px", margin: "20px auto", height: "250px" }}>
        <Bar data={data} options={options} />
      </div>

      <Link to="/" style={{ display: "block", marginTop: "20px", textDecoration: "none", color: "#007bff" }}>
        ← Back to Home
      </Link>
    </div>
  );
};

export default FinancialReport;
