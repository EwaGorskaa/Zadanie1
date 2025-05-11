import React, { useState } from 'react';
// Import predefiniowanych miast
import cities from './Cities.js'; 
import { WiDaySunny, WiCloud, WiRain, WiSnow } from 'react-icons/wi';

// Funkcja do wyświetlania inkony pogody na podstawie opisu
function getWeatherIcon(description) {
    switch (description.toLowerCase()) {
        case "sunny":
            return <WiDaySunny size={48} />;
        case "partly cloudy":
        case "cloudy":
            return <WiCloud size={48} />;
        case "rain":
        case "light rain":
            return <WiRain size={48} />;
        case "snow":
            return <WiSnow size={48} />;
        default:
            return <WiCloud size={48} />; 
    }
}
function Main(){
    // Hooki use state 
    const [selectedCity, setSelectedCity] = useState("");
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Obsługa zmiany selecta
    const handleCityChange = (event) => {
        setSelectedCity(event.target.value);
    };

    // Obsługa wysłania formularza
    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError(null);
        setWeatherData(null);

        try {
            if(selectedCity === "") {
                setError("Nie wybrano miasta.");
                return;
            }
            // Wysłanie zapytania do backendu
            const response = await fetch('http://localhost:3001/weather', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify({ city: selectedCity }), 
            });
    
            const data = await response.json();
    
            if (data.error) {
                setError(data.error.info);
            } else {
                setWeatherData(data);
            }
        } catch (err) {
            setError("Wystąpił błąd podczas pobierania danych.");
        } finally {
            setLoading(false);
        }
    };

    return(
        <div className="main flex flex-col items-center justify-center">
            <h4 className="mb-5">Sprawdź dzisiejszą pogodę</h4>
            <div className="flex justify-center">
                <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
                    <select
                        id="city"
                        value={selectedCity}
                        onChange={handleCityChange}
                        className="w-64 p-2 border border-gray-300 rounded-md">
                        <option value="">-- Wybierz miasto --</option>
                        {cities.map((cityData, index) => (
                            <option key={index} value={cityData.city}>
                                {cityData.city}, {cityData.country}
                            </option>
                        ))}
                    </select>
                    <button
                        type="submit"
                        className="w-64 p-2 rounded-md transition">
                        Sprawdź
                    </button>
                </form>
                </div>
            {loading && <p className="mt-6 text-gray-600">Ładowanie pogody...</p>}

            {error && <p className="mt-6 text-red-500">{error}</p>}

            {weatherData && (
            <div className="mt-8 text-center flex flex-col items-center">
                {getWeatherIcon(weatherData.current.weather_descriptions[0])}
                <h5 className="text-xl font-bold">{weatherData.location.name}</h5>
                <p className="text-lg">{weatherData.current.weather_descriptions[0]}</p>
                <p className="text-lg">Temperatura: {weatherData.current.temperature}°C</p>
                <p className="text-lg">Wilgotność: {weatherData.current.humidity}%</p>
            </div>
            )}  
        </div>
    );
}

export default Main;