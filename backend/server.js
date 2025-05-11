// Załadowanie zmiennej środowiskowej klucza do API z pliku .env
require('dotenv').config()
const express = require('express');
const path = require('path');
const cors = require('cors');
// Umożliwienie wykonywania zapytań HTTP
const fetch = require('node-fetch');
const app = express();
// Middleware do obsługi formatu JSON w żądaniach
app.use(express.json());
const port = 3001;
// Klucz API do usługi WeatherStack pobrany z .env
const API_KEY = process.env.API_KEY;

// Logi do punktu 1a z części obowiązkowej
console.log('Data uruchomienia serwera: ' + new Date().toLocaleString('pl-PL', { timeZone: 'Europe/Warsaw' }));
console.log('Ewa Górska');
console.log('Serwer nasłuchuje na porcie: ' + port);

// Middleware do połączenia z frontendem
app.use(cors());

// Ustawienie folderu publicznego do serwowania statycznych plików
app.use(express.static(path.join(__dirname, 'public')));


// Endpoint do pobierania danych pogodowych na podstawie wybranego miasta
app.post('/weather', async (req, res) => {
    const { city } = req.body;
    if (!city || city.trim() === '') {
        console.log('Nie podano miasta');
        return res.status(400).json({ error: { info: 'Miasto nie zostało podane' } });
    }

    try {
         // Wysyłanie żądania do zewnętrznego API pogodowego
        const response = await fetch(
            `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${city}`
        );
        const data = await response.json();

        if (data.error) {
            return res.status(400).json(data.error);
        }

        return res.json(data);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: { info: 'Wystąpił błąd podczas pobierania danych.' } });
    }
});

// Endpoint do wysłania pliku index.html
app.get('/', (req, res) => {
    const indexPath = path.join(__dirname, 'frontend', 'build', 'index.html');
    res.sendFile(indexPath);
});

app.listen(port);