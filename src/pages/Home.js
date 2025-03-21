import React from "react";
import { useLocation } from "react-router-dom";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";

const Home = ({ transactions, addTransaction, deleteTransaction }) => {
  const location = useLocation();
  const filter = location.state?.filter;
  const category = location.state?.category;
  const period = location.state?.period;
  const startDate = location.state?.startDate;

  // Filter transactions based on the filter type
  const filteredTransactions = filter
    ? transactions.filter(transaction => {
        if (filter === 'income') return transaction.amount > 0;
        if (filter === 'expenses') return transaction.amount < 0;
        if (filter === 'category') return transaction.category === category;
        if (filter === 'time_period') {
          const transactionDate = new Date(transaction.date);
          return transactionDate >= new Date(startDate) && transaction.amount < 0;
        }
        return true;
      })
    : transactions;

  // Get the title based on filter
  const getTitle = () => {
    if (filter === 'income') return '💰 Income Transactions';
    if (filter === 'expenses') return '💸 Expense Transactions';
    if (filter === 'category') {
      const categoryEmoji = {
        food: "🍽️",
        transportation: "🚗",
        shopping: "🛍️",
        entertainment: "🎮",
        utilities: "🏠",
        healthcare: "🏥",
        salary: "💰",
        investment: "📈",
        other: "📌"
      }[category] || "📌";
      
      return `${categoryEmoji} ${category.charAt(0).toUpperCase() + category.slice(1)} Transactions`;
    }
    if (filter === 'time_period') {
      const periodEmoji = {
        week: "📅",
        month: "📅",
        year: "📅"
      }[period];
      
      const periodText = {
        week: "This Week's",
        month: "This Month's",
        year: "This Year's"
      }[period];
      
      return `${periodEmoji} ${periodText} Transactions`;
    }
    return '💰 Personal Finance Tracker';
  };

  return (
    <div className="main-content">
      <h1>{getTitle()}</h1>
      {!filter && (
        <div className="form-container">
          <TransactionForm addTransaction={addTransaction} />
        </div>
      )}
      <TransactionList 
        transactions={filteredTransactions} 
        deleteTransaction={deleteTransaction} 
      />
    </div>
  );
};

export default Home;
