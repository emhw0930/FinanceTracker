import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const MonthlySpendingChart = ({ transactions }) => {
  if (!transactions || transactions.length === 0) {
    return <div className="chart-container">No spending data available.</div>;
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
    }
  });

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Monthly Spending ($)",
        data: monthlySpending,
        backgroundColor: "#4299e1",
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
            weight: '500'
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: {
          size: 14,
          weight: '600'
        },
        bodyFont: {
          size: 13
        },
        displayColors: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.06)',
        },
        ticks: {
          font: {
            size: 12
          }
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 12
          }
        }
      }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
      <h2 style={{ marginBottom: '20px' }}>Monthly Spending ({currentYear})</h2>
      <div style={{ flex: '1', minHeight: '0', width: '100%', position: 'relative' }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default MonthlySpendingChart;
