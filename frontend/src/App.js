import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './Welcome';
import Home from './Home';
import ChangePassword from './ChangePassword';
import UserHomePage from './UserHomePage';
import EditSkill from './EditSkill';
import EditCertification from './EditCertification';
import EditProject from './EditProject';
import CreateEmployee from './CreateEmployee';
import CreateApprover from './CreateApprover';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<Home />} />
        <Route path="/createemployee" element={<CreateEmployee />} />
        <Route path="/changepassword" element={<ChangePassword />} />
        <Route path="/userhomepage/:userId" element={<UserHomePage />} />
        <Route path="/editSkill" element={<EditSkill />} />
        <Route path="/editCertification" element={<EditCertification />} />
        <Route path="/editProject" element={<EditProject />} />
        <Route path="/createapprover/" element={<CreateApprover />} />
      </Routes>
    </Router>
  );
}

export default App;
