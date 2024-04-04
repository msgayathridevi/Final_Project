# Example Python script (your_script.py)
# This script performs web scraping and prints the scraped value to stdout
import requests
from bs4 import BeautifulSoup

# Perform web scraping
url = 'https://example.com'
response = requests.get(url)
soup = BeautifulSoup(response.text, 'html.parser')
# Extract the desired value
scraped_value = soup.find('span', class_='value').text

# Print the scraped value to stdout
print(scraped_value)
