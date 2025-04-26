import React, { useState } from 'react';
import cities from './Cities.js';
function Main(){
    const [selectedCity, setSelectedCity] = useState("");

    const handleCityChange = (event) => {
        setSelectedCity(event.target.value);
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Wybrane miasto:", selectedCity);
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
        </div>
    );
}

export default Main;