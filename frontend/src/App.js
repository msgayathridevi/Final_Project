import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './Welcome';
import Home from './Home';
import CreateUser from './CreateUser';
import ChangePassword from './ChangePassword';
import EditSkill from './EditSkill';
import EditCertification from './EditCertification';
import EditProject from './EditProject';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<Home />} />
        <Route path="/createuser" element={<CreateUser />} />
        <Route path="/changepassword" element={<ChangePassword />} />
        
        <Route path="/editSkill" element={<EditSkill />} />
        <Route path="/editCertification" element={<EditCertification />} />
        <Route path="/editProject" element={<EditProject />} />
      </Routes>
    </Router>
  );
}

export default App;
