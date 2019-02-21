const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res, next) => {
    res.send('Welcome to graphql testing app with mongodb and express');
});

app.listen(8001, () => {
    console.log("Server started on 8001");
});