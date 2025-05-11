require('dotenv').config()
const express = require('express');
const path = require('path');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();
app.use(express.json());
const port = 3001;
const API_KEY = process.env.API_KEY;

console.log('Data uruchomienia serwera: ' + new Date().toLocaleString('pl-PL', { timeZone: 'Europe/Warsaw' }));
console.log('Ewa Górska');
console.log('Serwer nasłuchuje na porcie: ' + port);

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/weather', async (req, res) => {
    const { city } = req.body;
    if (!city || city.trim() === '') {
        console.log('Nie podano miasta');
        return res.status(400).json({ error: { info: 'Miasto nie zostało podane' } });
    }

    try {
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
app.get('/', (req, res) => {
    const indexPath = path.join(__dirname, 'frontend', 'build', 'index.html');
    res.sendFile(indexPath);
});

app.listen(port);