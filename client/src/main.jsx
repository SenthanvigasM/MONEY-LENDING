import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Moneylent from './components/Moneylent';
import Login from './components/Login';
import Signup from './components/Signup';
import App from './App';

const Root = () => (
  <Router>
    <Routes>
      <Route path="https://loaneds.vercel.app/" element={<App />} />
      <Route path="https://loaneds.vercel.app/login" element={<Login />} />
      <Route path="https://loaneds.vercel.app/lent" element={<Moneylent />} />
      <Route path="https://loaneds.vercel.app/register" element={<Signup />} />
    </Routes>
  </Router>
);

ReactDOM.render(<Root />, document.getElementById('root'));
