import React from "react";
import { Bar } from "react-chartjs-2";
import { Link } from "react-router-dom";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const FinancialReport = ({ transactions }) => {
  // Calculate total income and expenses
  const totalIncome = transactions
    .filter((transaction) => transaction.amount > 0)
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalExpenses = transactions
    .filter((transaction) => transaction.amount < 0)
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const balance = totalIncome + totalExpenses; // Expenses are negative

  // Chart Data
  const data = {
    labels: ["Income", "Expenses"],
    datasets: [
      {
        label: "Amount ($)",
        data: [totalIncome, Math.abs(totalExpenses)], // Convert expenses to positive for visualization
        backgroundColor: ["#4CAF50", "#F44336"], // Green for income, Red for expenses
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

      {/* Chart */}
      <div style={{ width: "80%", maxWidth: "400px", margin: "20px auto", height: "250px" }}>
        <Bar data={data} options={options} />
      </div>

      {/* Back to Home Button */}
      <Link to="/" style={{ display: "block", marginTop: "20px", textDecoration: "none", color: "#007bff" }}>
        ← Back to Home
      </Link>
    </div>
  );
};

export default FinancialReport;
