import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import React, { useState } from 'react';
import UserLogin from './components/UserLogin';
import List from './components/List';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<UserLogin />} />
          <Route path="/list" element={<List />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
