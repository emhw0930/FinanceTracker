import React from "react";
import { useLocation } from "react-router-dom";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";

const Home = ({ transactions, addTransaction, deleteTransaction }) => {
  const location = useLocation();
  const filter = location.state?.filter;

  // Filter transactions based on the filter type
  const filteredTransactions = filter
    ? transactions.filter(transaction => {
        if (filter === 'income') return transaction.amount > 0;
        if (filter === 'expenses') return transaction.amount < 0;
        return true;
      })
    : transactions;

  return (
    <div className="main-content">
      <h1>
        {filter === 'income' ? '💰 Income Transactions' :
         filter === 'expenses' ? '💸 Expense Transactions' :
         '💰 Personal Finance Tracker'}
      </h1>
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
