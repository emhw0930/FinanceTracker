import React from "react";

const SpendingSummary = ({ transactions }) => {
  const currentDate = new Date();

  const isWithinTimeFrame = (transactionDate, days) => {
    const transactionTime = new Date(transactionDate).getTime();
    const currentTime = currentDate.getTime();
    return currentTime - transactionTime <= days * 24 * 60 * 60 * 1000;
  };

  const weeklySpending = transactions
    .filter((t) => isWithinTimeFrame(t.date, 7) && t.amount < 0)
    .reduce((total, t) => total + Math.abs(t.amount), 0);

  const monthlySpending = transactions
    .filter((t) => isWithinTimeFrame(t.date, 30) && t.amount < 0)
    .reduce((total, t) => total + Math.abs(t.amount), 0);

  const yearlySpending = transactions
    .filter((t) => isWithinTimeFrame(t.date, 365) && t.amount < 0)
    .reduce((total, t) => total + Math.abs(t.amount), 0);

  return (
    <>
      <div className="stat-card">
        <h3>Weekly Spending</h3>
        <p className="stat-value">
          <span className="currency">$</span>
          {weeklySpending.toFixed(2)}
        </p>
      </div>
      <div className="stat-card">
        <h3>Monthly Spending</h3>
        <p className="stat-value">
          <span className="currency">$</span>
          {monthlySpending.toFixed(2)}
        </p>
      </div>
      <div className="stat-card">
        <h3>Yearly Spending</h3>
        <p className="stat-value">
          <span className="currency">$</span>
          {yearlySpending.toFixed(2)}
        </p>
      </div>
    </>
  );
};

export default SpendingSummary;
