import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import TransactionForm from './TransactionForm';
import TransactionList from './TransactionList';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const HomePage = () => {
    const [income, setIncome] = useState(0);
    const [expense, setExpense] = useState(0);
    const [balance, setBalance] = useState(0);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const storedIncome = localStorage.getItem('totalIncome') || 0;
        const storedExpense = localStorage.getItem('totalExpenses') || 0;
        const storedBalance = localStorage.getItem('balance') || 0;
        const storedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];

        setIncome(Number(storedIncome));
        setExpense(Number(storedExpense));
        setBalance(Number(storedBalance));
        setTransactions(storedTransactions);
    }, []);

    useEffect(() => {
        localStorage.setItem('totalIncome', income);
        localStorage.setItem('totalExpenses', expense);
        localStorage.setItem('balance', balance);
        localStorage.setItem('transactions', JSON.stringify(transactions));
    }, [income, expense, balance, transactions]);

    const handleAddTransaction = (newTransaction) => {
        setTransactions([...transactions, newTransaction]);

        if (newTransaction.type === 'income') {
            setIncome(income + newTransaction.amount);
            setBalance(balance + newTransaction.amount);
        } else {
            setExpense(expense + newTransaction.amount);
            setBalance(balance - newTransaction.amount);
        }
    };

    const handleDeleteTransaction = (id) => {
        const filteredTransactions = transactions.filter((t) => t.id !== id);
        const deletedTransaction = transactions.find((t) => t.id === id);

        setTransactions(filteredTransactions);

        if (deletedTransaction.type === 'income') {
            setIncome(income - deletedTransaction.amount);
            setBalance(balance - deletedTransaction.amount);
        } else {
            setExpense(expense - deletedTransaction.amount);
            setBalance(balance + deletedTransaction.amount);
        }
    };

    const data = {
        labels: ['Income', 'Expenses', 'Balance'],
        datasets: [
            {
                label: 'Financial Overview',
                data: [income, expense, balance],
                backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(255, 206, 86, 0.6)'],
            },
        ],
    };

    return (
        <div>
            <h1>Expense Tracker</h1>
            <hr/>
            <div className="transaction-container">
                <TransactionForm onAddTransaction={handleAddTransaction} className="transaction-form" />
                <TransactionList
                    transactions={transactions}
                    onDeleteTransaction={handleDeleteTransaction}
                    onEditTransaction={(id) => console.log(`Editing transaction with ID ${id}`)} // To be implemented
                    className="transaction-list"
                />
            </div>
            <hr/>

            <Bar data={data} />
            <hr/>
            <form>
                <div>
                    <label>Total Income: </label>
                    <input type="number" value={income} readOnly />
                </div>

                <div>
                    <label>Total Expenses: </label>
                    <input type="number" value={expense} readOnly />
                </div>

                <div>
                    <h3 style={{color:"red"}} >Balance: {balance}</h3>
                </div>
            </form>

        </div>
    );
};

export default HomePage;
