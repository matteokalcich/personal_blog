import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Login from './Login';
import Frontoffice from './Frontoffice';
import Backoffice from './Backoffice';
import DettagliPost from './DettagliPost'

function Rotte() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Frontoffice />} />
        <Route path="/backoffice" element={<Backoffice />} />
        <Route path="/dettagliPost" element={<DettagliPost />} />
      </Routes>
    </Router>
  );
}

export default Rotte;
