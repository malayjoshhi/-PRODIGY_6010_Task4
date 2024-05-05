async function getWeather() {
    const location = document.getElementById('location-input').value;
    
    if (!location.trim()) {
        document.getElementById('error-message').textContent = 'Please enter a location.';
        return;
    }

    const apiKey = 'f00c38e0279b7bc85480c3fe775d518c'; 
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Weather data not found. Please check the location.');
        }
        const data = await response.json();

        const weatherInfo = document.getElementById('weather-info');
        weatherInfo.innerHTML = `
            <h2>Weather in ${data.name}</h2>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Weather: ${data.weather[0].description}</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;
        document.getElementById('error-message').textContent = '';
    } catch (error) {
        console.error('Error fetching weather data:', error);
        document.getElementById('error-message').textContent = error.message;
        const weatherInfo = document.getElementById('weather-info');
        weatherInfo.innerHTML = '';
    }
}