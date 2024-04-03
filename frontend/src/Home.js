import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <header className="App-header">
        <h1> Admin Login Page</h1>
        <Link to="/createemployee">
          <button>Create User</button>
        </Link>
        <Link to="/createapprover">
          <button>Create Approver</button>
        </Link>
      </header>
      <button onClick={() => { localStorage.clear(); navigate('/') }}>Logout</button>

    </div>
  );
}

export default Home;
