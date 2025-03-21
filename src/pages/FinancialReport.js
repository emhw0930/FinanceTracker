import React from "react";
import { Bar } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const FinancialReport = ({ transactions }) => {
  const navigate = useNavigate();

  const handleFilterClick = (type) => {
    navigate('/', { state: { filter: type } });
  };

  if (!transactions || transactions.length === 0) {
    return (
      <div className="financial-report">
        <h1>Financial Report</h1>
        <div className="summary-cards">
          <div className="summary-card" onClick={() => handleFilterClick('income')} style={{ cursor: 'pointer' }}>
            <h3>Total Income</h3>
            <p className="amount positive">
              <span className="currency">$</span>
              0.00
            </p>
          </div>
          <div className="summary-card" onClick={() => handleFilterClick('expenses')} style={{ cursor: 'pointer' }}>
            <h3>Total Expenses</h3>
            <p className="amount negative">
              <span className="currency">$</span>
              0.00
            </p>
          </div>
          <div className="summary-card">
            <h3>Balance</h3>
            <p className="amount positive">
              <span className="currency">$</span>
              0.00
            </p>
          </div>
        </div>
        <div className="chart-container">
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
            <h2 style={{ marginBottom: '20px' }}>Monthly Overview</h2>
            <div style={{ flex: '1', minHeight: '0', width: '100%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <p style={{ color: '#718096', fontSize: '16px' }}>No spending data available.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Calculate total income and expenses
  const totalIncome = transactions
    .filter((transaction) => transaction.amount > 0)
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalExpenses = transactions
    .filter((transaction) => transaction.amount < 0)
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const balance = totalIncome + totalExpenses; // Expenses are negative

  // Group transactions by month
  const monthlyData = transactions.reduce((acc, transaction) => {
    const date = new Date(transaction.date);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    
    if (!acc[monthKey]) {
      acc[monthKey] = { income: 0, expenses: 0 };
    }
    
    if (transaction.amount > 0) {
      acc[monthKey].income += transaction.amount;
    } else {
      acc[monthKey].expenses += Math.abs(transaction.amount);
    }
    
    return acc;
  }, {});

  // Sort months and prepare chart data
  const sortedMonths = Object.keys(monthlyData).sort();
  const monthLabels = sortedMonths.map(month => {
    const [year, monthNum] = month.split('-');
    return `${new Date(year, monthNum - 1).toLocaleString('default', { month: 'short' })} ${year}`;
  });

  // Chart Data
  const data = {
    labels: monthLabels,
    datasets: [
      {
        label: "Income",
        data: sortedMonths.map(month => monthlyData[month].income),
        backgroundColor: "#38a169",
        borderRadius: 6,
      },
      {
        label: "Expenses",
        data: sortedMonths.map(month => monthlyData[month].expenses),
        backgroundColor: "#e53e3e",
        borderRadius: 6,
      }
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
        }
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
          },
          callback: function(value) {
            return '$' + value.toFixed(2);
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
    <div className="financial-report">
      <h1>📈 Financial Report</h1>
      <div className="summary-cards">
        <div 
          className="summary-card" 
          onClick={() => handleFilterClick('income')} 
          style={{ cursor: 'pointer' }}
          title="Click to view income transactions"
        >
          <h3>Total Income</h3>
          <p className="amount positive">
            <span className="currency">$</span>
            {totalIncome.toFixed(2)}
          </p>
        </div>
        <div 
          className="summary-card" 
          onClick={() => handleFilterClick('expenses')} 
          style={{ cursor: 'pointer' }}
          title="Click to view expense transactions"
        >
          <h3>Total Expenses</h3>
          <p className="amount negative">
            <span className="currency">$</span>
            {Math.abs(totalExpenses).toFixed(2)}
          </p>
        </div>
        <div className="summary-card">
          <h3>Balance</h3>
          <p className={`amount ${balance >= 0 ? 'positive' : 'negative'}`}>
            <span className="currency">$</span>
            {Math.abs(balance).toFixed(2)}
          </p>
        </div>
      </div>
      <div className="chart-container">
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
          <h2 style={{ marginBottom: '20px' }}>Monthly Overview</h2>
          <div style={{ flex: '1', minHeight: '0', width: '100%', position: 'relative' }}>
            <Bar data={data} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialReport;
