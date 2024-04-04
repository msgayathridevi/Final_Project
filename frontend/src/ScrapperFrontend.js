import React, { useState, useEffect } from 'react';

function ScrapperFrontend() {
  const [score, setScore] = useState(null);

  useEffect(() => {
    fetch('https://script.googleusercontent.com/macros/echo?user_content_key=yiIIOAkqecMlANlaPgDL5edk5Ffv8eBjTPL0e_4jXYFQ07vR49QFML4F8i45avSWWVrwSV8vw1ADPYkeANQnF-Sse_tV_uh4m5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnF_aiKQWqtWIUoHCYqa7D5pZF68VizCAwsDOhqaNSSliF0IchKGbZ_hsJa-gkMQh8_q5qXr9yiiwAZAhl_BrxOl4h6VTgF9Zbg&lib=MV3rFoeJV8l3P5P12Wc7dcyG1dPnpuRfY')
      .then(response => response.json())
      .then(data => {
        // Extract score from data
        const latestScore = data.data.latest_score;
        setScore(latestScore);
        // console.log(latestScore);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="App">
      <h1>Latest Score</h1>
      {score !== null ? (
        <p>Score: {score}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ScrapperFrontend;
