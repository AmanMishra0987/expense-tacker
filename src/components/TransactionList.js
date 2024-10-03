import React from 'react';


const TransactionList = ({ transactions, onDeleteTransaction }) => {
  return (
    <div className='tr'>
      <h2>Transaction List</h2>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id} style={{marginBottom:'15px'}}>
            <span>{transaction.date} | {transaction.category}  {transaction.description}</span>
            <span>: {transaction.type === 'income' ? '+' : '-'}${transaction.amount}</span>
            <button onClick={() => onDeleteTransaction(transaction.id)} style={{marginLeft:'15px'}} >Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
