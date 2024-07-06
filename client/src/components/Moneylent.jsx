import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './Moneylent.module.css';

function Moneylent() {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');
  const [entries, setEntries] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const userEmail = localStorage.getItem('loggedInUserEmail');
      const response = await axios.get(`http://localhost:3001/lent?email=${userEmail}`);
      setEntries(response.data);
    } catch (error) {
      console.error('Error fetching entries:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEntry = { name, date, amount, reason, email: localStorage.getItem('loggedInUserEmail') };
    try {
      if (editId) {
        await axios.put(`http://localhost:3001/lent/${editId}`, newEntry);
        setEditId(null);
      } else {
        await axios.post('http://localhost:3001/lent', newEntry);
      }
      fetchEntries();
      setName('');
      setDate('');
      setAmount('');
      setReason('');
    } catch (error) {
      console.error('Error saving entry:', error);
    }
  };
  
  const handleEdit = async (entry) => {
    setEditId(entry._id);
    setName(entry.name);
    setDate(entry.date);
    setAmount(entry.amount);
    setReason(entry.reason);
  };
  
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/lent/${id}`);
      fetchEntries();
    } catch (error) {
      console.error('Error deleting entry:', error);
    }
  };
  

  return (
    <div className={styles['money-lent-container']}>
      <h2 className={styles['money-lent-heading']}>Money Lent</h2>
      <form onSubmit={handleSubmit} className={styles['form-container']}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="date" placeholder="Date" value={date} onChange={(e) => setDate(e.target.value)} required />
        <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} required />
        <input type="text" placeholder="Reason" value={reason} onChange={(e) => setReason(e.target.value)} required />
        <input type="submit" value={editId ? 'Update' : 'Add'} />
      </form>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Reason</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry._id}>
              <td>{entry.name}</td>
              <td>{new Date(entry.date).toLocaleDateString()}</td>
              <td>{entry.amount}</td>
              <td>{entry.reason}</td>
              <td className={styles['action-buttons']}>
                <button onClick={() => handleEdit(entry)}>Edit</button>
                <button onClick={() => handleDelete(entry._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles['logout-link']}>
        <Link to={'/login'}>Logout</Link>
      </div>
    </div>
  );
}

export default Moneylent;
