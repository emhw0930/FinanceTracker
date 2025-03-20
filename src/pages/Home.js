import React from "react";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";

const Home = ({ transactions, addTransaction, deleteTransaction }) => {
  return (
    <div>
      <h1>💰 Personal Finance Tracker</h1>
      <TransactionForm addTransaction={addTransaction} />
      <TransactionList transactions={transactions} deleteTransaction={deleteTransaction} />
    </div>
  );
};

export default Home;
