const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.use(express.static('public'));
app.use(express.static('public/src'));

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});