import React from 'react';
import DebateForm from './components/DebateForm';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <img src={`${process.env.PUBLIC_URL}/judge_us_logo.png`} alt="App Logo" className="app-logo" />
        
      </header>
      <DebateForm />
    </div>
  );
}

export default App;
