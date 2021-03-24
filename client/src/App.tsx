import './App.css';
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import DashboardHeader from './components/central/dashboardHeader/DashboardHeader';
let socket = io('http://localhost:3002');

const App: React.FC = () => {
  return (
    <div className="App">
      <DashboardHeader />
    </div>
  );
};
export default App;
