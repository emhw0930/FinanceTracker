import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const CategoryStats = ({ transactions }) => {
  const navigate = useNavigate();
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const handleCategoryClick = (category) => {
    navigate('/', { state: { filter: 'category', category: category } });
  };

  // Define categories with their emojis and labels
  const categories = [
    { value: "food", label: "Food & Dining", emoji: "🍽️" },
    { value: "transportation", label: "Transportation", emoji: "🚗" },
    { value: "shopping", label: "Shopping", emoji: "🛍️" },
    { value: "entertainment", label: "Entertainment", emoji: "🎮" },
    { value: "utilities", label: "Utilities", emoji: "🏠" },
    { value: "healthcare", label: "Healthcare", emoji: "🏥" },
    { value: "salary", label: "Salary", emoji: "💰" },
    { value: "investment", label: "Investment", emoji: "📈" },
    { value: "other", label: "Other", emoji: "📌" }
  ];

  // Calculate statistics for each category
  const categoryStats = categories.map(cat => {
    const categoryTransactions = transactions.filter(t => t.category === cat.value);
    const totalAmount = categoryTransactions.reduce((sum, t) => sum + Math.abs(t.amount), 0);
    const count = categoryTransactions.length;
    const expenses = categoryTransactions.filter(t => t.amount < 0)
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);
    const income = categoryTransactions.filter(t => t.amount > 0)
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      ...cat,
      totalAmount,
      count,
      expenses,
      income
    };
  });

  // Sort categories by total amount
  const sortedStats = [...categoryStats].sort((a, b) => b.totalAmount - a.totalAmount);

  // Prepare chart data
  const chartData = {
    labels: sortedStats.map(cat => `${cat.emoji} ${cat.label}`),
    datasets: [
      {
        label: "Income",
        data: sortedStats.map(cat => cat.income),
        backgroundColor: sortedStats.map(cat => 
          hoveredCategory === null || hoveredCategory === cat.value 
            ? "#38a169" 
            : "rgba(56, 161, 105, 0.2)"
        ),
        borderRadius: 6,
      },
      {
        label: "Expenses",
        data: sortedStats.map(cat => cat.expenses),
        backgroundColor: sortedStats.map(cat => 
          hoveredCategory === null || hoveredCategory === cat.value 
            ? "#e53e3e" 
            : "rgba(229, 62, 62, 0.2)"
        ),
        borderRadius: 6,
      }
    ]
  };

  const chartOptions = {
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
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 12
          }
        }
      },
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
      }
    }
  };

  return (
    <div className="category-stats-page">
      <h1>📊 Category Statistics</h1>
      <div className="category-cards">
        {sortedStats.map(cat => (
          <div 
            key={cat.value} 
            className="category-card"
            onMouseEnter={() => setHoveredCategory(cat.value)}
            onMouseLeave={() => setHoveredCategory(null)}
            onClick={() => handleCategoryClick(cat.value)}
            style={{ cursor: 'pointer' }}
            title={`Click to view ${cat.label.toLowerCase()} transactions`}
          >
            <div className="category-header">
              <span className="category-emoji">{cat.emoji}</span>
              <h3>{cat.label}</h3>
            </div>
            <div className="category-details">
              <div className="stat-row">
                <span className="stat-label">Transactions:</span>
                <span className="stat-value">{cat.count}</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Total Income:</span>
                <span className="stat-value positive">
                  <span className="currency">$</span>
                  {cat.income.toFixed(2)}
                </span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Total Expenses:</span>
                <span className="stat-value negative">
                  <span className="currency">$</span>
                  {cat.expenses.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="chart-container">
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
          <h2 style={{ marginBottom: '20px' }}>Income vs Expenses by Category</h2>
          <div style={{ flex: '1', minHeight: '0', width: '100%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {transactions.length === 0 ? (
              <p style={{ color: '#718096', fontSize: '16px' }}>No spending data available.</p>
            ) : (
              <Bar data={chartData} options={chartOptions} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryStats; 