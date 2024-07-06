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
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/lent" element={<Moneylent />} />
      <Route path="/register" element={<Signup />} />
    </Routes>
  </Router>
);

ReactDOM.render(<Root />, document.getElementById('root'));
