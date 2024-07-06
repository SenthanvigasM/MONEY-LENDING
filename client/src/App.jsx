import React from 'react';
import { Link } from 'react-router-dom';

const App = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <Link
        to="https://loaneds.vercel.app/login"
        style={{
          textDecoration: 'none',
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: '#ffffff',
          borderRadius: '5px',
          fontSize: '18px',
          fontWeight: 'bold',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          transition: 'background-color 0.3s ease',
        }}
      >
        Login
      </Link>
    </div>
  );
};

export default App;
