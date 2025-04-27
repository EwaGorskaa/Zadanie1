const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 3000;

console.log('Data uruchomienia serwera:' + new Date().toLocaleString());
console.log('Ewa Górska');
console.log('Serwer nasłuchuje na porcie: ' + port);

app.use(cors());
app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
  });

app.listen(port);