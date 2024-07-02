const apiKey = 'b51969801e55abfedb3ccf7069c18994'; 

const getWeatherData = async (city) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('City not found');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    alert('Failed to fetch weather data. Please try again.');
  }
};

const updateWeatherDisplay = (data) => {
  const { name, main: { temp, humidity }, weather: [{ description, icon }] } = data;
  const weatherDisplay = document.getElementById('weatherDisplay');
  const date = new Date().toLocaleString();

  weatherDisplay.innerHTML = `
    <h2>Weather in ${name}</h2>
    <p>${date}</p>
    <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">
    <p>Temperature: ${temp}°C</p>
    <p>Description: ${description}</p>
    <p>Humidity: ${humidity}%</p>
  `;
};

document.getElementById('getWeatherBtn').addEventListener('click', async () => {
  const city = document.getElementById('cityInput').value;
  if (city.trim() === "") {
    alert("Please enter a city name");
    return;
  }
  const weatherData = await getWeatherData(city);
  if (weatherData) updateWeatherDisplay(weatherData);
});
