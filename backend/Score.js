const express = require('express');
const { exec } = require('child_process');
const app = express();

// Endpoint to execute the Python script
app.get('/api/scrape', (req, res) => {
  exec('python score_scraper.py', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing Python script: ${error.message}`);
      res.status(500).send('Error executing Python script');
      return;
    }
    if (stderr) {
      console.error(`Python script stderr: ${stderr}`);
      res.status(500).send('Error executing Python script');
      return;
    }
    // Assuming your Python script outputs the scraped value to stdout
    const scrapedValue = parseFloat(stdout);
    res.json({ value: scrapedValue });
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
