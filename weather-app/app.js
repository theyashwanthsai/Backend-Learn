const express = require('express');
const fetch = require('node-fetch');

const app = express();

app.get('/weather/:city', async (req, res) => {
  const { city } = req.params;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const temperature = data.main.temp - 273.15;
    res.status(200).json({ temperature });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Unable to fetch weather data' });
  }
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
