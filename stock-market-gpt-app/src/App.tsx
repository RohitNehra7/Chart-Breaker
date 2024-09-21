// src/App.tsx

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';

const App: React.FC = () => {
  return (
    <div className="App min-h-screen bg-gray-100">
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
};

export default App;
