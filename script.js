async function getWeather() {
    const city = document.getElementById('city').value;
    const apiKey = '5ef159c2f08b9f19a65e4707e80198c9';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Cidade não encontrada');
        }
        const data = await response.json();

        document.getElementById('city-name').innerText = `📍 ${data.name}, ${data.sys.country}`;
        document.getElementById('temperature').innerText = `🌡 Temperatura: ${data.main.temp}ºC`;
        document.getElementById('description').innerText = `☁️ Condição: ${data.weather[0].description}`;
        document.getElementById('humidity').innerText = `💧 Umidade: ${data.main.humidity}%`;
        document.getElementById('wind').innerText = `💨 Vento: ${data.wind.speed} km/h`;

        const weatherIcon = document.getElementById('weather-icon');
        if (weatherIcon) {
            const iconCode = data.weather[0].icon;
            weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
            weatherIcon.alt = data.weather[0].description;
        } else {
            console.error('Elemento #weather-icon não encontrado no DOM.');
        }
        
        getForecast(city);
    } catch (error) {
        alert(error.message);
    }
}