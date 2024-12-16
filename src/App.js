import React, { useState } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const apiKey = '4e7d9e1a27615b7148c274094c67b514';

  const handleSearch = async () => {
    // Clear previous error 
    setError('');
    // If there is already data, clear it.
    setWeatherData(null);
    setForecastData(null);
    setExpanded(false);

    // If "city" is empty, get error.
    if (!city.trim()) {
      setError('Şehir adı girin');
      return;
    }

    setLoading(true);

    try {
      // 1) Get current weather data 
      const currentResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=tr`);

      if (!currentResponse.ok) {
        throw new Error('Şehir bulunamadı veya veri alınırken hata oluştu');
      }

      const currentData = await currentResponse.json();
      setWeatherData(currentData);

      // 2) Get a 3 hours/5day weather Data
      const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=tr`);
      if (!forecastResponse.ok) {
        throw new Error('Tahmin verileri alınırken hata oluştu');
      }

      const forecastFullData = await forecastResponse.json();

      // 3) Extract next 4 days data.
      const nextFourDays = extractNextFourDays(forecastFullData.list);
      setForecastData(nextFourDays);

      setExpanded(true);
    } catch (err) {
      setError(err.message || 'Bir hata oluştu');
    }

    setLoading(false);
  };

  const extractNextFourDays = (list) => {
    if (!list || list.length === 0) return [];

    const today = new Date();
    const todayDate = today.getDate();

    const daysMap = {};

    list.forEach(item => {
      const date = new Date(item.dt_txt);
      const day = date.getDate();

      if (day !== todayDate) {
        const dayStr = date.toDateString();
        if (!daysMap[dayStr]) {
          daysMap[dayStr] = [];
        }
        daysMap[dayStr].push(item);
      }
    });

    const dayKeys = Object.keys(daysMap);
    const nextFour = dayKeys.slice(0, 4).map(dayStr => {
      const dayItems = daysMap[dayStr];
      const noonItem = dayItems.find(item => item.dt_txt.includes("12:00:00"));
      const selected = noonItem || dayItems[0];
      return selected;
    });

    return nextFour;
  };

  const getDayName = (dtTxt) => {
    const date = new Date(dtTxt);
    return date.toLocaleDateString('tr-TR', { weekday: 'long' });
  };

  return (
    <div className="app-container">
      <div className={`search-container ${expanded ? 'expanded' : ''}`}>
        <div className="search-bar">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Şehir Adı"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
          />
          <button onClick={handleSearch}>Ara</button>
        </div>

        {error && <div className="error-message">{error}</div>}

        {loading && (
          <div className="loading">
            Loading...
          </div>
        )}

        {!loading && expanded && weatherData && (
          <div className="weather-result">
            <div className="weather-info">
              <h2>{weatherData.name}</h2>
              <p>Sıcaklık: {weatherData.main.temp}°C</p>
              <p>Nem: {weatherData.main.humidity}%</p>
              <p>Durum: {weatherData.weather[0].description}</p>
            </div>
            <div className="weather-icon">
              <img
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                alt={weatherData.weather[0].description}
              />
            </div>
          </div>
        )}


        {!loading && expanded && forecastData && (
          <div className="forecast-container">
            <h4>Sonraki 4 Gün</h4>
            <div className="forecast-grid">
              {forecastData.map((item, index) => (
                <div key={index} className="forecast-day">

                  <span className="forecast-day-name">{getDayName(item.dt_txt)}</span>

                  <span className="forecast-temp">{Math.round(item.main.temp)}°C</span>
                  <img
                    src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                    alt={item.weather[0].description}
                  />

                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
