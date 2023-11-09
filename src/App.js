import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HomePage from './components/HomePage';
import Workout from './components/Workout';

function App() {
  return (
    <div style={{ backgroundColor: '#f0f0f0', minHeight: '100vh' }} className='App'>
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/workout" element={<Workout />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;