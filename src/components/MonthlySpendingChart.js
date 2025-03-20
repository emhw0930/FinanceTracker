import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const MonthlySpendingChart = ({ transactions }) => {
    
  if (!transactions || transactions.length === 0) {
    console.log("No transactions found.");
    return <h2>No spending data available.</h2>;
  }

  const currentYear = new Date().getFullYear();
  const monthlySpending = new Array(12).fill(0);

  transactions.forEach((transaction) => {
    if (transaction.date) {
      const date = new Date(transaction.date);
      if (date.getFullYear() === currentYear && transaction.amount < 0) {
        const monthIndex = date.getMonth();
        monthlySpending[monthIndex] += Math.abs(transaction.amount);
      }
    } else {
      console.warn("Transaction without date:", transaction);
    }
  });

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Monthly Spending ($)",
        data: monthlySpending,
        backgroundColor: "#F44336",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <div style={{ width: "80%", maxWidth: "600px", margin: "20px auto", height: "300px" }}>
      <h2>Monthly Spending (This Year)</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default MonthlySpendingChart;
