async function getForecast(city) {
    const apiKey = '5ef159c2f08b9f19a65e4707e80198c9';
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Previsão não disponível');

        const data = await response.json();

        const labels = [];
        const temps = [];

        for (let i = 0; i < data.list.length; i += 8) {
            labels.push(data.list[i].dt_txt.split(' ')[0]);
            temps.push(data.list[i].main.temp);
        }

        const ctx = document.getElementById('forecastChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Temperatura (ºC)',
                    data: temps,
                    borderColor: '#ff9800',
                    backgroundColor: '#ffe0b2',
                    fill: true
                }]
            }
        });
    } catch (error) {
        alert(error.message);
    }
}