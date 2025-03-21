import React from "react";
import { useNavigate } from "react-router-dom";

const SpendingSummary = ({ transactions }) => {
  const navigate = useNavigate();
  const currentDate = new Date();
  
  const getStartOfWeek = (date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day; // No adjustment needed for Sunday start
    d.setDate(diff);
    d.setHours(0, 0, 0, 0);
    return d;
  };

  const getStartOfMonth = (date) => {
    const d = new Date(date);
    d.setDate(1); // First set to 1st of current month
    d.setDate(d.getDate()); // Then go back one day to last day of previous month
    d.setHours(0, 0, 0, 0);
    return d;
  };

  const getStartOfYear = (date) => {
    const d = new Date(date);
    d.setFullYear(d.getFullYear());
    d.setMonth(0, 1); // January 1st
    d.setDate(d.getDate()); // Go back one day to December 31st
    d.setHours(0, 0, 0, 0);
    return d;
  };

  const startOfWeek = getStartOfWeek(currentDate);
  const startOfMonth = getStartOfMonth(currentDate);
  const startOfYear = getStartOfYear(currentDate);

  const weeklySpending = transactions
    .filter(t => new Date(t.date) >= startOfWeek && t.amount < 0)
    .reduce((total, t) => total + Math.abs(t.amount), 0);

  const monthlySpending = transactions
    .filter(t => new Date(t.date) > startOfMonth && t.amount < 0)
    .reduce((total, t) => total + Math.abs(t.amount), 0);

  const yearlySpending = transactions
    .filter(t => new Date(t.date) > startOfYear && t.amount < 0)
    .reduce((total, t) => total + Math.abs(t.amount), 0);

  const handlePeriodClick = (period) => {
    navigate('/', { 
      state: { 
        filter: 'time_period',
        period,
        startDate: period === 'week' ? startOfWeek : 
                  period === 'month' ? startOfMonth : 
                  startOfYear
      } 
    });
  };

  return (
    <>
      <div 
        className="stat-card" 
        onClick={() => handlePeriodClick('week')}
        style={{ cursor: 'pointer' }}
        title="Click to view this week's transactions"
      >
        <h3>This Week's Spending</h3>
        <p className="amount negative">
          <span className="currency">$</span>
          {weeklySpending.toFixed(2)}
        </p>
      </div>
      <div 
        className="stat-card"
        onClick={() => handlePeriodClick('month')}
        style={{ cursor: 'pointer' }}
        title="Click to view this month's transactions"
      >
        <h3>This Month's Spending</h3>
        <p className="amount negative">
          <span className="currency">$</span>
          {monthlySpending.toFixed(2)}
        </p>
      </div>
      <div 
        className="stat-card"
        onClick={() => handlePeriodClick('year')}
        style={{ cursor: 'pointer' }}
        title="Click to view this year's transactions"
      >
        <h3>This Year's Spending</h3>
        <p className="amount negative">
          <span className="currency">$</span>
          {yearlySpending.toFixed(2)}
        </p>
      </div>
    </>
  );
};

export default SpendingSummary;
