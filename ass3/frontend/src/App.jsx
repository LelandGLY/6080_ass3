import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styled/index'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Edit from './pages/Edit'
import Results from './pages/Results'
import Play from './pages/Play'
import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

function App () {
  return (
    <>
    <Routes>
      <Route path='' element = {<Navigate to="/login" />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/quiz" element={<Dashboard />} />
      <Route path="/edit" element={<Navigate to="/quiz" />} />
      <Route path="/edit/:id" element={<Edit />} />
      <Route path="/edit/:id/:question" element={<Edit />} />
      <Route path="/results/:session" element={<Results />} />
      <Route path="/play" element={<Play />} />
      <Route path="/play/:session" element={<Play />} />
    </Routes>
    </>
  );
}

export default App;
