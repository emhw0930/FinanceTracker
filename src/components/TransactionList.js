import React, { useState, useEffect } from "react";

const TransactionList = ({ transactions, deleteTransaction }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (isFullscreen) {
      setIsFullscreen(false);
      document.body.classList.remove('fullscreen-active');
    } else {
      setIsFullscreen(true);
      document.body.classList.add('fullscreen-active');
    }
  };

  // Cleanup effect
  useEffect(() => {
    return () => {
      document.body.classList.remove('fullscreen-active');
    };
  }, []);

  const getCategoryEmoji = (category) => {
    const categories = {
      food: "🍽️",
      transportation: "🚗",
      shopping: "🛍️",
      entertainment: "🎮",
      utilities: "🏠",
      healthcare: "🏥",
      salary: "💰",
      investment: "📈",
      other: "📌"
    };
    return categories[category] || "📌";
  };

  const getCategoryLabel = (category) => {
    const labels = {
      food: "Food & Dining",
      transportation: "Transportation",
      shopping: "Shopping",
      entertainment: "Entertainment",
      utilities: "Utilities",
      healthcare: "Healthcare",
      salary: "Salary",
      investment: "Investment",
      other: "Other"
    };
    return labels[category] || "Other";
  };

  return (
    <div className={`transaction-list ${isFullscreen ? 'fullscreen' : ''}`}>
      <div className="transaction-list-header">
        <h2>Transaction List</h2>
        <button className="fullscreen-btn" onClick={toggleFullscreen}>
          {isFullscreen ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
              </svg>
              Exit Fullscreen
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z" />
              </svg>
              Fullscreen
            </>
          )}
        </button>
      </div>
      
      {transactions.length === 0 ? (
        <p>No transactions yet.</p>
      ) : (
        <ul>
          {[...transactions].reverse().map((transaction, reversedIndex) => {
            const localDate = new Date(transaction.date);
            const formattedDate = localDate.toLocaleDateString("en-US", {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
              timeZone: 'UTC'
            });

            const originalIndex = transactions.length - 1 - reversedIndex;

            return (
              <li key={originalIndex} className="transaction-item">
                <div className="transaction-info">
                  <span className="transaction-name">{transaction.name}</span>
                  <span className="transaction-category">
                    <span className="category-emoji">{getCategoryEmoji(transaction.category)}</span>
                    <span className="category-label">{getCategoryLabel(transaction.category)}</span>
                  </span>
                </div>
                <div className="transaction-details">
                  <span className={`transaction-amount ${transaction.amount < 0 ? "expense" : "income"}`}>
                    ${Math.abs(transaction.amount).toFixed(2)}
                  </span>
                  <span className="transaction-date">{formattedDate}</span>
                  <button className="delete-btn" onClick={() => deleteTransaction(originalIndex)}>❌</button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default TransactionList;
