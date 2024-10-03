import React, { useState } from 'react';

const TransactionForm = ({ onAddTransaction }) => {
    const [type, setType] = useState('income');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newTransaction = {
            id: Date.now(),
            type,
            amount: parseFloat(amount),
            category,
            date,
            description
        };
        onAddTransaction(newTransaction);
        setType('income');
        setAmount('');
        setCategory('');
        setDate('');
        setDescription('');
    };

    return (
        <div className='tr'>
            <form onSubmit={handleSubmit}>
                <h2>Add Transaction</h2>
                <div>
                    <label>Type: </label>
                    <select value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                </div>

                <div>
                    <label>Amount: </label>
                    <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
                </div>

                <div>
                    <label>Category: </label>
                    <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
                </div>

                <div>
                    <label>Date: </label>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                </div>

                <div>
                    <label>Description: </label>
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>

                <button type="submit">Add Transaction</button>
            </form>
        </div>
    );
};

export default TransactionForm;
