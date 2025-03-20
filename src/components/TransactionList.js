import React from "react";

const TransactionList = ({ transactions, deleteTransaction }) => {
  return (
    <div className="transaction-list">
      <h2>Transaction List</h2>
      {transactions.length === 0 ? (
        <p>No transactions yet.</p>
      ) : (
        <ul>
          {transactions.map((transaction, index) => {
            const localDate = new Date(transaction.date);
            const formattedDate = localDate.toLocaleDateString("en-US", {
              timeZone: "America/New_York", // Change this to your local timezone
            });

            return (
              <li key={index} className="transaction-item">
                <span className="transaction-name">{transaction.name}</span>
                <span className={`transaction-amount ${transaction.amount < 0 ? "expense" : "income"}`}>
                  ${Math.abs(transaction.amount).toFixed(2)}
                </span>
                <span className="transaction-date">{formattedDate}</span>
                <button className="delete-btn" onClick={() => deleteTransaction(index)}>❌</button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default TransactionList;
