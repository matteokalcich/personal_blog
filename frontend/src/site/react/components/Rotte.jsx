import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Login from '../pages/Login';
import Frontoffice from '../pages/Frontoffice';
import Backoffice from '../pages/Backoffice';
import DettagliPost from '../pages/DettagliPost';
import ModificaPost from '../pages/ModificaPost';
import CreazionePost from '../pages/CreazionePost';

function Rotte() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Frontoffice />} />
        <Route path='/backoffice' element={<Backoffice />} />
        <Route path='/dettagliPost' element={<DettagliPost />} />
        <Route path='/modificaPost' element={<ModificaPost />} />
        <Route path='/nuovoPost' element={<CreazionePost />} />
      </Routes>
    </Router>
  );
}

export default Rotte;
