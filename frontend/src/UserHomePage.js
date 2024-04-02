import React from 'react';
import { Link } from 'react-router-dom';
// import { useParams} from 'react-router-dom';

function HomePage() {
  // const { userId } = useParams();
  
  return (
    <div>
      <h1>Welcome User Home Page</h1>
      <div>
        <Link to="/editSkill/:userId">
          <button>Edit Skills</button>
        </Link>
      </div>
      <div>
        <Link to="/editCertification/:userId">
          <button>Edit Certifications</button>
        </Link>
      </div>
      <div>
        <Link to="/editProject/:userId">
          <button>Edit Projects</button>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
