import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <h1> Admin Login Page</h1>
        <Link to="/createuser">
          <button>Create User</button>
        </Link>
      </header>
    </div>
  );
}

export default Home;
