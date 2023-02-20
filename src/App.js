import React from 'react';
import './App.css';

import Header from './components/Header';
import Hangman from './components/Hangman';
import Popup from './components/Rules';

function App() {
  return (
    <div className="App">
        <Header />
        <Hangman />
        <Popup />
    </div>
  );
}

export default App;
