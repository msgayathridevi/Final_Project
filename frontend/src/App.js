import React from 'react';
// import './App.css';
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

import 'bootstrap/dist/css/bootstrap.min.css';
// import ScrapperFrontend from  './ScrapperFrontend';

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<ScrapperFrontend />} /> */}
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<Home />} />
        <Route path="/createemployee" element={<CreateEmployee />} />
        <Route path="/Userchangepassword" element={<ChangePassword />} />

        <Route path="/userhomepage/:userId" element={<UserHomePage />} />
        <Route path="/editSkill/:userId" element={<EditSkill />} />
        
        <Route path="/editCertification/:userId" element={<EditCertification />} />
        <Route path="/editProject/:userId" element={<EditProject />} />
        <Route path="/createapprover/" element={<CreateApprover />} />
      </Routes>
    </Router>
  );
}

export default App;
